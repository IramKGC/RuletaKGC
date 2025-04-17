class ParticipantManager {
    constructor(wheel) {
        this.wheel = wheel;
        this.participants = new Map(); // Map para almacenar {label: wins}
        this.container = document.getElementById('participantsList');
    }

    initialize(sectors) {
        this.participants.clear();
        sectors.forEach(sector => {
            this.participants.set(sector.label, 0);
        });
        this.renderList();
    }

    updateWins(label) {
        const wins = (this.participants.get(label) || 0) + 1;
        this.participants.set(label, wins);
        this.renderList();
    }

    removeSector(label) {
        // Encuentra el índice del sector a eliminar
        const sectorIndex = this.wheel.sectors.findIndex(s => s.label === label);
        if (sectorIndex === -1) return;

        // Elimina el sector de la rueda
        this.wheel.sectors.splice(sectorIndex, 1);
        this.wheel.totalSectors = this.wheel.sectors.length;
        this.wheel.arcAngle = (2 * Math.PI) / this.wheel.totalSectors;

        // Elimina el participante del registro
        this.participants.delete(label);

        // Redibuja la rueda
        this.wheel.context.clearRect(0, 0, this.wheel.diameter, this.wheel.diameter);
        this.wheel.sectors.forEach((sector, index) => this.wheel.drawSector(sector, index));

        // Actualiza la lista
        this.renderList();
    }

    renderList() {
        this.container.innerHTML = '';
        this.participants.forEach((wins, label) => {
            const item = document.createElement('div');
            item.className = 'participant-item';
            item.innerHTML = `
                <div class="participant-info">
                    <span class="participant-name">${label}</span>
                    <span class="participant-wins">Victorias: ${wins}</span>
                </div>
                <button class="remove-btn" data-label="${label}">Eliminar</button>
            `;

            item.querySelector('.remove-btn').addEventListener('click', () => {
                if (this.wheel.sectors.length > 2) {
                    this.removeSector(label);
                } else {
                    alert('La ruleta debe tener al menos 2 sectores');
                }
            });

            this.container.appendChild(item);
        });
    }
}

export default ParticipantManager;