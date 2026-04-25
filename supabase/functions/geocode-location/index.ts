import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const { id, address } = await req.json();
  if (!id || !address) return json({ error: "id and address required" }, 400);

  const mapboxToken = Deno.env.get("MAPBOX_TOKEN");
  if (!mapboxToken) return json({ error: "MAPBOX_TOKEN is not configured" }, 400);

  const query = encodeURIComponent(`${address}, Ontario, Canada`);
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=1&access_token=${mapboxToken}`;
  const response = await fetch(geocodeUrl);
  const geocode = await response.json();
  const feature = geocode.features?.[0];
  if (!feature) return json({ error: "No geocode result" }, 404);

  const [longitude, latitude] = feature.center;
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const result = await supabase
    .from("map_locations")
    .update({ latitude, longitude })
    .eq("id", id)
    .select()
    .single();

  if (result.error) return json({ error: result.error.message }, 400);
  return json({ ok: true, location: result.data });
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
