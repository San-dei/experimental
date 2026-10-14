import { requestSchema } from "@/lib/request-schema";
import { saveServiceRequest } from "@/lib/save-request";
import { siteConfig } from "@/site.config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: "El origen de la solicitud no es válido." }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "Formato de solicitud no válido." }, 415);
  }
  if (Number(request.headers.get("content-length") || 0) > 20000) {
    return json({ error: "La solicitud es demasiado extensa." }, 413);
  }
  let payload: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > 20000) {
      return json({ error: "La solicitud es demasiado extensa." }, 413);
    }
    payload = JSON.parse(body);
  } catch {
    return json({ error: "No pudimos leer la solicitud." }, 400);
  }
  const parsed = requestSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ error: parsed.error.issues[0]?.message || "Revisá los datos del formulario." }, 400);
  }
  if (parsed.data.website) {
    return json({ error: "No pudimos registrar la solicitud. Revisá el formulario." }, 400);
  }
  try {
    await saveServiceRequest(parsed.data);
    return json({ reference: siteConfig.referencePrefix + "-" + parsed.data.requestId.slice(0, 8).toUpperCase() }, 201);
  } catch {
    return json({ error: "No pudimos guardar tu solicitud. Tus datos siguen en el formulario; intentá nuevamente en unos minutos." }, 503);
  }
}
