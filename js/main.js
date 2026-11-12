/**
 * TP3 · FRONT END 2026 · IFTS 29
 * GRUPO 30 · STARTUP: CONVOCADO
 * Lógica interactiva del simulador de casos, maquetas interactivas,
 * acordeones accesibles, tema visual y navegación móvil.
 */

document.addEventListener('DOMContentLoaded', () => {
    inicializarTema();
    inicializarMenuHamburguesa();
    inicializarAcordeones();

    // 1. Inicialización de Mermaid.js con paleta atlética deportiva (Athletic Velocity & Precision)
    if (window.mermaid) {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'base',
            themeVariables: {
                darkMode: true,
                background: '#0b1326',
                primaryColor: '#171f33',
                primaryTextColor: '#dae2fd',
                primaryBorderColor: '#4be277',
                lineColor: '#89ceff',
                secondaryColor: '#131b2e',
                tertiaryColor: '#222a3d',
                fontFamily: 'Outfit, Manrope, sans-serif',
                fontSize: '13px'
            }
        });
    }

    console.log('✅ TP3 Convocado - Grupo 30 cargado con éxito. Enfoque 100% agéntico.');
});

/**
 * Control del Modo Oscuro / Claro con sincronización de Tailwind y data-theme
 */
function inicializarTema() {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const temaGuardado = localStorage.getItem('convocado-theme');
    const temaInicial = temaGuardado ? temaGuardado : 'dark';

    aplicarTema(temaInicial);

    toggle?.addEventListener('click', (e) => {
        e.preventDefault();
        const esOscuroActual = root.classList.contains('dark') || root.dataset.theme === 'dark';
        const nuevoTema = esOscuroActual ? 'light' : 'dark';
        aplicarTema(nuevoTema);
    });
}

function aplicarTema(tema) {
    const root = document.documentElement;
    const body = document.body;
    const toggle = document.getElementById('theme-toggle');
    const esOscuro = tema === 'dark';

    root.dataset.theme = tema;
    if (esOscuro) {
        root.classList.add('dark');
        root.classList.remove('light');
        if (body) {
            body.classList.add('dark');
            body.classList.remove('light');
        }
    } else {
        root.classList.remove('dark');
        root.classList.add('light');
        if (body) {
            body.classList.remove('dark');
            body.classList.add('light');
        }
    }
    localStorage.setItem('convocado-theme', tema);

    if (toggle) {
        toggle.setAttribute('aria-pressed', String(esOscuro));
        toggle.setAttribute('aria-label', esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        
        const iconSpan = document.getElementById('theme-toggle-icon');
        const textSpan = document.getElementById('theme-toggle-text');
        
        if (iconSpan && textSpan) {
            iconSpan.textContent = esOscuro ? 'light_mode' : 'dark_mode';
            textSpan.textContent = esOscuro ? 'Modo Claro' : 'Modo Oscuro';
        } else {
            toggle.innerHTML = esOscuro
                ? '<span class="material-symbols-outlined text-[18px]" id="theme-toggle-icon" aria-hidden="true">light_mode</span><span id="theme-toggle-text" class="text-xs font-outfit font-semibold hidden sm:inline">Modo Claro</span>'
                : '<span class="material-symbols-outlined text-[18px]" id="theme-toggle-icon" aria-hidden="true">dark_mode</span><span id="theme-toggle-text" class="text-xs font-outfit font-semibold hidden sm:inline">Modo Oscuro</span>';
        }
    }
}

/**
 * Control del Menú Hamburguesa y Navegación Móvil
 */
function inicializarMenuHamburguesa() {
    const toggleBtn = document.getElementById('menu-toggle-btn') || document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav') || document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    if (!toggleBtn || !mobileNav) return;

    function abrirMenu() {
        mobileNav.classList.remove('hidden');
        toggleBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('overflow-hidden');
    }

    function cerrarMenu() {
        mobileNav.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('overflow-hidden');
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const estaAbierto = !mobileNav.classList.contains('hidden');
        if (estaAbierto) {
            cerrarMenu();
        } else {
            abrirMenu();
        }
    });

    // Cerrar al hacer clic en los enlaces de navegación
    const navLinks = document.querySelectorAll('#mobile-nav a, #nav-menu a, .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 840) {
                cerrarMenu();
            }
        });
    });

    // Cerrar al hacer clic en el backdrop
    navBackdrop?.addEventListener('click', cerrarMenu);

    // Cerrar al presionar Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileNav.classList.contains('hidden')) {
            cerrarMenu();
            toggleBtn.focus();
        }
    });
}

/**
 * Control de Acordeones Interactivos y Desplegables
 */
function inicializarAcordeones() {
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const content = item.querySelector('.accordion-content');
        const chevron = item.querySelector('.chevron-icon');
        const title = item.querySelector('.trigger-title');
        if (!trigger || !content) return;

        trigger.addEventListener('click', () => {
            const isOpen = trigger.getAttribute('aria-expanded') === 'true';

            // Alternar estado
            if (isOpen) {
                trigger.setAttribute('aria-expanded', 'false');
                content.classList.add('hidden');
                chevron?.classList.remove('rotate-180', 'text-primary');
                chevron?.classList.add('text-outline-variant');
                title?.classList.remove('text-primary');
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                content.classList.remove('hidden');
                chevron?.classList.add('rotate-180', 'text-primary');
                chevron?.classList.remove('text-outline-variant');
                title?.classList.add('text-primary');
            }
        });
    });
}

/**
 * Simulador de Casos para Flujo 1 (R5 - Confirmación de Asistencia)
 * @param {'exito'|'nocupo'|'timeout'} caso 
 */
function simularFlujo1(caso) {
    const output = document.getElementById('output-f1');
    
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

    actualizarVariablesLogicas(output, caso === 'exito'
        ? [['Capitán aceptó', 'TRUE'], ['Lugar reservado', 'TRUE']]
        : caso === 'nocupo'
            ? [['Capitán aceptó', 'TRUE'], ['Lugar reservado', 'FALSE']]
            : [['Capitán aceptó', 'TRUE'], ['Confirmó a tiempo', 'FALSE']], caso === 'exito');
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

    actualizarVariablesLogicas(output, caso === 'noval'
        ? [['Jugador sin valoración', 'TRUE'], ['Autoriza solicitud', 'TRUE']]
        : caso === 'conval'
            ? [['Jugador sin valoración', 'FALSE'], ['Autoriza solicitud', 'TRUE']]
            : [['Jugador sin valoración', 'TRUE'], ['Partido inminente', 'TRUE']], caso === 'noval');
}

function actualizarVariablesLogicas(output, variables, condicionCumplida) {
    const variablesHtml = variables.map(([label, value]) => `
        <div class="logic-variable">
            <span>${label}:</span>
            <strong>${value}</strong>
        </div>
    `).join('');

    output.insertAdjacentHTML('afterbegin', `
        <div class="logic-inputs">
            <div class="logic-inputs-header">
                <span>Variables del caso evaluado</span>
                <strong>${condicionCumplida ? 'Regla Cumplida' : 'Excepción o Desvío'}</strong>
            </div>
            <div class="logic-variable-list">${variablesHtml}</div>
        </div>
    `);
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
    btn.classList.remove('bg-primary-container', 'hover:bg-primary');
    btn.classList.add('bg-emerald-600', 'text-white');
    btn.style.boxShadow = 'none';

    if (note) {
        note.innerHTML = '<span class="text-primary font-semibold">🎉 Evento registrado con éxito. El capitán y la cancha fueron notificados.</span>';
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
