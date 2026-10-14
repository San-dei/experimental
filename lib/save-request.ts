// Importar exclusivamente desde el servidor: usa una clave privada.
import type { ServiceRequest } from "./request-schema";

export async function saveServiceRequest(data: ServiceRequest): Promise<void> {
  const baseUrl = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!baseUrl || !secretKey || !secretKey.startsWith("sb_secret_") || secretKey === "sb_secret_reemplazar") {
    console.error("Formulario: faltan SUPABASE_URL o SUPABASE_SECRET_KEY válidos.");
    throw new Error("Database configuration missing");
  }

  const projectUrl = new URL(baseUrl);
  if (projectUrl.protocol !== "https:") {
    throw new Error("Database URL must use HTTPS");
  }
  const endpoint = new URL("/rest/v1/solicitudes", projectUrl);
  endpoint.searchParams.set("on_conflict", "id");

  const result = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: secretKey,
      // Evita duplicados cuando el visitante reintenta un envío.
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify({
      id: data.requestId,
      nombre: data.name,
      email: data.email,
      telefono: data.phone,
      servicio: data.service,
      descripcion: data.description,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

  if (!result.ok) {
    // No registrar datos personales, claves ni la respuesta privada de la base.
    console.error("Formulario: la base de datos respondió con estado " + result.status);
    throw new Error("Database insert failed");
  }
}
