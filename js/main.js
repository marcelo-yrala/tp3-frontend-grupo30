/**
 * TP3 · FRONT END 2026 · IFTS 29
 * GRUPO 30 · STARTUP: CONVOCADO
 * Lógica interactiva del simulador de casos y soporte de accesibilidad
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización de Mermaid.js con paleta oscura coordinada
    if (window.mermaid) {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'base',
            themeVariables: {
                darkMode: true,
                background: '#0b0d1b',
                primaryColor: '#1e2246',
                primaryTextColor: '#f8fafc',
                primaryBorderColor: '#6366f1',
                lineColor: '#818cf8',
                secondaryColor: '#2e1065',
                tertiaryColor: '#111827',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px'
            }
        });
    }

    console.log('✅ TP3 Convocado - Grupo 30 cargado con éxito. Enfoque 100% agéntico.');
});

/**
 * Simulador de Casos para Flujo 1 (R5 - Confirmación de Asistencia)
 * @param {'exito'|'nocupo'|'timeout'} caso 
 */
function simularFlujo1(caso) {
    const output = document.getElementById('output-f1');
    const btns = document.querySelectorAll('#flujo1 ~ #simulador #btn-f1-exito, #btn-f1-nocupo, #btn-f1-timeout');
    
    // Actualizar botones activos
    document.getElementById('btn-f1-exito')?.classList.toggle('active', caso === 'exito');
    document.getElementById('btn-f1-nocupo')?.classList.toggle('active', caso === 'nocupo');
    document.getElementById('btn-f1-timeout')?.classList.toggle('active', caso === 'timeout');

    if (!output) return;

    if (caso === 'exito') {
        output.innerHTML = `
            <div class="output-status status-success">
                <span class="status-indicator">●</span> Condición Cumplida: Aceptado = TRUE | Reserva = TRUE
            </div>
            <p class="output-description">
                <strong>Acción del agente:</strong> Se comprueba que el capitán autorizó la solicitud y la plaza física sigue bloqueada. Se habilita en la app del jugador el botón <em>"Confirmar Asistencia"</em> y se envía notificación push recordatoria.
            </p>
            <div class="output-trace">
                <span>Trazabilidad: <code>EVENT_ACCEPTED -> CUPOS_OK -> ENABLE_CONFIRMATION_BUTTON -> STATUS_PENDING_CONFIRM</code></span>
            </div>
        `;
    } else if (caso === 'nocupo') {
        output.innerHTML = `
            <div class="output-status status-alert">
                <span class="status-indicator">●</span> Condición Fallida: Aceptado = TRUE | Reserva = FALSE
            </div>
            <p class="output-description">
                <strong>Acción del agente:</strong> Aunque el capitán lo aceptó, la plaza física fue ocupada por otro jugador o cancelada por la administración de la cancha. El sistema <strong>no habilita la confirmación</strong>, informa el motivo y ofrece inscribirse en lista de espera.
            </p>
            <div class="output-trace">
                <span>Trazabilidad: <code>EVENT_ACCEPTED -> CUPOS_EXPIRED -> BLOCK_BUTTON -> NOTIFY_WAITLIST</code></span>
            </div>
        `;
    } else if (caso === 'timeout') {
        output.innerHTML = `
            <div class="output-status status-warning">
                <span class="status-indicator">●</span> Caso Límite C: Expiración por Falta de Confirmación (Timeout)
            </div>
            <p class="output-description">
                <strong>Acción del agente:</strong> Restan menos de 3 horas para el pitazo inicial y el jugador aceptado no confirmó. El agente libera la plaza reservada para no dejar al equipo incompleto y promueve al primer suplente de la lista de espera.
            </p>
            <div class="output-trace">
                <span>Trazabilidad: <code>TIMER_LIMIT_REACHED -> RELEASE_SLOT -> NOTIFY_CAPTAIN -> PROMOTE_RESERVE</code></span>
            </div>
        `;
    }
}

/**
 * Simulador de Casos para Flujo 2 (R6 - Falta de Valoración y Evaluación Manual)
 * @param {'noval'|'conval'|'urgente'} caso 
 */
function simularFlujo2(caso) {
    const output = document.getElementById('output-f2');
    
    // Actualizar botones activos
    document.getElementById('btn-f2-noval')?.classList.toggle('active', caso === 'noval');
    document.getElementById('btn-f2-conval')?.classList.toggle('active', caso === 'conval');
    document.getElementById('btn-f2-urgente')?.classList.toggle('active', caso === 'urgente');

    if (!output) return;

    if (caso === 'noval') {
        output.innerHTML = `
            <div class="output-status status-warning">
                <span class="status-indicator">●</span> Condición R6 Detectada: Sin Valoración = TRUE | Autoriza = TRUE
            </div>
            <p class="output-description">
                <strong>Acción del agente:</strong> Se notifica al deportista que faltan antecedentes en la plataforma. <strong>Se bloquea cualquier generación de puntaje artificial (Rating = NULL)</strong>. Se emite el Ticket #AUD-4092 derivado a la mesa de evaluación manual humana.
            </p>
            <div class="output-trace">
                <span>Trazabilidad: <code>AUTH_REQUEST -> SCORE_NULL -> WARN_MISSING_DATA -> DISPATCH_MANUAL_REVIEW</code></span>
            </div>
        `;
    } else if (caso === 'conval') {
        output.innerHTML = `
            <div class="output-status status-success">
                <span class="status-indicator">●</span> Flujo Estándar: Jugador con Valoración Previa (4.8 ★ / 18 partidos)
            </div>
            <p class="output-description">
                <strong>Acción del agente:</strong> Al contar con historial fidedigno comprobado, la solicitud no requiere derivación por falta de datos y continúa el circuito habitual de compatibilidad deportiva con el equipo convocante.
            </p>
            <div class="output-trace">
                <span>Trazabilidad: <code>AUTH_REQUEST -> SCORE_EXISTS -> VALIDATE_RULES -> AUTO_ACCEPT_ELIGIBLE</code></span>
            </div>
        `;
    } else if (caso === 'urgente') {
        output.innerHTML = `
            <div class="output-status status-alert">
                <span class="status-indicator">●</span> Caso Límite C: Solicitud Express en Partido Inminente (< 2 hs)
            </div>
            <p class="output-description">
                <strong>Acción del agente:</strong> El partido está por comenzar. Para no demorar la evaluación, el agente envía una alerta push con botón de decisión directa al capitán: <em>"Jugador sin valoración disponible. ¿Autorizas su ingreso directo a prueba?"</em>.
            </p>
            <div class="output-trace">
                <span>Trazabilidad: <code>URGENCY_TRIGGER -> FAST_TRACK_TICKET -> CAPTAIN_DIRECT_OVERRIDE -> TEMPORARY_PERMIT</code></span>
            </div>
        `;
    }
}

/**
 * Control del Mockup Interactivo de la App Convocado (Sección 05)
 * @param {'r5'|'r6'|'capitan'} vista 
 */
function mostrarMockup(vista) {
    // Alternar pestañas activas
    document.getElementById('tab-mock-r5')?.classList.toggle('active', vista === 'r5');
    document.getElementById('tab-mock-r6')?.classList.toggle('active', vista === 'r6');
    document.getElementById('tab-mock-capitan')?.classList.toggle('active', vista === 'capitan');

    // Alternar pantallas del mockup
    document.getElementById('view-mock-r5')?.classList.toggle('active', vista === 'r5');
    document.getElementById('view-mock-r6')?.classList.toggle('active', vista === 'r6');
    document.getElementById('view-mock-capitan')?.classList.toggle('active', vista === 'capitan');
}

/**
 * Simulación de confirmación de asistencia en el Mockup
 */
function accionConfirmarMockup() {
    const btn = document.getElementById('btn-mock-confirmar');
    const note = document.getElementById('mock-r5-note');
    if (!btn) return;

    btn.disabled = true;
    btn.innerHTML = '✅ ¡Asistencia Confirmada! Vacante 9/10 asegurada';
    btn.style.background = '#059669';
    btn.style.boxShadow = 'none';

    if (note) {
        note.innerHTML = '<span style="color: #6ee7b7; font-weight: 600;">🎉 Evento registrado con éxito. El capitán y la cancha fueron notificados.</span>';
    }
}

/**
 * Acción del Capitán en el panel de evaluación manual
 */
function accionCapitanAprobar() {
    const actionsBox = document.getElementById('captain-actions-box');
    const msg = document.getElementById('captain-response-msg');
    if (!msg) return;

    if (actionsBox) actionsBox.style.display = 'none';
    msg.style.display = 'block';
    msg.innerHTML = '✅ <strong>Dictamen registrado:</strong> Has autorizado a Nicolás Gómez como <em>Invitado a prueba</em> sin generar puntuación artificial. Se le envió notificación push para sumarse al encuentro.';
}

/**
 * Acción del Capitán solicitando referencias
 */
function accionCapitanRechazar() {
    const actionsBox = document.getElementById('captain-actions-box');
    const msg = document.getElementById('captain-response-msg');
    if (!msg) return;

    if (actionsBox) actionsBox.style.display = 'none';
    msg.style.display = 'block';
    msg.style.borderColor = '#f59e0b';
    msg.style.color = '#fde68a';
    msg.innerHTML = '📩 <strong>Solicitud en espera:</strong> Se envió un formulario breve a Nicolás Gómez solicitando referencias deportivas previas antes de confirmar.';
}

