import EventEmitter from './eventEmitter.js';

class SpinWheel {
    constructor({ canvasSelector, buttonSelector, sectors, friction = 0.991 }) {
        this.sectors = sectors;
        this.friction = friction;
        this.canvas = document.querySelector(canvasSelector);
        this.context = this.canvas.getContext('2d');
        this.button = document.querySelector(buttonSelector);
        this.diameter = this.canvas.width;
        this.radius = this.diameter / 2;
        this.totalSectors = sectors.length;
        this.arcAngle = (2 * Math.PI) / this.totalSectors;
        this.angle = 0;
        this.angularVelocity = 0;
        this.spinButtonClicked = false;
        this.events = new EventEmitter();
        this.init();
    }

    get currentIndex() {
        return Math.floor(this.totalSectors - (this.angle / (2 * Math.PI)) * this.totalSectors) % this.totalSectors;
    }

    drawSector(sector, index) {
        const startAngle = this.arcAngle * index;
        this.context.save();
    
        // Dibujar el sector negro
        this.context.beginPath();
        this.context.fillStyle = '#000000';
        this.context.moveTo(this.radius, this.radius);
        this.context.arc(
            this.radius,
            this.radius,
            this.radius - 2.5, // Reducimos ligeramente el radio para el borde
            startAngle,
            startAngle + this.arcAngle
        );
        this.context.lineTo(this.radius, this.radius);
        this.context.fill();
    
        // Dibujar la línea divisoria amarilla
        this.context.beginPath();
        this.context.strokeStyle = '#ffff00';
        this.context.lineWidth = 2;
        this.context.moveTo(this.radius, this.radius);
        this.context.lineTo(
            this.radius + Math.cos(startAngle) * (this.radius - 2.5),
            this.radius + Math.sin(startAngle) * (this.radius - 2.5)
        );
        this.context.stroke();
    
        // Dibujar el texto
        this.context.translate(this.radius, this.radius);
        this.context.rotate(startAngle + this.arcAngle / 2);
        this.context.textAlign = 'right';
        this.context.fillStyle = '#ffffff';
        this.context.font = "bold 20px 'Arial'";
        this.context.fillText(sector.label, this.radius - 30, 10);
        this.context.restore();
    }
    rotateCanvas() {
        this.canvas.style.transform = `rotate(${this.angle - Math.PI / 2}rad)`;
    }

    updateFrame() {
        if (!this.angularVelocity && this.spinButtonClicked) {
            const winningSector = this.sectors[this.currentIndex];
            this.events.emit('finishSpinning', winningSector);
            this.spinButtonClicked = false;
            return;
        }

        this.angularVelocity *= this.friction;
        if (this.angularVelocity < 0.002) this.angularVelocity = 0;

        this.angle += this.angularVelocity;
        this.angle %= 2 * Math.PI;

        this.rotateCanvas();
    }

    startSimulation() {
        const animate = () => {
            this.updateFrame();
            requestAnimationFrame(animate);
        };
        animate();
    }

    init() {
        this.sectors.forEach((sector, index) => this.drawSector(sector, index));
        this.rotateCanvas();
        this.startSimulation();

        if (this.button) {
            this.button.addEventListener('click', () => {
                if (!this.angularVelocity) {
                    this.angularVelocity = SpinWheel.randomInRange(0.25, 0.45);
                }
                this.spinButtonClicked = true;
            });
        }
    }

    static randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
}

export default SpinWheel;