# TP3 · Dos sentencias, dos soluciones
## Desarrollo de Sistemas Web · Front End · 2026 · 2do Cuatrimestre · IFTS 29

---

### 📌 Datos Generales de la Entrega
* **Grupo:** Grupo 30
* **Startup Asignada:** Convocado
* **Rubro de la Startup:** Deportes y conexión de equipos (Red para que jugadores encuentren equipos y soliciten participar en partidos).
* **Bloque Asignado:** Asistencia y datos faltantes
* **Sorteo Docente:** S10-B / S08-C (Página 42 de la consigna oficial)
* **Fecha de Entrega:** 26/11/2026
* **Modalidad de Evaluación:** Rúbrica oficial (Sin nota numérica · Aprobado / Desaprobado · Niveles: *No cumple*, *Cumple*, *Propone*)
* **Enfoque de Construcción:** **100% Agéntico** (*"Ustedes dirigen. El agente construye"*).

---

### 🔗 Enlaces del Proyecto (Rúbrica 02)
* **Repositorio en GitHub:** [https://github.com/marcelo-yrala/tp3-frontend-grupo30](https://github.com/marcelo-yrala/tp3-frontend-grupo30)
* **Landing Page Publicada (Producción):** [https://marcelo-yrala.github.io/tp3-frontend-grupo30/convocado-tp3/](https://marcelo-yrala.github.io/tp3-frontend-grupo30/convocado-tp3/) *(o enlace equivalente en Vercel / GitHub Pages)*

> **Comprobación de accesibilidad sin sesión:** Ambos enlaces son públicos y pueden abrirse en una ventana en modo incógnito/privado sin necesidad de autenticación previa.

---

### 👥 Integrantes del Grupo 30 y Aportes Individuales (Rúbrica 01)

| Integrante | Rol / Aportes Concretos |
| :--- | :--- |
| **Marcelo Yrala** | Coordinación general, dirección de prompts al agente de IA para estructura semántica y diseño CSS, verificación de lógica de R5. |
| **Integrante 2** *(Nombre a completar por el grupo)* | Desarme formal de sentencias proposicionales, diseño del circuito ético de R6 y casos límites de intervención humana. |
| **Integrante 3** *(Nombre a completar por el grupo)* | Pruebas de funcionamiento en desktop, auditoría de accesibilidad por teclado (`<details>`) y verificación contra la rúbrica oficial. |
| **Integrante 4** *(Nombre a completar por el grupo)* | Preparación de assets (descarga y adaptación del logo oficial `logo_S10.webp`), documentación del README y despliegue del sitio. |

#### 🔄 Evidencia de Revisión entre Integrantes y Mejora Colaborativa (Nivel Propone · Rúbrica 01)
* **Revisión interna efectuada:** Tras una primera versión del sitio construida con tarjetas estáticas, el equipo contrastó el resultado contra la Rúbrica 03 y 04 de la página 8 del PDF.
* **Problema detectado por el grupo:** Se identificó que faltaba incorporar el **logo oficial de Convocado**, que los detalles de cada flujo no estaban en **desplegables interactivos** (obligatorios en la consigna) y que los diagramas carecían de la contemplación de **casos límite con intervención humana** exigidos para la calificación *Propone*.
* **Mejora concreta surgida:** El grupo redactó una directiva correctiva al agente para:
  1. Integrar el logo oficial descargado desde el portal del instituto en el Hero.
  2. Transformar los bloques descriptivos en elementos `<details>` y `<summary>` totalmente accesibles por teclado.
  3. Enriquecer los diagramas Mermaid con temporizadores de expiración (timeout de reserva en R5) y mesa de evaluación humana para solicitudes urgentes (R6).
  4. Añadir un banco interactivo de pruebas con botones para simular casos positivos, negativos y excepciones.

---

### 🏛️ Articulación Académica: IFTS 16 + IFTS 29
* **Origen de la Lógica:** Las startups y sus reglas de funcionamiento bajo lógica proposicional fueron desarrolladas originalmente por estudiantes del **IFTS 16**.
* **Propuesta Front End:** Como equipo de Front End del **IFTS 29**, tomamos esa lógica y diseñamos la arquitectura de información, la experiencia de usuario y los flujos agénticos que comunican las soluciones de manera visual, clara e interactiva.

---

### 📐 Desarme Lógico y Propuestas Agénticas (Rúbricas 03 y 04)

#### Flujo 1 · Basado en FRASE 1 · R5
> *"Si el capitán aceptó al jugador y su lugar sigue reservado, el sistema permite que el jugador confirme su asistencia."*

* **Título de la propuesta:** **"Booking Guard Agent · Custodia Dinámica de Cupos"**
* **Beneficio clave:** Protege la certeza de las alineaciones al condicionar la confirmación a la existencia real de vacante física, evitando la superposición de reservas o falsas expectativas.
* **Datos necesarios:** `id_jugador`, `id_partido`, `estado_solicitud` ('aceptada'), `token_reserva` (activo).
* **Condición:** `(Capitán aceptó = TRUE) AND (Lugar reservado = TRUE)`.
* **Consecuencia:** Habilita el botón *"Confirmar Asistencia"*.
* **Caso límite agregado por el grupo (Nivel Propone):** Si el jugador aceptado no confirma su asistencia hasta 3 horas antes del partido, el agente ejecuta un *timeout* preventivo, libera la reserva y convoca al primer suplente de la lista de espera, notificando al capitán.

#### Flujo 2 · Basado en FRASE 2 · R6
> *"Si un jugador sin valoración autoriza una solicitud, el sistema indica que faltan antecedentes y la deriva a evaluación manual sin asignarle una puntuación inventada."*

* **Título de la propuesta:** **"FairPlay Onboarding · Auditoría Transparente sin Sesgo"**
* **Beneficio clave:** Fomenta una comunidad deportiva confiable al rechazar la imputación de puntajes arbitrarios por IA, canalizando a deportistas novatos hacia una mesa de evaluación humana con criterio justo y empático.
* **Datos necesarios:** `id_jugador`, `autoriza_solicitud` (TRUE), `valoracion_historica` (NULL).
* **Condición:** `(Jugador sin valoración = TRUE) AND (Autoriza solicitud = TRUE)`.
* **Consecuencia:** Mensaje *"Faltan antecedentes"*, bloqueo de scoring ficticio y creación de ticket manual.
* **Intervención humana y caso límite (Nivel Propone):** Si el partido es inminente (menos de 2 horas), el agente no dilata la revisión en cola: escala un ticket con prioridad *"URGENTE"* directamente al WhatsApp o push del capitán para que emita una dispensa manual temporal como *"Jugador a prueba"*.

---

### 🤖 Registro de Herramientas de IA y Modelos Utilizados (Rúbrica 05)

| Dimensión | Detalle Registrado |
| :--- | :--- |
| **Entorno / Aplicación** | Antigravity IDE (Google DeepMind) y Cursor |
| **Modelo de Lenguaje** | **Gemini 3.8 Flash (High)** *(y Claude 3.5 Sonnet en revisiones de estilo)* |
| **Uso Principal** | Estructuración del HTML semántico, generación del diseño CSS con tema oscuro y glassmorphism, codificación de diagramas Mermaid, lógica JS del simulador de casos y redacción técnica del README. |

#### 📝 Evidencia de Iteración Agéntica (Nivel Propone · Rúbrica 05)
1. **Instrucción Inicial:** Se solicitó al agente crear una landing page basada en el PDF del TP3 con las sentencias de Convocado.
2. **Problema Detectado en la Revisión:** El agente generó una página genérica sin el logo asignado, con tarjetas estáticas de texto continuo (sin elementos `<details>`), con diagramas Mermaid lineales de solo 4 nodos que no contemplaban casos límite ni intervención humana, y sin el archivo `README.md` estructurado según la rúbrica.
3. **Pedido de Mejora y Directiva de Ajuste:** Se le ordenó al agente:
   * Extraer e incorporar el logo oficial de Convocado (`assets/img/convocado-logo.webp`).
   * Reestructurar los detalles en desplegables `<details>` y `<summary>` estilados y accesibles por teclado.
   * Expandir los diagramas Mermaid para reflejar las herramientas consultadas, los casos límite (timeout de reserva y urgencia de partido) y la intervención de coordinadores humanos.
   * Desarrollar un simulador de casos interactivo en JavaScript vanilla para cumplir con el paso 7 de la consigna.
   * **Valor Agregado (Propone):** Incorporar un **Mockup Interactivo del Producto Final (Convocado App)** que simula la interfaz real del usuario deportista y del capitán respondiendo a los eventos agénticos.
4. **Resultado Obtenido:** El proyecto pasó de un estado preliminar incompleto a cumplir con todos los requerimientos obligatorios y alcanzar el estándar del nivel **Propone**.

---

### 💻 Cómo reproducir y ejecutar el proyecto localmente

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/marcelo-yrala/tp3-frontend-grupo30.git
   cd tp3-frontend-grupo30
   ```
2. Abrir el archivo principal en cualquier navegador web moderno:
   * Navegar a la carpeta `convocado-tp3/` y hacer doble clic sobre `index.html`.
   * O utilizar una extensión de servidor local como *Live Server* en VS Code:
   ```bash
   npx serve convocado-tp3
   ```
3. El proyecto no requiere instalación de dependencias ni compilación (100% Vanilla HTML, CSS y JS con Mermaid cargado vía CDN).
