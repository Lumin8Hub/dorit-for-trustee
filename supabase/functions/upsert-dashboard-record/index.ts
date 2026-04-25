import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedTables = new Set([
  "events",
  "outreach_logs",
  "campaign_metrics",
  "canvass_zones",
  "stakeholders",
  "map_locations",
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
    .select("role")
    .eq("id", userData.user.id)
    .single();

  const role = profile.data?.role ?? "volunteer";
  const managerOnly = ["events", "campaign_metrics", "canvass_zones", "stakeholders", "map_locations"];
  if (managerOnly.includes(body.table) && !["candidate", "manager"].includes(role)) {
    return json({ error: "Insufficient role" }, 403);
  }

  const payload = sanitizePayload(body.table, body.payload ?? {});
  if (body.table === "outreach_logs") payload.created_by = userData.user.id;

  const result = payload.id
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

  return payload;
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
