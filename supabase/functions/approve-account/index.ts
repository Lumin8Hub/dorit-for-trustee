import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const actionToStatus: Record<string, string> = {
  approve: "approved",
  reject: "rejected",
  suspend: "suspended",
  reactivate: "approved",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authHeader = req.headers.get("Authorization") ?? "";
  const supabase = createClient(supabaseUrl, serviceKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const token = authHeader.replace("Bearer ", "");
  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) return json({ error: "Unauthorized" }, 401);

  const actor = await supabase
    .from("profiles")
    .select("id, role, approval_status")
    .eq("id", userData.user.id)
    .single();
  if (actor.error) return json({ error: actor.error.message }, 400);
  if (actor.data.approval_status !== "approved" || !["candidate", "manager"].includes(actor.data.role)) {
    return json({ error: "Only approved Candidate or Campaign Manager accounts can approve users" }, 403);
  }

  const body = await req.json().catch(() => null);
  const profileId = body?.profileId;
  const action = body?.action;
  const note = body?.note ?? "";
  const nextStatus = actionToStatus[action];
  if (!profileId || !nextStatus) return json({ error: "profileId and valid action are required" }, 400);

  const update = {
    approval_status: nextStatus,
    approved_at: nextStatus === "approved" ? new Date().toISOString() : null,
    approved_by: nextStatus === "approved" ? userData.user.id : null,
    decision_note: note,
    updated_at: new Date().toISOString(),
  };

  const result = await supabase
    .from("profiles")
    .update(update)
    .eq("id", profileId)
    .select()
    .single();
  if (result.error) return json({ error: result.error.message }, 400);

  await supabase.from("account_approval_log").insert({
    profile_id: profileId,
    actor: userData.user.id,
    action,
    note,
  });

  return json({ ok: true, profile: result.data });
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
