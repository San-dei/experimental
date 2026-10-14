# Centinel — código para GitHub y Vercel

Sitio en español con el diseño original en negro y verde lima, adaptable a celulares. Incluye pentesting + retesting, evaluación de vulnerabilidades, sectores, metodología, preguntas frecuentes y formulario.

Esta versión utiliza **Next.js** en Vercel y **Supabase** para guardar solicitudes. El diseño puede publicarse sin configurar Supabase, pero el formulario sólo confirma un envío cuando logra guardarlo. No envía notificaciones por email: las solicitudes se consultan en el panel de Supabase.

## 1. Subir el código a GitHub

1. Descomprimí el ZIP.
2. Creá un repositorio, por ejemplo **centinel-web**.
3. Subí **el contenido de la carpeta centinel-vercel** a la raíz del repositorio. **package.json**, **app**, **lib**, **public** y **supabase** deben quedar en ese primer nivel.
4. Incluí **package-lock.json**, **.gitignore** y **.env.example**. El archivo **.env.example** contiene valores de ejemplo.

También podés usar Git desde la carpeta del proyecto:

    git init
    git add .
    git commit -m "Sitio de Centinel"
    git branch -M main
    git remote add origin https://github.com/TU_USUARIO/centinel-web.git
    git push -u origin main

## 2. Crear la base de datos del formulario

1. Entrá en [Supabase](https://supabase.com) y creá un proyecto.
2. Abrí **SQL Editor**, pegá el contenido completo de **supabase/schema.sql** y ejecutalo.
3. Copiá la **URL del proyecto** desde el diálogo **Connect**.
4. En **Settings → API Keys**, obtené una clave de tipo **Secret**. Su valor empieza con **sb_secret_**.
5. Verificá que la Data API esté habilitada para el esquema **public** y pueda acceder a la tabla **solicitudes**. El SQL concede acceso al rol del servidor; los roles de visitantes no tienen permisos.

Las claves se guardan en las variables de entorno de Vercel. La clave Secret se utiliza exclusivamente en el servidor y no lleva el prefijo **NEXT_PUBLIC_**.

## 3. Desplegar en Vercel

1. En [Vercel](https://vercel.com), creá un proyecto e importá el repositorio de GitHub.
2. Elegí **Next.js** como Framework Preset. La raíz del proyecto es la carpeta que contiene **package.json**.
3. Agregá estas variables en **Settings → Environment Variables**, o en el formulario de configuración del primer despliegue:

| Variable | Valor |
| --- | --- |
| SUPABASE_URL | URL del proyecto Supabase, por ejemplo https://tu-proyecto.supabase.co |
| SUPABASE_SECRET_KEY | Clave Secret del servidor, con prefijo sb_secret_ |
| NEXT_PUBLIC_SITE_URL | Opcional: dirección pública final de la web |

4. Aplicá las variables al entorno **Production**. Para probar envíos en Preview, agregalas también a **Preview**.
5. Publicá con **Deploy**. Vercel instala las dependencias y ejecuta **npm run build**.
6. Abrí la web, enviá una solicitud de prueba y comprobá que aparece en **Supabase → Table Editor → solicitudes**.

Si agregás o cambiás variables después de un despliegue, ejecutá **Redeploy**. Cada cambio que subas a la rama principal de GitHub puede generar un nuevo despliegue.

Para una web empresarial, revisá el plan comercial correspondiente: Hobby está destinado a uso personal no comercial.

## 4. Cambiar el nombre de la empresa

Editá **site.config.ts**:

    export const siteConfig = {
      name: "Tu nueva marca",
      referencePrefix: "MARCA",
      title: "Tu seguridad, bajo prueba",
      description: "...",
    } as const;

**name** actualiza la marca visible, los textos que la mencionan, el pie de página y los títulos para buscadores. **referencePrefix** modifica el prefijo de las nuevas referencias del formulario.

El símbolo del logo y el favicon son recursos independientes. Podés modificar el SVG de **Brand** en **app/page.tsx** y **public/favicon.svg** si querés renovar la identidad gráfica.

La dirección web se administra en **Vercel → Settings → Domains**. Si cambiás de dominio, actualizá también **NEXT_PUBLIC_SITE_URL** y volvé a desplegar.

## 5. Trabajar en tu computadora

Necesitás Node.js 22.13 o superior y npm.

    npm ci
    npm run dev

Abrí http://localhost:3000.

Para habilitar el formulario localmente, copiá **.env.example** como **.env.local** y completá los datos de Supabase. En Windows podés hacer esa copia desde el Explorador.

Comprobaciones:

    npm run typecheck
    npm test
    npm run build
    npm start

## Archivos principales

| Archivo | Función |
| --- | --- |
| site.config.ts | Nombre, prefijo de referencias y metadatos |
| app/page.tsx | Secciones, textos e interacción del formulario |
| app/globals.css | Colores, tipografía y diseño adaptable |
| app/api/solicitudes/route.ts | Validación y recepción de solicitudes |
| lib/save-request.ts | Guardado en Supabase desde el servidor |
| supabase/schema.sql | Tabla y permisos de la base de datos |

## Funcionamiento del formulario

Requiere nombre, teléfono, email y una descripción de al menos 20 caracteres. El visitante elige entre los dos servicios. El servidor valida la información y guarda una fila con referencia, estado inicial **nueva** y fecha.

Un identificador único evita registros duplicados al reintentar. Hay un campo trampa para envíos automatizados y un límite de tamaño de solicitud. La API pública no permite consultar las solicitudes de otras personas.

Si la base no está configurada o falla, el visitante recibe un error y conserva lo escrito para reintentar. La confirmación de envío aparece después de una respuesta exitosa de la base.

La base de esta versión es independiente de la del sitio anterior. Esta exportación no copia registros existentes.

## Verificación de esta entrega

Se comprueban TypeScript, la compilación de Next.js y el contrato del formulario con una API simulada: validación, configuración ausente, éxito, reintentos y fallos del guardado. La conexión real a tu proyecto Supabase y el despliegue en tu cuenta se verifican con el envío de prueba del paso 3.

## Documentación oficial

- [Desplegar proyectos en Vercel](https://vercel.com/docs/deployments)
- [Variables de entorno en Vercel](https://vercel.com/docs/environment-variables)
- [Claves de API de Supabase](https://supabase.com/docs/guides/getting-started/api-keys)
- [API REST de Supabase](https://supabase.com/docs/guides/api/creating-routes)
- [Dominios en Vercel](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
