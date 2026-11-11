# Guía de trabajo · Grupo 30

## Estado actual del TP

La landing de **Convocado** presenta las dos sentencias asignadas del bloque
**Asistencia y datos faltantes**:

- **R5:** confirmación de asistencia condicionada por aceptación del capitán y reserva vigente.
- **R6:** derivación a evaluación manual cuando el jugador no tiene valoración, sin inventar un puntaje.

La página incluye:

- Presentación de la startup, logo original, grupo y articulación IFTS 16 / IFTS 29.
- Fichas de desarme lógico para R5 y R6.
- Una propuesta agéntica por sentencia.
- Dos diagramas Mermaid con decisiones, resultados y casos límite.
- Desplegables accesibles con detalles operativos.
- Simuladores de casos positivos, negativos y excepciones.
- Mockup interactivo de la aplicación Convocado.
- Tema oscuro predeterminado con cambio a modo claro.
- Diseño responsive con estética premium inspirada en el deporte y la conexión de equipos.
- Resumen ejecutivo, fichas de propuesta, leyenda visual y aclaración de alcance.

La página representa una propuesta conceptual. No ejecuta agentes reales, no conecta
APIs y no implementa backend.

## Tareas de cada integrante

Cada integrante debe completar su nombre y aporte real en el `README.md`, revisar
la parte asignada y realizar su propio commit y push. No se deben inventar aportes:
cada persona debe documentar lo que efectivamente revisó o produjo.

### Marcelo Yrala · Coordinación e integración

- Revisar la estructura general de la landing.
- Coordinar las instrucciones al agente.
- Verificar que R5 conserve la lógica de aceptación + reserva.
- Integrar los cambios finales sin sobrescribir aportes ajenos.
- Confirmar que el repositorio y la landing publicada sean accesibles.

### Integrante 2 · Lógica proposicional y R6

- Completar su nombre en el `README.md`.
- Revisar el desarme formal de R5 y R6.
- Verificar especialmente la condición de R6 y la regla de no inventar puntuaciones.
- Revisar la intervención humana y el caso urgente.
- Hacer un commit con su aporte y subirlo mediante push.

### Integrante 3 · Pruebas y accesibilidad

- Completar su nombre en el `README.md`.
- Probar la navegación en desktop.
- Abrir y cerrar todos los `<details>` con mouse y teclado.
- Probar un caso positivo y uno negativo de cada flujo.
- Revisar contraste, lectura y ausencia de desbordes.
- Hacer un commit con sus verificaciones o correcciones y realizar push.

### Integrante 4 · Assets, documentación y publicación

- Completar su nombre en el `README.md`.
- Confirmar que el logo original se vea completo y legible.
- Revisar que los enlaces del repositorio y de la landing sean correctos.
- Actualizar la documentación de herramientas y modelos utilizados.
- Verificar que la publicación muestre la versión final.
- Hacer un commit y push con su aporte.

### Integrante 5 · Simuladores y mockup

- Completar su nombre en el `README.md`.
- Probar los simuladores de R5 y R6, incluyendo los casos límite.
- Revisar las tres vistas del mockup interactivo.
- Confirmar que los estados mostrados coincidan con las sentencias.
- Documentar cualquier corrección realizada.
- Hacer su propio commit y push.

## Checklist final del grupo

- [ ] Todos los integrantes completaron nombre y aporte en `README.md`.
- [ ] Cada integrante realizó un commit y push propio.
- [ ] El repositorio abre sin autenticación.
- [ ] La landing publicada abre sin autenticación.
- [ ] La landing publicada corresponde a la última versión.
- [ ] El logo se ve completo y legible.
- [ ] Los dos diagramas son legibles.
- [ ] Los desplegables funcionan con clic y teclado.
- [ ] Se probó un caso que cumple y otro que no cumple para R5 y R6.
- [ ] Las herramientas y modelos declarados son los realmente utilizados.
- [ ] El grupo puede explicar qué pertenece a la sentencia y qué fue agregado como propuesta.
