class SectorManager {
    constructor() {
        this.sectorInputsContainer = document.getElementById('sectorInputs');
        this.generateInputsButton = document.getElementById('generateInputs');
        this.createWheelButton = document.getElementById('createWheel');
        this.sectorCountInput = document.getElementById('sectorCount');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.generateInputsButton.addEventListener('click', () => this.generateSectorInputs());
    }

    generateSectorInputs() {
        const count = parseInt(this.sectorCountInput.value);
        if (count < 2 || count > 36) {
            alert('Por favor ingresa un número entre 2 y 36');
            return;
        }

        this.sectorInputsContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'sector-input';
            inputGroup.innerHTML = `
                <label for="sector${i}">Sector ${i + 1}:</label>
                <input type="text" id="sector${i}" placeholder="Valor del sector">
            `;
            this.sectorInputsContainer.appendChild(inputGroup);
        }
    }

    getSectorValues() {
        const inputs = this.sectorInputsContainer.getElementsByTagName('input');
        const sectors = [];
        
        for (let input of inputs) {
            const value = input.value.trim();
            if (value) {
                sectors.push({ label: value });
            }
        }
        
        return sectors;
    }

    reset() {
        const container = document.getElementById('sectorInputs');
        container.innerHTML = '';
        this.addSector(); // Agregar un sector inicial
    }
}

export default SectorManager;