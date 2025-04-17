import SectorManager from './sectorManager.js';
import SpinWheel from './wheel.js';
import ParticipantManager from './participantManager.js';
import ConfettiEffect from './confetti.js';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('configModal');
    const openBtn = document.getElementById('openConfig');
    const closeBtn = document.querySelector('.close');
    const newWheelBtn = document.getElementById('newWheel');
    const sectorManager = new SectorManager();
    let currentWheel = null;
    let participantManager = null;

    // Mostrar modal automáticamente al cargar la página
    modal.style.display = "block";

    // Modal controls
    closeBtn.onclick = () => {
        if (currentWheel) {
            modal.style.display = "none";
        } else {
            alert('Por favor configura la ruleta primero');
        }
    }

    window.onclick = (event) => {
        if (event.target === modal && currentWheel) {
            modal.style.display = "none";
        }
    }

    document.getElementById('createWheel').addEventListener('click', () => {
        const sectors = sectorManager.getSectorValues();
        
        if (sectors.length < 2) {
            alert('Por favor ingresa al menos 2 sectores');
            return;
        }

        // Limpiar el canvas anterior si existe
        const canvas = document.getElementById('wheel');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Crear nueva rueda
        currentWheel = new SpinWheel({
            canvasSelector: '#wheel',
            buttonSelector: '#spin',
            sectors: sectors
        });

        // Inicializar el administrador de participantes
        participantManager = new ParticipantManager(currentWheel);
        participantManager.initialize(sectors);

        // Configurar el evento finishSpinning una sola vez
        currentWheel.events.on('finishSpinning', sector => {
            const winnerModal = document.getElementById('winnerModal');
            const winnerNumber = document.getElementById('winnerNumber');
            const confettiContainer = document.querySelector('.confetti-container');
            
            // Actualizar el número ganador
            winnerNumber.textContent = sector.label;
            
            // Mostrar el modal
            winnerModal.style.display = 'block';
            
            // Crear efecto de confeti
            const confetti = new ConfettiEffect(confettiContainer);
            confetti.createConfetti();
            
            // Actualizar el registro de victorias
            participantManager.updateWins(sector.label);
            
            // Cerrar el modal después de 3 segundos
            setTimeout(() => {
                winnerModal.style.display = 'none';
            }, 3000);
        });

        // Cerrar el modal de configuración y ocultar el botón
        modal.style.display = "none";
        openBtn.style.display = "none";
    });

    // Agregar manejador para el botón de nueva ruleta
    newWheelBtn.addEventListener('click', () => {
        // Limpiar el canvas
        const canvas = document.getElementById('wheel');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Mostrar el modal de configuración
        modal.style.display = "block";
        
        // Reiniciar el administrador de sectores
        sectorManager.reset();
        
        // Limpiar la lista de participantes
        if (participantManager) {
            participantManager.initialize([]);
        }
        
        currentWheel = null;
    });
});