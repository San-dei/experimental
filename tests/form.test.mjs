import { after, test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const temporary = await mkdtemp(join(tmpdir(), "centinel-tests-"));
after(() => rm(temporary, { recursive: true, force: true }));

const modules = {
  "@/lib/request-schema": pathToFileURL(join(temporary, "schema.mjs")).href,
  "@/lib/save-request": pathToFileURL(join(temporary, "storage.mjs")).href,
  "@/site.config": pathToFileURL(join(temporary, "config.mjs")).href,
  zod: import.meta.resolve("zod"),
  react: import.meta.resolve("react"),
  "react/jsx-runtime": import.meta.resolve("react/jsx-runtime"),
  "lucide-react": import.meta.resolve("lucide-react"),
};

async function compile(relative, name) {
  const source = await readFile(join(root, relative), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  const output = outputText.replace(/from "([^"]+)"/g, (full, specifier) =>
    modules[specifier] ? 'from "' + modules[specifier] + '"' : full);
  await writeFile(join(temporary, name), output);
}
await compile("site.config.ts", "config.mjs");
await compile("lib/request-schema.ts", "schema.mjs");
await compile("lib/save-request.ts", "storage.mjs");
await compile("app/api/solicitudes/route.ts", "route.mjs");
await compile("app/page.tsx", "page.mjs");

const { POST } = await import(pathToFileURL(join(temporary, "route.mjs")).href);
const { default: Home } = await import(pathToFileURL(join(temporary, "page.mjs")).href);
const valid = {
  requestId: "71880f55-1a48-4f39-973d-d5e204f91879",
  name: " Prueba Centinel ",
  email: "QA@example.invalid",
  phone: "+54 11 0000 0000",
  service: "pentesting",
  description: "Necesito evaluar la seguridad de una aplicación de prueba.",
  website: "",
};
const send = (data = valid, origin = "https://centinel.example", type = "application/json") =>
  POST(new Request("https://centinel.example/api/solicitudes", {
    method: "POST",
    headers: { origin, "content-type": type },
    body: JSON.stringify(data),
  }));

test("Contrato del formulario: validación, envío y fallos", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalError = console.error;
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SECRET_KEY;
  const calls = [];
  const rows = new Map();
  const secret = "sb_secret_qa_placeholder";
  console.error = () => {};
  globalThis.fetch = async (url, options) => {
    const record = JSON.parse(options.body);
    calls.push({ url: String(url), options, record });
    // El simulador sigue el contrato de PostgREST para una PK duplicada.
    assert.equal(options.headers.Prefer, "resolution=ignore-duplicates,return=minimal");
    if (!rows.has(record.id)) rows.set(record.id, record);
    return new Response(null, { status: 201 });
  };
  process.env.SUPABASE_URL = "https://centinel-test.supabase.co";
  process.env.SUPABASE_SECRET_KEY = secret;
  try {
    await t.test("Guarda campos validados y mantiene la clave fuera de la respuesta", async () => {
      const response = await send();
      assert.equal(response.status, 201);
      const result = await response.json();
      assert.deepEqual(result, { reference: "CNT-71880F55" });
      assert.equal(calls.length, 1);
      assert.equal(calls[0].url, "https://centinel-test.supabase.co/rest/v1/solicitudes?on_conflict=id");
      assert.equal(calls[0].options.headers.apikey, secret);
      assert.equal(calls[0].options.headers.Authorization, undefined);
      assert.equal(calls[0].record.nombre, "Prueba Centinel");
      assert.equal(calls[0].record.email, "qa@example.invalid");
      assert.equal(calls[0].record.servicio, "pentesting");
      assert.ok(!JSON.stringify(result).includes(secret));
    });
    await t.test("Un reintento usa el mismo identificador", async () => {
      assert.equal((await send()).status, 201);
      assert.equal(rows.size, 1);
      assert.equal(calls[0].record.id, calls[1].record.id);
    });
    await t.test("Acepta evaluación de vulnerabilidades", async () => {
      const request = { ...valid, requestId: "f6e36a20-e09e-453f-a7be-5669c63e0ca8", service: "vulnerabilidades" };
      assert.equal((await send(request)).status, 201);
      assert.equal(rows.get(request.requestId).servicio, "vulnerabilidades");
    });
    await t.test("Rechaza información inválida antes de contactar la base", async () => {
      const previous = calls.length;
      for (const data of [
        { ...valid, requestId: "invalid" },
        { ...valid, name: " " },
        { ...valid, email: "invalid" },
        { ...valid, phone: "123" },
        { ...valid, phone: "letters1234567" },
        { ...valid, service: "invalid" },
        { ...valid, description: "corto" },
        { ...valid, website: "spam" },
      ]) assert.equal((await send(data)).status, 400);
      assert.equal((await send(valid, "https://other.example")).status, 403);
      assert.equal((await send(valid, "https://centinel.example", "text/plain")).status, 415);
      assert.equal((await send({ ...valid, description: "😀".repeat(6000) })).status, 413);
      assert.equal(calls.length, previous);
    });
    await t.test("Configuración ausente: no confirma un envío sin guardarlo", async () => {
      const previous = calls.length;
      delete process.env.SUPABASE_SECRET_KEY;
      const response = await send();
      assert.equal(response.status, 503);
      assert.ok(!(await response.json()).reference);
      assert.equal(calls.length, previous);
      process.env.SUPABASE_SECRET_KEY = secret;
    });
    await t.test("Fallo de la base o conexión: devuelve error sin exponer detalles", async () => {
      globalThis.fetch = async () => new Response('{"message":"private database detail"}', { status: 500 });
      let response = await send();
      assert.equal(response.status, 503);
      assert.ok(!(await response.text()).includes("private database detail"));
      globalThis.fetch = async () => { throw new Error("Connection failed"); };
      response = await send();
      assert.equal(response.status, 503);
      assert.ok(!(await response.json()).reference);
    });
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalError;
    if (originalUrl === undefined) delete process.env.SUPABASE_URL; else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SECRET_KEY; else process.env.SUPABASE_SECRET_KEY = originalKey;
  }
});

test("La página renderiza y todos los enlaces de navegación tienen destino", () => {
  const html = renderToStaticMarkup(React.createElement(Home));
  assert.match(html, /Tu seguridad,/);
  assert.match(html, /CENTINEL/);
  assert.match(html, /Pentesting/);
  for (const name of ["name", "email", "phone", "description"])
    assert.ok(html.includes('name="' + name + '"'));
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const link of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(ids.includes(link[1]), "Missing navigation target " + link[1]);
});
