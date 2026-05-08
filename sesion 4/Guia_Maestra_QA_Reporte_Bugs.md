# Guía Maestra: Herramientas y Metodologías para el Reporte de Bugs y Gestión de QA

Esta guía proporciona un ecosistema detallado de las herramientas más utilizadas en la industria para el aseguramiento de calidad (QA), desde la gestión de casos de prueba hasta el debugging en plataformas especializadas.

---

## 1. QA Funcional
El QA Funcional se centra en verificar que cada función de la aplicación de software actúe de acuerdo con los requisitos especificados. No se evalúa el código interno, sino los resultados de las acciones del usuario.

* **Objetivo:** Validar la interfaz de usuario, API, bases de datos y la seguridad básica.
* **Proceso:** Identificación de funciones, creación de datos de prueba, ejecución de casos y comparación de resultados.

---

## 2. Gestión de Casos de Prueba (Test Case Management)
Para mantener el orden en ciclos de prueba grandes, se utilizan aplicaciones dedicadas que permiten organizar, ejecutar y rastrear el progreso de las pruebas.

### [TestRail](https://www.gurock.com/testrail/)
Es una de las herramientas web más populares para gestionar casos de prueba.
* **Detalle:** Permite organizar casos en suites, gestionar ejecuciones de prueba (Test Runs) y generar informes detallados de cobertura.
* **Uso:** Ideal para equipos que necesitan un repositorio centralizado de conocimiento de pruebas fuera de la herramienta de tickets.

### [Zephyr](https://www.smartbear.com/zephyr-scale-jira/)
Existen versiones como Zephyr Scale o Zephyr Squad, integradas directamente en Jira.
* **Detalle:** Su gran ventaja es la trazabilidad total: puedes vincular un caso de prueba directamente a una User Story de Jira y ver el estado del QA sin salir del ticket.
* **Uso:** Recomendado para equipos que ya utilizan el ecosistema de Atlassian de forma intensiva.

---

## 3. Herramientas de Proxy (Network Debugging)
Esenciales para interceptar el tráfico entre la aplicación y el servidor para analizar peticiones API, headers y respuestas JSON.

* **[Charles Proxy](https://www.charlesproxy.com/):** Herramienta multiplataforma que permite ver tráfico HTTP/HTTPS cifrado. Muy usado para "throttling" (simular internet lento).
* **[Proxyman](https://proxyman.io/):** Una alternativa moderna, extremadamente rápida y con una interfaz muy intuitiva para macOS, Windows y Linux.
* **[Fiddler](https://www.telerik.com/fiddler):** Un clásico para el monitoreo de tráfico web con potentes capacidades de scripting para modificar peticiones en tiempo real.

---

## 4. Plataformas CTV y Nativas
El testing en **CTV (Connected TV)** y aplicaciones nativas requiere herramientas específicas de acceso remoto y depuración.

### CTV (TVs Inteligentes)
* **Roku:** Utiliza el [Roku Remote Tool](https://developer.roku.com/docs/developer-program/dev-tools/roku-remote-tool.md) y el Debugger de consola (telnet puerto 8085).
* **Android TV / Fire TV:** Se gestionan principalmente vía **ADB** (Android Debug Bridge).
* **Apple TV (tvOS):** Requiere **Xcode** y el cableado/red correspondiente para inspección de logs.

### Plataformas Nativas (Mobile)
* **Android:** Android Studio (Logcat) y dispositivos físicos/emuladores.
* **iOS:** Xcode (Console/Instruments) y simuladores.
* **Nativo vs Web:** Las aplicaciones nativas se instalan directamente (APK/IPA) y acceden a APIs del sistema (cámara, GPS), lo que requiere pruebas de rendimiento y consumo de batería específicas.

---

## 5. Ecosistema de Seguimiento: Jira & Confluence
El centro neurálgico de cualquier equipo de desarrollo.

* **[Jira Software](https://www.atlassian.com/software/jira):** Se usa para la creación de tickets de bugs. Un buen ticket debe incluir: severidad, pasos para reproducir, entorno, resultado esperado vs. actual y evidencia (adjuntos).
* **[Confluence](https://www.atlassian.com/software/confluence):** La "wiki" del proyecto. Aquí se guardan los planes de prueba (Test Plans), estrategias de QA, manuales de usuario y documentación de procesos internos.

---

## 6. IA General en el Ciclo de QA
La Inteligencia Artificial está transformando el rol del QA aumentando la productividad.

* **Generación de Casos de Prueba:** Herramientas como **ChatGPT** o **Gemini** pueden generar tablas de casos de prueba (positivos, negativos, edge cases) a partir de una User Story.
* **Automatización:** Copilot o Codeium ayudan a escribir scripts en Selenium, Playwright o Appium mucho más rápido.
* **Análisis de Reportes:** Se pueden usar modelos de lenguaje para resumir logs complejos o para categorizar bugs duplicados de forma masiva.

---

## Resumen de Enlaces Rápidos

| Categoría | Herramienta Destacada | Enlace Oficial |
| :--- | :--- | :--- |
| **Gestión** | TestRail | [Visitar](https://www.gurock.com/testrail/) |
| **Integración** | Zephyr | [Visitar](https://www.smartbear.com/zephyr-scale-jira/) |
| **Proxy** | Proxyman | [Visitar](https://proxyman.io/) |
| **Tracking** | Jira | [Visitar](https://www.atlassian.com/software/jira) |
| **Documentación** | Confluence | [Visitar](https://www.atlassian.com/software/confluence) |

---
*Guía generada para apoyo técnico y mentoría en QA.*
