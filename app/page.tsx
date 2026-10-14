"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Crosshair, HeartPulse, Landmark, Building2, Globe2, Menu, X, ScanLine, ShieldCheck, LoaderCircle, LockKeyhole } from "lucide-react";

import { siteConfig } from "@/site.config";

type Service = "pentesting" | "vulnerabilidades";

function Brand({ small = false }: { small?: boolean }) {
  return <a className={"brand " + (small ? "brand-small" : "")} href="#inicio" aria-label={siteConfig.name + ", inicio"}>
    <svg viewBox="0 0 32 36" fill="none" aria-hidden="true"><path d="M16 2 29 8v12c0 7-8 11-13 14C11 31 3 27 3 20V8L16 2Z" stroke="currentColor" strokeWidth="2.2"/><path d="M20 11h-5a6 6 0 0 0 0 12h5" stroke="currentColor" strokeWidth="2.4"/><path d="M20 11v4M20 19v4" stroke="currentColor" strokeWidth="2.4"/></svg>
    <span>{siteConfig.name.toUpperCase()}<span className="brand-dot">.</span></span>
  </a>;
}

function SecurityGraphic() {
  return <div className="security-graphic" aria-hidden="true">
    <div className="graphic-topline"><span className="graphic-dot" /> ANÁLISIS DE SUPERFICIE <span className="graphic-corner">[ {siteConfig.name.charAt(0).toUpperCase()} ]</span></div>
    <svg className="core-visual" viewBox="0 0 560 470" fill="none">
      <defs>
        <linearGradient id="topFace" x1="170" y1="147" x2="362" y2="264" gradientUnits="userSpaceOnUse"><stop stopColor="#E2FFAB"/><stop offset="1" stopColor="#91BD4A"/></linearGradient>
        <linearGradient id="leftFace" x1="173" y1="226" x2="284" y2="357" gradientUnits="userSpaceOnUse"><stop stopColor="#496027"/><stop offset="1" stopColor="#192315"/></linearGradient>
        <linearGradient id="rightFace" x1="363" y1="207" x2="285" y2="357" gradientUnits="userSpaceOnUse"><stop stopColor="#80A742"/><stop offset="1" stopColor="#2C401D"/></linearGradient>
        <radialGradient id="coreGlow"><stop stopColor="#BDF477" stopOpacity=".15"/><stop offset="1" stopColor="#BDF477" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="280" cy="257" rx="220" ry="190" fill="url(#coreGlow)"/>
      <g stroke="#596444" strokeOpacity=".24">
        <path d="m280 49 231 133v127L280 442 49 309V182L280 49Z"/><path d="m280 88 198 114v89L280 405 82 291v-89L280 88Z"/><path d="m280 123 164 95v55l-164 95-164-95v-55l164-95Z"/>
        <path d="M280 49v74M49 182l67 36M49 309l67-36M280 368v74M444 273l67 36M444 218l67-36" strokeDasharray="4 6"/>
        <path d="m49 309 231-133 231 133M280 49v393M49 182l231 133 231-133" strokeOpacity=".4"/>
      </g>
      <g fill="#C8F58C"><circle cx="82" cy="202" r="3"/><circle cx="478" cy="291" r="3"/><circle cx="280" cy="49" r="3"/></g>
      <path d="m176 284 104-60 104 60-104 60-104-60Z" fill="#0B0F0A" stroke="#435332"/>
      <path d="m176 284 104 60 104-60v16l-104 60-104-60v-16Z" fill="#11180E" stroke="#435332"/>
      <g className="floating-core">
        <path d="m176 191 104-60 104 60-104 60-104-60Z" fill="url(#topFace)" stroke="#D6FBA6"/>
        <path d="m176 191 104 60v111l-104-60V191Z" fill="url(#leftFace)" stroke="#7D9C55"/>
        <path d="m280 251 104-60v111l-104 60V251Z" fill="url(#rightFace)" stroke="#A9D075"/>
        <path d="m202 192 78-45 78 45-78 45-78-45Z" stroke="#435F29" strokeOpacity=".7"/>
        <path d="m264 176 20-11 24 14v14l-18 10-20-11" stroke="#1D2D12" strokeWidth="5" strokeLinejoin="round"/>
        <path d="m198 224 60 35v62l-60-35v-62Z" stroke="#749150" strokeOpacity=".5"/>
        <path d="m301 262 61-35v62l-61 35v-62Z" stroke="#D8FBA7" strokeOpacity=".32"/>
        <path d="M217 249v29m12-22v29m12-22v29" stroke="#9FBF73" strokeWidth="3" strokeOpacity=".5"/>
        <path d="m319 278 10 5 18-29" stroke="#C4F18B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g stroke="#82995E"><path d="M176 207 107 166H51"/><path d="m384 260 55-32h70"/><path d="M280 362v34l-62 36h-44"/></g>
      <g fill="#10150E" stroke="#819960"><circle cx="176" cy="207" r="4"/><circle cx="384" cy="260" r="4"/><circle cx="280" cy="362" r="4"/></g>
      <g fontFamily="monospace" fontSize="10" letterSpacing="1" fill="#9BABA0"><text x="51" y="154">APLICACIONES</text><text x="409" y="215">INFRAESTRUCTURA</text><text x="95" y="422">DATOS CRÍTICOS</text></g>
      <g stroke="#6E7A59"><path d="M22 65v-9h9M529 56h9v9M22 397v9h9M529 406h9v-9"/></g>
    </svg>
    <div className="graphic-bottomline"><span>EXPLORAR. VALIDAR. FORTALECER.</span><span className="graphic-cross">+</span></div>
  </div>;
}

const faq = [
  { question: "¿Qué diferencia hay entre los dos servicios?", answer: "El pentesting pone a prueba la seguridad mediante ataques controlados y valida el impacto de las vulnerabilidades. La evaluación de vulnerabilidades identifica y prioriza debilidades mediante herramientas de análisis y revisión técnica, sin incluir la misma profundidad de explotación. El alcance se acuerda antes de comenzar." },
  { question: "¿Qué incluye el retesting?", answer: "Después de que tu equipo implemente las correcciones, volvemos a comprobar los hallazgos incluidos en el alcance acordado. Recibís una actualización con el estado de las vulnerabilidades: corregidas, parcialmente corregidas o pendientes." },
  { question: "¿Cómo se define el alcance y el presupuesto?", answer: "Partimos de tu solicitud para conocer los sistemas a evaluar, los accesos disponibles y tus objetivos. Con esa información definimos una propuesta con alcance, entregables, tiempos y presupuesto antes de iniciar las pruebas." },
  { question: "¿Las pruebas afectan la operación de mis sistemas?", answer: "Antes de comenzar acordamos la autorización, las ventanas de trabajo y las restricciones de las pruebas. En entornos sensibles, como salud y finanzas, definimos los controles necesarios y consideramos entornos de prueba para reducir el riesgo de interrupciones." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState<Service>("pentesting");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const requestId = useRef("");
  const confirmation = useRef<HTMLDivElement>(null);

  function chooseService(next: Service) {
    setService(next);
    setMenuOpen(false);
    requestAnimationFrame(() => document.getElementById("solicitud")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }));
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("phone") || "").replace(/\D/g, "").length < 7) {
      setError("Ingresá un número de teléfono válido, con código de área.");
      (form.elements.namedItem("phone") as HTMLInputElement)?.focus();
      return;
    }
    setError("");
    setSending(true);
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: requestId.current, name: data.get("name"), email: data.get("email"), phone: data.get("phone"), description: data.get("description"), website: data.get("website"), service }),
      });
      const result = await response.json() as { reference?: string; error?: string };
      if (!response.ok || !result.reference) throw new Error(result.error || "No pudimos registrar la solicitud. Intentá nuevamente.");
      setReceipt(result.reference);
      form.reset();
      requestId.current = "";
      setTimeout(() => confirmation.current?.focus(), 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hubo un problema de conexión. Tus datos siguen en el formulario para que puedas reintentar.");
    } finally { setSending(false); }
  }

  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#servicios">Servicios</a><a href="#metodologia">Cómo trabajamos</a><a href="#sectores">Sectores</a>
        </nav>
        <a href="#solicitud" className="header-cta">Hablemos de seguridad <ArrowUpRight size={17} /></a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegación móvil">
        <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios <ArrowUpRight size={18} /></a>
        <a href="#metodologia" onClick={() => setMenuOpen(false)}>Cómo trabajamos <ArrowUpRight size={18} /></a>
        <a href="#sectores" onClick={() => setMenuOpen(false)}>Sectores <ArrowUpRight size={18} /></a>
        <a href="#solicitud" onClick={() => setMenuOpen(false)}>Solicitar un servicio <ArrowUpRight size={18} /></a>
      </nav>}
    </header>

    <main id="contenido">
      <section id="inicio" className="hero container">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="status-dot" /> CIBERSEGURIDAD OFENSIVA</div>
          <h1>Tu seguridad,<br /><span>bajo prueba.</span></h1>
          <p className="hero-description">Encontramos las brechas antes de que se conviertan en problemas. Pentesting y evaluación de vulnerabilidades para proteger lo que sostiene tu organización.</p>
          <div className="hero-actions"><a className="button button-primary" href="#solicitud">Solicitar un servicio <ArrowUpRight size={19} /></a><a className="text-link" href="#servicios">Explorar servicios <ArrowRight size={17} /></a></div>
          <div className="hero-points"><span><Check size={14} /> Alcance definido</span><span><Check size={14} /> Hallazgos accionables</span><span><Check size={14} /> Retesting incluido en pentesting</span></div>
        </div>
        <SecurityGraphic />
      </section>

      <div className="sector-strip"><div className="container strip-inner"><span className="strip-label">DONDE LA SEGURIDAD IMPORTA</span><span><HeartPulse size={17} /> Salud</span><span><Landmark size={17} /> Banca y finanzas</span><span><Globe2 size={17} /> Web y aplicaciones</span><span><Building2 size={17} /> Instituciones</span></div></div>

      <section id="servicios" className="section container services-section">
        <div className="section-intro"><div><p className="eyebrow"><span className="section-index">01 /</span> NUESTROS SERVICIOS</p><h2>Conocé tus riesgos.<br />Tomá el control.</h2></div><p className="section-description">Dos formas de entender tu exposición.<br />Un objetivo: fortalecer tu seguridad con decisiones informadas.</p></div>
        <div className="services-grid">
          <article className="service-card featured-service">
            <div className="service-top"><Crosshair size={29} strokeWidth={1.4} /><span className="service-tag">PRUEBA + VERIFICACIÓN</span></div>
            <h3>Pentesting <span>+ retesting</span></h3>
            <p>Ponemos a prueba tus defensas mediante ataques controlados. Después de las correcciones, volvemos a evaluar los hallazgos para verificar su resolución.</p>
            <ul className="service-list"><li><Check size={16} /> Pruebas sobre el alcance acordado</li><li><Check size={16} /> Validación del impacto de las brechas</li><li><Check size={16} /> Informe técnico y resumen ejecutivo</li><li><Check size={16} /> Retesting de los hallazgos acordados</li></ul>
            <button className="service-link" onClick={() => chooseService("pentesting")}>Solicitar pentesting <ArrowUpRight size={21} /></button>
            <span className="service-card-number">01</span>
          </article>
          <article className="service-card">
            <div className="service-top"><ScanLine size={29} strokeWidth={1.4} /><span className="service-tag">IDENTIFICACIÓN + ANÁLISIS</span></div>
            <h3>Evaluación de <span>vulnerabilidades</span></h3>
            <p>Identificamos debilidades en tus sistemas y las ordenamos por nivel de riesgo. Una visión clara de tu exposición y de las acciones que conviene priorizar.</p>
            <ul className="service-list"><li><Check size={16} /> Análisis de los activos definidos</li><li><Check size={16} /> Revisión y validación de hallazgos</li><li><Check size={16} /> Clasificación y priorización de riesgos</li><li><Check size={16} /> Recomendaciones de remediación</li></ul>
            <button className="service-link" onClick={() => chooseService("vulnerabilidades")}>Solicitar evaluación <ArrowUpRight size={21} /></button>
            <span className="service-card-number">02</span>
          </article>
        </div>
        <div className="service-footnote"><ShieldCheck size={17} /><p>Aplicaciones web, APIs, redes e infraestructura. Cada evaluación comienza con un alcance y una autorización definidos.</p></div>
      </section>

      <section id="metodologia" className="method-section">
        <div className="container section">
          <div className="section-intro"><div><p className="eyebrow"><span className="section-index">02 /</span> CÓMO TRABAJAMOS</p><h2>Rigor técnico.<br />Claridad en cada paso.</h2></div><p className="section-description">De la primera conversación a las acciones de mejora. Sabés qué evaluamos y qué recibís.</p></div>
          <div className="steps-grid">
            <article className="step"><div className="step-heading"><span className="step-number">01</span><span className="step-line" /><Crosshair size={21} /></div><h3>Definimos el alcance</h3><p>Entendemos tus objetivos, los sistemas involucrados y las condiciones de trabajo. Acordamos alcance, tiempos y entregables.</p></article>
            <article className="step"><div className="step-heading"><span className="step-number">02</span><span className="step-line" /><ScanLine size={21} /></div><h3>Evaluamos y documentamos</h3><p>Analizamos la seguridad, validamos los hallazgos y te entregamos un informe con evidencia, riesgos y recomendaciones.</p></article>
            <article className="step"><div className="step-heading"><span className="step-number">03</span><span className="step-line" /><ShieldCheck size={21} /></div><h3>Fortalecés tus defensas</h3><p>Tu equipo aplica las mejoras con una hoja de ruta clara. En pentesting, verificamos las correcciones mediante el retesting acordado.</p></article>
          </div>
        </div>
      </section>

      <section id="sectores" className="section container sectors-section">
        <div className="section-intro"><div><p className="eyebrow"><span className="section-index">03 /</span> SECTORES Y SISTEMAS</p><h2>Tu entorno es único.<br />Su evaluación también.</h2></div><p className="section-description">Adaptamos el alcance a la tecnología y al contexto de tu organización.</p></div>
        <div className="sectors-grid">
          <article><HeartPulse size={26} strokeWidth={1.4} /><h3>Salud</h3><p>Sistemas hospitalarios, portales de pacientes y aplicaciones de gestión clínica.</p><span>SISTEMAS HOSPITALARIOS</span></article>
          <article><Landmark size={26} strokeWidth={1.4} /><h3>Banca y finanzas</h3><p>Plataformas bancarias, aplicaciones financieras y servicios digitales.</p><span>ENTORNOS FINANCIEROS</span></article>
          <article><Globe2 size={26} strokeWidth={1.4} /><h3>Web y aplicaciones</h3><p>Sitios web, comercio electrónico, APIs y plataformas conectadas.</p><span>PRODUCTOS DIGITALES</span></article>
          <article><Building2 size={26} strokeWidth={1.4} /><h3>Instituciones</h3><p>Redes, infraestructura y sistemas de empresas y organizaciones.</p><span>ENTORNOS CORPORATIVOS</span></article>
        </div>
      </section>

      <section id="solicitud" className="contact-section">
        <div className="container contact-grid">
          <div className="contact-copy"><p className="eyebrow"><span className="section-index">04 /</span> EMPECEMOS</p><h2>El primer paso<br />es conocer<br /><span>tu riesgo.</span></h2><p>Contanos qué necesitás evaluar. Con esa información podemos definir el alcance y preparar una propuesta para tu organización.</p><div className="contact-detail"><LockKeyhole size={20} strokeWidth={1.5} /><div><strong>Una conversación con foco.</strong><span>Tus datos se utilizarán para responder a esta solicitud.</span></div></div><div className="contact-wordmark" aria-hidden="true">{siteConfig.name.charAt(0).toUpperCase()}<span>.</span></div></div>
          <div className="form-panel">
            {receipt ? <div className="success-panel" ref={confirmation} tabIndex={-1} role="status"><span className="success-icon"><Check size={29} /></span><p className="eyebrow">SOLICITUD REGISTRADA</p><h3>Ya diste el<br />primer paso.</h3><p>Tu solicitud quedó guardada. {siteConfig.name} cuenta con los datos de contacto y el detalle que enviaste para evaluar tu consulta.</p><div className="receipt"><span>TU REFERENCIA</span><strong>{receipt}</strong></div><button className="button button-outline" onClick={() => { setReceipt(""); setError(""); }}>Enviar otra solicitud <ArrowUpRight size={18} /></button></div> : <form onSubmit={submitRequest}>
              <div className="form-heading"><h3>Solicitar un servicio</h3><span><span className="status-dot" /> HABLEMOS</span></div>
              <p className="form-subtitle">Todos los campos son obligatorios.</p>
              <fieldset className="service-picker" disabled={sending}><legend>¿Qué servicio necesitás?</legend><label className={service === "pentesting" ? "service-option selected" : "service-option"}><input type="radio" name="service" value="pentesting" checked={service === "pentesting"} onChange={() => setService("pentesting")} /><span className="radio-indicator" /><span>Pentesting + retesting</span></label><label className={service === "vulnerabilidades" ? "service-option selected" : "service-option"}><input type="radio" name="service" value="vulnerabilidades" checked={service === "vulnerabilidades"} onChange={() => setService("vulnerabilidades")} /><span className="radio-indicator" /><span>Evaluación de vulnerabilidades</span></label></fieldset>
              <div className="form-row"><div className="form-field"><label htmlFor="name">Nombre y apellido</label><input id="name" name="name" type="text" autoComplete="name" placeholder="Tu nombre completo" minLength={2} maxLength={100} required disabled={sending} /></div><div className="form-field"><label htmlFor="phone">Número de teléfono</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+54 11 1234 5678" minLength={7} maxLength={40} required disabled={sending} /></div></div>
              <div className="form-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="nombre@tuempresa.com" maxLength={254} required disabled={sending} /></div>
              <div className="form-field"><label htmlFor="description">Descripción de la solicitud</label><textarea id="description" name="description" placeholder="¿Qué sistemas querés evaluar? Contanos el contexto, tus objetivos y cualquier detalle que nos ayude a definir el alcance." rows={4} minLength={20} maxLength={4000} required disabled={sending} /><span className="field-hint">Incluí al menos 20 caracteres. Evitá compartir contraseñas o datos sensibles.</span></div>
              <div className="form-honeypot" aria-hidden="true"><label htmlFor="website">Dejar vacío</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button type="submit" className="button button-primary submit-button" disabled={sending}>{sending ? <>Registrando solicitud <LoaderCircle className="spinner" size={19} /></> : <>Enviar solicitud <ArrowUpRight size={20} /></>}</button>
              <p className="form-note">Al enviar, autorizás que {siteConfig.name} te contacte por tu consulta.</p>
            </form>}
          </div>
        </div>
      </section>

      <section className="section container faq-section" id="preguntas">
        <div className="faq-intro"><p className="eyebrow">ANTES DE EMPEZAR</p><h2>Preguntas claras.<br />Respuestas también.</h2></div>
        <div className="faq-list">{faq.map((item, i) => <div className={"faq-item " + (openFaq === i ? "is-open" : "")} key={item.question}><h3><button aria-expanded={openFaq === i} aria-controls={"faq-" + i} id={"faq-question-" + i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>{item.question}<ChevronDown size={19} /></button></h3><div id={"faq-" + i} role="region" aria-labelledby={"faq-question-" + i} hidden={openFaq !== i}><p>{item.answer}</p></div></div>)}</div>
      </section>
    </main>
    <footer className="site-footer"><div className="container footer-top"><Brand small /><p>Miramos donde otros no miran.</p><a href="#inicio">Volver al inicio <ArrowUpRight size={17} /></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</span><span>PENTESTING · RETESTING · VULNERABILIDADES</span></div></footer>
  </>;
}
