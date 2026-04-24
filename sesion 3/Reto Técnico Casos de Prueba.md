# 🚀 Reto Técnico: Piensa como un Solution Engineer - Testing de Login

**Herramienta:** Simulador Interactivo HTML (`test-cases-clase.html`)

## 1. El Objetivo del Coder
En el desarrollo de software profesional, no basta con que el código compile o que el "camino feliz" funcione. Un verdadero Solution Engineer anticipa cómo los usuarios (o los atacantes) podrían romper el sistema.

Tu misión en este taller es ponerte el sombrero de QA (Aseguramiento de Calidad) y documentar los escenarios de prueba para un módulo de Login, asegurándote de cubrir desde lo más básico hasta los Edge Cases (casos límite).

## 2. Reglas de Negocio (Lo que tu código debería soportar)
* **Acceso:** El ingreso al Dashboard solo es posible si el email y el password coinciden exactamente con la base de datos.
* **Seguridad (Mensajes):** Ante cualquier error de credenciales, el sistema debe responder: "Credenciales inválidas". Nunca le decimos al usuario si lo que falló fue el correo o la clave.
* **Validación de Formato:** El campo email debe exigir la estructura técnica estándar (`usuario@dominio.com`).
* **Campos Requeridos:** El botón de "Iniciar sesión" no debe procesar peticiones HTTP si hay campos vacíos.
* **Privacidad:** El input de la contraseña debe ocultar los caracteres.

## 3. El Mapa de Pruebas (Tu Reto)
Utilizando el simulador HTML, debes crear Test Cases que cubran las siguientes dimensiones. ¡No te quedes solo en los tres primeros!

### A. Funcionalidad Básica y Manejo de Errores
* **Happy Path:** El usuario hace todo perfecto y logra entrar.
* **Negative Path:** El usuario se equivoca en la contraseña o intenta ingresar con un correo que no existe.
* **Empty States:** ¿Qué pasa si le da clic a "Enviar" sin escribir nada?

### B. 🚩 Edge Cases (Casos Límite - Aquí se ve tu nivel)
* **Trim (Espacios extra):** El usuario copió y pegó su correo, dejando un espacio en blanco al final (`" user@mail.com "`). ¿El sistema lo limpia o falla?
* **Case Sensitivity:** El usuario escribió `ADMIN@MAIL.COM`. ¿El login es sensible a mayúsculas en el correo?
* **Longitud Extrema:** El usuario intenta ingresar una contraseña de 1 carácter o un correo de 300 caracteres.
* **Doble Submit:** El usuario hace doble clic rapidísimo en el botón de "Iniciar sesión".

### C. Seguridad Básica (Opcional pero recomendado)
* **Inyección Básica:** ¿Qué pasa si en el campo de correo escriben `' OR 1=1 --` o `<script>alert('xss')</script>`?

## 4. Instrucciones para el Simulador
Para cada escenario que descubras, completa el formulario en el archivo interactivo asegurándote de que el Checklist de Calidad se pinte de verde.

* **ID:** Usa secuencias claras. 💡 *Pro Tip: Como estándar de la industria, acostúmbrate a usar inglés técnico para los IDs (ej: `TC-LOGIN-INVALID-PWD`, `TC-LOGIN-EMPTY-FIELDS`).*
* **Título:** Qué módulo es, qué acción se hace y qué se espera.
* **Precondiciones:** ¿El usuario ya existe en la base de datos? ¿Tiene conexión? Defínelo antes de empezar.
* **Pasos (Steps):** Escribe como un algoritmo. Una acción por línea. (1. Ir a `/login`, 2. Ingresar email...).
* **Resultado Esperado:** Sé muy técnico. "El sistema redirige a `/dashboard`" o "Se renderiza mensaje de error".

## 🏆 ¿Cómo saber si hiciste un buen trabajo?
Cualquier persona puede escribir 3 casos de prueba básicos. Un coder en formación que entiende la lógica de negocio intentará romper el sistema y documentará al menos 6 u 8 casos diferentes.

¡Abre el archivo `test-cases-clase.html` y demuestra qué tan robusta es tu lógica!
