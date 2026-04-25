import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authHeader = req.headers.get("Authorization") ?? "";
  const supabase = createClient(supabaseUrl, serviceKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const [metrics, events, outreach, zones] = await Promise.all([
    supabase.from("campaign_metrics").select("*").order("category"),
    supabase.from("events").select("id,tier,status,date,half").gte("date", new Date().toISOString().slice(0, 10)),
    supabase.from("outreach_logs").select("id,status,follow_up_date"),
    supabase.from("canvass_zones").select("doors_knocked,hard_ids,target_doors,tier,half"),
  ]);

  const errors = [metrics.error, events.error, outreach.error, zones.error].filter(Boolean);
  if (errors.length) {
    return json({ error: errors.map((error) => error?.message).join("; ") }, 400);
  }

  return json({
    metrics: metrics.data,
    upcomingTier1Events: events.data?.filter((event) => event.tier === 1).length ?? 0,
    openFollowUps: outreach.data?.filter((item) => item.status !== "Closed").length ?? 0,
    doorsKnocked: zones.data?.reduce((sum, zone) => sum + Number(zone.doors_knocked ?? 0), 0) ?? 0,
    hardIdsFromZones: zones.data?.reduce((sum, zone) => sum + Number(zone.hard_ids ?? 0), 0) ?? 0,
  });
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
