# Brief Form — Nicola Nania Web Design

## Overview

Formulario web multi-step para que clientes de Nicola Nania provean un brief claro antes de recibir cotización. El formulario cubre: información general de la empresa, objetivos y alcance del sitio, identidad visual y contenido disponible, y logística/referencias visuales.

## Tech Stack

- **HTML + CSS + JS** en un solo archivo `index.html` autocontenido
- **Google Sheets** como backend vía Google Apps Script (Web App POST endpoint)
- **GitHub Pages** para hosting
- Sin frameworks, sin dependencias externas (excepto Google Fonts)
- Logo NN como asset en `assets/logo.png`

## Estructura del proyecto

```
nicola-brief/
├── index.html
├── assets/
│   └── logo.png
└── docs/
```

## Estilo Visual

- **Paleta**: navy oscuro (#0a1628), cards (#111d33), bordes (#1e3050), negro (#000)
- **Acentos**: gradientes plateados/cromáticos (linear-gradient #c0c0c0 → #e8e8e8) en botones y barra de progreso
- **Tipografía heading**: Playfair Display (serif) — bold, con personalidad
- **Tipografía body**: Inter o similar sans-serif limpia
- **Logo**: Monograma NN cromático en header
- **Transiciones**: fade/slide suave entre pasos (CSS transitions)
- **Responsive**: mobile-first, funcional en cualquier dispositivo

## Flujo Multi-Step (4 pasos)

### Paso 1: Información General
| Campo | Tipo | Requerido |
|-------|------|-----------|
| Nombre de la Empresa | text input | sí |
| Sector/Rubro | text input con placeholder "Ej: Eléctrico, Petrolero, Construcción" | sí |
| ¿Cuentan con logo actual? | radio (Sí / No) | sí |
| ¿Tienen definido un nombre de dominio web? | text input con placeholder "Ej: www.tuempresa.com" | no |

### Paso 2: Objetivos y Alcance
| Campo | Tipo | Requerido |
|-------|------|-----------|
| Objetivo principal de la web | text input con placeholder "Ej: Vender servicios, generar credibilidad, recibir cotizaciones" | sí |
| Secciones requeridas | checkboxes: Inicio, Sobre Nosotros, Servicios, Proyectos/Galería, Alianzas, Contacto, Otro (con text input) | sí (mínimo 1) |
| Funcionalidades específicas | textarea con placeholder "Ej: Formulario de cotización, botón de WhatsApp, mapa interactivo, área privada para clientes" | no |

### Paso 3: Identidad Visual y Contenido
| Campo | Tipo | Requerido |
|-------|------|-----------|
| Colores preferidos | text input con placeholder "¿Tienen colores corporativos definidos?" | no |
| Estilo visual | select/dropdown: Minimalista, Industrial, Moderno, Serio/Formal, Otro | sí |
| ¿Cuentan con fotografías propias? | radio (Sí / No) | sí |
| ¿Tienen redactado el contenido (textos)? | radio (Sí / No) | sí |

Nota visible: "Si la respuesta es 'No', podemos incluir servicio de redacción o usar textos provisionales."

### Paso 4: Logística y Referencias
| Campo | Tipo | Requerido |
|-------|------|-----------|
| Fecha objetivo de entrega | date input | no |
| Responsable de aprobaciones | text input "Nombre y cargo" | sí |
| Web de referencia 1 | url input | no |
| Web de referencia 2 | url input | no |
| Lo que más te gusta de esas webs | textarea con placeholder "Ej: La limpieza del diseño, cómo muestran los servicios, la rapidez, que se ven muy profesionales" | no |
| Referencias de logo | textarea con placeholder "Describe qué elementos te llaman la atención: formas, tipografía, estilo industrial, etc." | no |

## Barra de Progreso

- 4 círculos numerados conectados por líneas
- Paso activo: círculo con gradiente cromático plateado
- Pasos completados: mismos gradiente cromático
- Pasos pendientes: fondo oscuro con borde gris
- Label del paso actual visible debajo de la barra

## Navegación entre pasos

- Botón "Siguiente →" (gradiente plateado) a la derecha
- Botón "← Anterior" (texto gris) a la izquierda
- Botón "Enviar Brief" en el último paso (reemplaza "Siguiente")
- Validación de campos requeridos antes de avanzar al siguiente paso

## Pantalla de Confirmación

Después de envío exitoso:
- Ícono de check animado
- "¡Gracias! Tu brief ha sido enviado."
- "Nos pondremos en contacto contigo pronto para la cotización."
- El formulario se oculta y se muestra solo la confirmación

## Integración Google Sheets

- POST a un Google Apps Script Web App endpoint
- El endpoint URL se configura como constante en el JS
- Cada envío = una fila nueva en el Sheet
- Columnas del Sheet corresponden 1:1 con los campos del formulario
- Los checkboxes de secciones se envían como string separado por comas (ej: "Inicio, Servicios, Contacto")
- Estado de carga visible durante el envío (spinner o botón deshabilitado)
- Manejo de error: mensaje amigable si falla la conexión

## Validación

- Campos requeridos marcados con asterisco visual (*)
- Validación al intentar avanzar de paso (no en tiempo real para no ser invasivo)
- Mensajes de error en rojo debajo del campo inválido
- URL inputs validan formato básico de URL
- Email no se pide (el contacto posterior es por otra vía)

## Responsive

- Mobile: campos a ancho completo, barra de progreso compacta
- Tablet/Desktop: máximo 640px de ancho centrado con fondo navy completo
- Los checkboxes se organizan en grid de 2 columnas en desktop, 1 en mobile
