// ========================================
// ÉDIT MARKET PRO - PARTICLES.JS
// Effet de particules animé
// Violet / Noir / Glassmorphism
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.createElement('canvas');

    canvas.id = 'particles-canvas';

    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');

    let particles = [];

    const particleCount = 60;

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    class Particle {

        constructor() {

            this.reset();

        }

        reset() {

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.radius = Math.random() * 3 + 1;

            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;

            this.opacity = Math.random() * 0.6 + 0.2;

        }

        update() {

            this.x += this.speedX;
            this.y += this.speedY;

            if (
                this.x < -50 ||
                this.x > canvas.width + 50 ||
                this.y < -50 ||
                this.y > canvas.height + 50
            ) {
                this.reset();
            }

        }

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(139, 92, 246, ${this.opacity})`;

            ctx.fill();

        }

    }

    function createParticles() {

        particles = [];

        for (let i = 0; i < particleCount; i++) {

            particles.push(new Particle());

        }

    }

    function drawConnections() {

        for (let a = 0; a < particles.length; a++) {

            for (let b = a + 1; b < particles.length; b++) {

                const dx =
                    particles[a].x - particles[b].x;

                const dy =
                    particles[a].y - particles[b].y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {

                    ctx.beginPath();

                    ctx.moveTo(
                        particles[a].x,
                        particles[a].y
                    );

                    ctx.lineTo(
                        particles[b].x,
                        particles[b].y
                    );

                    ctx.strokeStyle =
                        `rgba(139, 92, 246, ${
                            0.15 * (1 - distance / 120)
                        })`;

                    ctx.lineWidth = 1;

                    ctx.stroke();

                }

            }

        }

    }

    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach(particle => {

            particle.update();
            particle.draw();

        });

        drawConnections();

        requestAnimationFrame(animate);

    }

    createParticles();
    animate();

});
