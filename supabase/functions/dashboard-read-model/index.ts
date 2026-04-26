import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "GET") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authHeader = req.headers.get("Authorization") ?? "";
  const supabase = createClient(supabaseUrl, serviceKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const token = authHeader.replace("Bearer ", "");
  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) return json({ error: "Unauthorized" }, 401);

  const profileResult = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();
  if (profileResult.error) return json({ error: profileResult.error.message }, 400);
  const profile = profileResult.data;
  if (profile.approval_status !== "approved") {
    return json({ profile, accountStatus: profile.approval_status });
  }

  const baseReads = [
    supabase.from("events").select("*").order("date", { nullsFirst: false }),
    supabase.from("map_locations").select("*").order("tier").order("name"),
    supabase.from("volunteer_training_cards").select("*").order("sort_order"),
  ] as const;

  if (profile.role === "volunteer") {
    const [events, locations, training, assignments, availability, reports] = await Promise.all([
      ...baseReads,
      supabase.from("volunteer_assignments").select("*").eq("volunteer_profile_id", userData.user.id).order("assignment_date", { nullsFirst: false }),
      supabase.from("volunteer_availability").select("*").eq("volunteer_profile_id", userData.user.id),
      supabase.from("volunteer_reports").select("*").eq("volunteer_profile_id", userData.user.id).order("created_at", { ascending: false }).limit(25),
    ]);
    const errors = [events, locations, training, assignments, availability, reports].map((result) => result.error).filter(Boolean);
    if (errors.length) return json({ error: errors.map((error) => error?.message).join("; ") }, 400);
    const zoneIds = [...new Set((assignments.data ?? []).map((assignment) => assignment.zone_id).filter(Boolean))];
    const zones = zoneIds.length
      ? await supabase.from("canvass_zones").select("*").in("id", zoneIds)
      : { data: [], error: null };
    if (zones.error) return json({ error: zones.error.message }, 400);
    return json({
      profile,
      events: events.data,
      locations: locations.data,
      training: training.data,
      assignments: assignments.data,
      availability: availability.data,
      volunteerReports: reports.data,
      zones: zones.data,
    });
  }

  const [events, locations, training, metrics, stakeholders, outreach, zones, accounts, approvalLog, assignments, availability, reports] = await Promise.all([
    ...baseReads,
    supabase.from("campaign_metrics").select("*").order("category").order("label"),
    supabase.from("stakeholders").select("*").order("priority").order("name"),
    supabase.from("outreach_logs").select("*").order("created_at", { ascending: false }).limit(50),
    supabase.from("canvass_zones").select("*").order("tier").order("name"),
    supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    supabase.from("account_approval_log").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("volunteer_assignments").select("*").order("assignment_date", { nullsFirst: false }),
    supabase.from("volunteer_availability").select("*").order("updated_at", { ascending: false }),
    supabase.from("volunteer_reports").select("*").order("created_at", { ascending: false }).limit(100),
  ]);

  const errors = [metrics, events, stakeholders, outreach, zones, locations, training, accounts, approvalLog, assignments, availability, reports]
    .map((result) => result.error)
    .filter(Boolean);
  if (errors.length) return json({ error: errors.map((error) => error?.message).join("; ") }, 400);

  return json({
    profile,
    metrics: metrics.data,
    events: events.data,
    stakeholders: stakeholders.data,
    outreach: outreach.data,
    zones: zones.data,
    locations: locations.data,
    training: training.data,
    accounts: accounts.data,
    approvalLog: approvalLog.data,
    assignments: assignments.data,
    availability: availability.data,
    volunteerReports: reports.data,
  });
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
