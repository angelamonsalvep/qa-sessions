# Taller Práctico: Diseño y Ejecución de Casos de Prueba

## 🏢 Contexto del Negocio: Sistema de Reserva de Turnos Médicos

La clínica "Salud Digital" está a punto de lanzar su nuevo portal de pacientes. Una de las funcionalidades críticas es el **Sistema de Reserva de Turnos Médicos en Línea**. Si este sistema falla, los pacientes no podrán atenderse, lo que generará quejas, pérdida de dinero y un colapso en la atención telefónica.

Tu misión como QA Engineer es diseñar y documentar una suite de pruebas (Test Cases) para garantizar que el flujo de reserva y gestión de turnos funcione correctamente y maneje los errores de forma adecuada.

## 📋 Reglas de Negocio y Requisitos

El equipo de desarrollo te ha entregado los siguientes criterios de aceptación para el módulo de "Reserva de Turnos":

1. **Usuario Autenticado:** Solo los pacientes con cuenta activa y que hayan iniciado sesión pueden reservar un turno.
2. **Disponibilidad:** Un turno solo puede reservarse si la fecha y hora seleccionadas están marcadas como "Disponibles" en el calendario del médico.
3. **Restricción de Especialidad:** Un paciente no puede reservar más de dos (2) turnos activos para la misma especialidad (ej. Cardiología) en el mismo mes calendario.
4. **Confirmación:** Al finalizar la reserva exitosamente, el sistema debe redirigir a una pantalla de éxito, mostrar el mensaje "Turno Confirmado con el código #XXXX" y enviar un correo electrónico al paciente.
5. **Cancelación:** El paciente puede cancelar un turno desde su perfil, siempre y cuando falten más de 24 horas para la cita. Si faltan menos de 24 horas, el sistema debe deshabilitar el botón de cancelar y mostrar un tooltip/mensaje de error: "No es posible cancelar con menos de 24h de anticipación".

---

## 🛠️ Guía de Uso de la Herramienta (Módulo 8)

Para resolver este taller, utilizarás el **Gestor de Suite de Casos de Prueba** integrado en la presentación HTML (Módulo 8 · Taller).

### ¿Cómo interactuar con la herramienta?

1. **Navega al Módulo 8:** Abre el archivo `test-cases-clase.html` en tu navegador y avanza hasta la diapositiva "Suite de Test Cases".
2. **Crea tu primer Test Case:** Utiliza el formulario de la izquierda (**➕ Nuevo Test Case**) para documentar tus pruebas basándote en las reglas de negocio de arriba.
   - **ID:** Usa una nomenclatura clara para este proyecto, por ejemplo: `TC-RES-001`, `TC-RES-002`.
   - **Título:** Sé descriptivo (ej. "Reserva exitosa de un turno disponible en Cardiología").
   - **Módulo:** Selecciona el módulo que más se acerque o usa la herramienta para estructurar la idea.
   - **Tipo:** Clasifica tu prueba en el desplegable (Happy Path ✅, Negativo ❌, Caso Borde ⚠️).
   - **Precondiciones, Pasos y Resultado Esperado:** Llena los campos de texto siguiendo las buenas prácticas aprendidas (pasos numerados, acciones atómicas, resultados 100% verificables).
3. **Agrega a la Suite:** Haz clic en el botón verde "✚ Agregar a la suite". Tu caso validado aparecerá como una tarjeta en la lista de la derecha.
4. **Simula la Ejecución:** Una vez que tengas varios casos en tu suite (a la derecha), simula que los estás ejecutando contra el sistema de la clínica. Cambia el estado de cada tarjeta usando los botones inferiores:
   - **PASS:** Si asumes que el sistema funcionó según lo esperado.
   - **FAIL:** Si decides simular que encontraste un bug (el resultado real no coincidió con el esperado).
   - **BLOCKED:** Si simulas que una prueba no pudo ejecutarse (ej. el ambiente de pruebas se cayó o faltaban datos).
5. **Experimenta:** Puedes usar los botones de "💡 Cargar ejemplo" a la izquierda para ver cómo se estructuran casos profesionales y luego modificarlos, o usar el botón "Limpiar todo" para empezar tu propia suite desde cero.

---

## 💡 Pistas y Consejos para el Taller

*   **Empieza por el Happy Path (Camino Feliz):** Tu primer Test Case debería ser el flujo ideal (TC-RES-001). ¿Qué pasa cuando un usuario autenticado reserva un turno disponible sin romper ninguna regla? Valida la Regla 1, 2 y 4.
*   **Ataca los Casos Negativos:** ¿Qué pasa si el usuario intenta reservar un tercer turno de Cardiología en el mismo mes? (Regla 3). Crea un Test Case tipo "Negativo" para validar que el sistema lo impida y muestre el error correcto.
*   **Sé Específico en el Resultado:** En el campo "Resultado Esperado", no escribas *"Da error"*. Escribe: *"El sistema bloquea la reserva y muestra un mensaje en rojo indicando: 'Límite de turnos mensuales alcanzado para esta especialidad'"*.
*   **Aprovecha las Precondiciones:** Si vas a probar la cancelación con menos de 24 horas (Regla 5), una precondición clave sería: *"El paciente tiene un turno asignado para el día de hoy dentro de 10 horas"*. Esto ahorra tener que escribir los pasos de creación del turno en ese mismo test.
*   **Un solo objetivo:** No intentes probar la creación de la reserva y la cancelación en el mismo Test Case. Divídelos (uno para reservar, otro para cancelar).

¡Éxitos en tu diseño de pruebas! Asegúrate de que cualquier persona de tu equipo pueda leer tus tarjetas en la suite y saber exactamente qué y cómo probar.