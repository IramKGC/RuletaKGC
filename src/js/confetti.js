class ConfettiEffect {
    constructor(container) {
        this.container = container;
        this.confettiColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    }

    createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
            confetti.style.opacity = '1';
            confetti.style.animation = 'confetti-fall ' + (Math.random() * 2 + 1) + 's ease-out forwards';
            this.container.appendChild(confetti);

            // Eliminar el confeti después de la animación
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
}

export default ConfettiEffect;