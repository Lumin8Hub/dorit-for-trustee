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

  const [metrics, events, stakeholders, outreach, zones, locations, training] = await Promise.all([
    supabase.from("campaign_metrics").select("*").order("category").order("label"),
    supabase.from("events").select("*").order("date", { nullsFirst: false }),
    supabase.from("stakeholders").select("*").order("priority").order("name"),
    supabase.from("outreach_logs").select("*").order("created_at", { ascending: false }).limit(50),
    supabase.from("canvass_zones").select("*").order("tier").order("name"),
    supabase.from("map_locations").select("*").order("tier").order("name"),
    supabase.from("volunteer_training_cards").select("*").order("sort_order"),
  ]);

  const errors = [metrics, events, stakeholders, outreach, zones, locations, training]
    .map((result) => result.error)
    .filter(Boolean);
  if (errors.length) return json({ error: errors.map((error) => error?.message).join("; ") }, 400);

  return json({
    metrics: metrics.data,
    events: events.data,
    stakeholders: stakeholders.data,
    outreach: outreach.data,
    zones: zones.data,
    locations: locations.data,
    training: training.data,
  });
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
