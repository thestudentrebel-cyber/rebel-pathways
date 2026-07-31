import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquirySchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  company_name: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional().default(""),
  website: z.string().trim().max(200).optional().default(""),
  service_required: z.string().trim().max(80).optional().default(""),
  business_description: z.string().trim().max(2000).optional().default(""),
  requirement: z.string().trim().max(4000).optional().default(""),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("enquiries").insert({
      full_name: data.full_name,
      company_name: data.company_name,
      email: data.email,
      phone: data.phone || null,
      website: data.website || null,
      service_required: data.service_required || null,
      business_description: data.business_description || null,
      requirement: data.requirement || null,
    });
    if (error) {
      console.error("[enquiries] insert failed", error.message);
      return { ok: false as const, error: "We couldn't send your enquiry. Please try again." };
    }
    return { ok: true as const };
  });

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ username: z.string().max(200), password: z.string().max(200) }).parse(data),
  )
  .handler(async ({ data }) => {
    const { verifyCredentials, issueToken } = await import("./admin-auth.server");
    if (!verifyCredentials(data.username, data.password)) {
      return { ok: false as const, error: "Invalid credentials" };
    }
    return { ok: true as const, token: await issueToken() };
  });

export const listEnquiries = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ token: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { verifyToken } = await import("./admin-auth.server");
    if (!(await verifyToken(data.token))) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const updateEnquiryStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        token: z.string(),
        id: z.string().uuid(),
        status: z.enum(["new", "contacted", "converted", "closed"]),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { verifyToken } = await import("./admin-auth.server");
    if (!(await verifyToken(data.token))) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("enquiries")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ token: z.string(), id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data }) => {
    const { verifyToken } = await import("./admin-auth.server");
    if (!(await verifyToken(data.token))) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("enquiries").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
