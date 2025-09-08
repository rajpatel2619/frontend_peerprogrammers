import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particlesArray;

    // --- Configuration ---
    const config = {
      particleCount: 100,
      particleRadius: 5,
      connectionDistance: 120,
      mouseConnectionDistance: 150,
      baseSpeed: 0.8,
    };
    
    let colors = {
        particleColor: 'rgba(0, 0, 0, 0.15)',
        lineColor: 'rgba(0, 0, 0, 0.05)',
        mouseParticleColor: 'rgba(0, 123, 255, 1)',
    };
    
    const setDarkModeColors = () => {
        if (document.documentElement.classList.contains('dark')) {
            colors.particleColor = 'rgba(255, 255, 255, 0.5)';
            colors.lineColor = 'rgba(255, 255, 255, 0.5)';
            colors.mouseParticleColor = 'rgba(52, 211, 153, 1)'; // Teal for dark mode
        } else {
            colors.particleColor = 'rgba(0, 0, 0, 0.5)';
            colors.lineColor = 'rgba(0, 0, 0, 0.5)';
            colors.mouseParticleColor = 'rgba(0, 123, 255, 1)';
        }
    };


    const mouse = {
      x: null,
      y: null,
      radius: config.mouseConnectionDistance,
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Mouse collision detection
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            // Push particle away from mouse
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 2;
            }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      setDarkModeColors(); // Set initial colors

      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      numberOfParticles = Math.min(numberOfParticles, config.particleCount);

      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 1.5 + 1;
        let x = Math.random() * (window.innerWidth - size * 2) + size * 2;
        let y = Math.random() * (window.innerHeight - size * 2) + size * 2;
        let directionX = (Math.random() - 0.5) * config.baseSpeed;
        let directionY = (Math.random() - 0.5) * config.baseSpeed;
        
        particlesArray.push(
          new Particle(x, y, directionX, directionY, size, colors.particleColor)
        );
      }
    }

    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance =
            ((particlesArray[a].x - particlesArray[b].x) *
              (particlesArray[a].x - particlesArray[b].x)) +
            ((particlesArray[a].y - particlesArray[b].y) *
              (particlesArray[a].y - particlesArray[b].y));

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            const rawOpacity = 1 - distance / 20000;
            // Multiplying by a small number to keep the final opacity low
            const finalOpacity = Math.max(0, rawOpacity * 0.2); 
            ctx.strokeStyle = colors.lineColor.replace(/, [0-9.]+\)/, `, ${finalOpacity})`);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      init();
      animate();
    };
    window.addEventListener("resize", handleResize);

    // Observer for dark mode changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "class") {
                handleResize(); // Re-initialize to apply new colors
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true
    });


    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-black dark:via-slate-950 dark:to-black overflow-hidden h-screen flex items-center justify-center">
      {/* Animated Neural Network Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center z-10">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-5xl lg:text-8xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Master{" "}
            <span className="">
              Programming
            </span>
            <br />
            Through <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Peer</span> Learning
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl">
            Join our collaborative learning platform where aspiring developers learn together, share
            knowledge, and build amazing projects. Start your coding journey today with expert-led
            courses and peer supports.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/training")}
              className="relative overflow-hidden bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-xl font-semibold flex items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <span className="relative z-10 flex items-center">
                Start Learning Today
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


