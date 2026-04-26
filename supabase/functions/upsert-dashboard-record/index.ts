import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedTables = new Set([
  "events",
  "outreach_logs",
  "campaign_metrics",
  "canvass_zones",
  "stakeholders",
  "map_locations",
  "volunteer_availability",
  "volunteer_reports",
]);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authHeader = req.headers.get("Authorization") ?? "";
  const supabase = createClient(supabaseUrl, serviceKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
  if (userError || !userData.user) return json({ error: "Unauthorized" }, 401);

  const body = await req.json().catch(() => null);
  if (!body || !allowedTables.has(body.table)) return json({ error: "Unsupported table" }, 400);

  const profile = await supabase
    .from("profiles")
    .select("role, approval_status")
    .eq("id", userData.user.id)
    .single();

  const role = profile.data?.role ?? "volunteer";
  const approved = profile.data?.approval_status === "approved";
  if (!approved) return json({ error: "Account is not approved" }, 403);
  const managerOnly = ["events", "campaign_metrics", "canvass_zones", "stakeholders", "map_locations"];
  if (managerOnly.includes(body.table) && !["candidate", "manager"].includes(role)) {
    return json({ error: "Insufficient role" }, 403);
  }
  const volunteerSafe = ["outreach_logs", "volunteer_availability", "volunteer_reports"];
  if (role === "volunteer" && !volunteerSafe.includes(body.table)) {
    return json({ error: "Volunteers cannot update this table" }, 403);
  }

  const payload = sanitizePayload(body.table, body.payload ?? {});
  if (body.table === "outreach_logs") payload.created_by = userData.user.id;
  if (body.table === "volunteer_reports") payload.volunteer_profile_id = userData.user.id;
  if (body.table === "volunteer_availability") payload.volunteer_profile_id = userData.user.id;

  const result = body.table === "volunteer_availability"
    ? await supabase.from(body.table).upsert(payload, { onConflict: "volunteer_profile_id" }).select().single()
    : payload.id
      ? await supabase.from(body.table).upsert(payload).select().single()
      : await supabase.from(body.table).insert(payload).select().single();

  if (result.error) return json({ error: result.error.message }, 400);

  await supabase.from("audit_log").insert({
    actor: userData.user.id,
    table_name: body.table,
    record_id: String(result.data.id ?? payload.key ?? ""),
    action: payload.id ? "upsert" : "insert",
    payload,
  });

  return json({ ok: true, record: result.data });
});

function sanitizePayload(table: string, payload: Record<string, unknown>) {
  const blocked = [
    "ethnicity",
    "religion",
    "medical",
    "disability",
    "family_status",
    "political_opinion",
    "voter_persona",
  ];
  for (const key of blocked) delete payload[key];

  if (table === "events") {
    return {
      name: payload.name,
      date: payload.date,
      date_label: payload.date_label ?? payload.dateLabel ?? payload.date,
      half: payload.half ?? "Both",
      tier: Number(payload.tier ?? 2),
      action_required: payload.action_required ?? payload.action,
      status: payload.status ?? "Planning",
    };
  }

  if (table === "outreach_logs") {
    return {
      stakeholder_name: payload.stakeholder_name ?? payload.stakeholder,
      method: payload.method,
      outcome: payload.outcome,
      follow_up_date: (payload.follow_up_date ?? payload.followUp) || null,
      status: payload.status ?? "Open",
    };
  }

  if (table === "volunteer_availability") {
    return {
      weekdays: payload.weekdays ?? "",
      weekends: payload.weekends ?? "",
      communities: payload.communities ?? "",
      interests: payload.interests ?? "",
      notes: payload.notes ?? "",
      updated_at: new Date().toISOString(),
    };
  }

  if (table === "volunteer_reports") {
    return {
      assignment_id: payload.assignment_id || null,
      report_type: payload.report_type ?? "General note",
      doors_knocked: Number(payload.doors_knocked ?? 0),
      hard_ids: Number(payload.hard_ids ?? 0),
      issue_note: payload.issue_note ?? "",
      shift_note: payload.shift_note ?? "",
    };
  }

  return payload;
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
