// 'use client'

// import { useEffect, useRef } from 'react'

// export default function ParticleBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext('2d')
//     if (!ctx) return

//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight

//     const particles: Particle[] = []
//     const particleCount = 50

//     class Particle {
//       x: number
//       y: number
//       size: number
//       speedX: number
//       speedY: number

//       constructor() {
//         this.x = Math.random() * canvas.width
//         this.y = Math.random() * canvas.height
//         this.size = Math.random() * 5 + 1
//         this.speedX = Math.random() * 3 - 1.5
//         this.speedY = Math.random() * 3 - 1.5
//       }

//       update() {
//         this.x += this.speedX
//         this.y += this.speedY

//         if (this.size > 0.2) this.size -= 0.1

//         if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0 || this.size <= 0.2) {
//           this.x = Math.random() * canvas.width
//           this.y = Math.random() * canvas.height
//           this.size = Math.random() * 5 + 1
//         }
//       }

//       draw() {
//         if (!ctx) return
//         ctx.fillStyle = 'rgba(128, 90, 213, 0.3)'
//         ctx.strokeStyle = 'rgba(128, 90, 213, 0.3)'
//         ctx.lineWidth = 2
//         ctx.beginPath()
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
//         ctx.closePath()
//         ctx.fill()
//         ctx.stroke()
//       }
//     }

//     function init() {
//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle())
//       }
//     }

//     function animate() {
//       if (!ctx) return
//       ctx.clearRect(0, 0, canvas.width, canvas.height)
//       for (let i = 0; i < particles.length; i++) {
//         particles[i].update()
//         particles[i].draw()
//       }
//       requestAnimationFrame(animate)
//     }

//     init()
//     animate()

//     const handleResize = () => {
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight
//       init()
//     }

//     window.addEventListener('resize', handleResize)

//     return () => {
//       window.removeEventListener('resize', handleResize)
//     }
//   }, [])

//   return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
// }

'use client';

// import { useEffect, useRef } from 'react';

// export default function ParticleBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current!;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d')!;
//     if (!ctx) return;

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const particles: Particle[] = [];
//     const particleCount = 15;

//     class Particle {
//       x: number;
//       y: number;
//       size: number;
//       speedX: number;
//       speedY: number;

//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 5 + 1;
//         this.speedX = Math.random() * 5 - 1.5;
//         this.speedY = Math.random() * 5 - 1.5;
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.size > 0.2) this.size -= 0.1;

//         if (
//           this.x > canvas.width ||
//           this.x < 0 ||
//           this.y > canvas.height ||
//           this.y < 0 ||
//           this.size <= 0.2
//         ) {
//           this.x = Math.random() * canvas.width;
//           this.y = Math.random() * canvas.height;
//           this.size = Math.random() * 5 + 1;
//         }
//       }

//       draw() {
//         ctx.fillStyle = 'rgba(128, 90, 213, 0.3)';
//         ctx.strokeStyle = 'rgba(128, 90, 213, 0.3)';
//         ctx.lineWidth = 2;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.closePath();
//         ctx.fill();
//         ctx.stroke();
//       }
//     }

//     function init() {
//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle());
//       }
//     }

//     function animate() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       for (let i = 0; i < particles.length; i++) {
//         particles[i].update();
//         particles[i].draw();
//       }
//       requestAnimationFrame(animate);
//     }

//     init();
//     animate();

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       init();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
// }

// 'use client';

// import { useEffect, useRef } from 'react';

// export default function ParticleBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current!;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d')!;
//     if (!ctx) return;

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const particles: Particle[] = [];
//     const particleCount = 15;

//     class Particle {
//       x: number;
//       y: number;
//       size: number;
//       speedX: number;
//       speedY: number;

//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 30 + 10; // Adjust size for ❅
//         this.speedX = Math.random() * 3 - 1.5;
//         this.speedY = Math.random() * 3 - 1.5;
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (
//           this.x > canvas.width ||
//           this.x < 0 ||
//           this.y > canvas.height ||
//           this.y < 0
//         ) {
//           this.x = Math.random() * canvas.width;
//           this.y = Math.random() * canvas.height;
//           this.size = Math.random() * 30 + 10;
//         }
//       }

//       draw() {
//         ctx.font = `${this.size}px serif`; // Adjust font and size
//         ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.fillText('❅', this.x, this.y); // Draw ❅ instead of a circle
//       }
//     }

//     function init() {
//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle());
//       }
//     }

//     function animate() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       for (let i = 0; i < particles.length; i++) {
//         particles[i].update();
//         particles[i].draw();
//       }
//       requestAnimationFrame(animate);
//     }

//     init();
//     animate();

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       init();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
// }

'use client';

import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 2;  // Reduced the number of particles

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 5;  // Adjusted size to be smaller
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (
          this.x > canvas.width ||
          this.x < 0 ||
          this.y > canvas.height ||
          this.y < 0
        ) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 20 + 5;  // Reset the size to be smaller
        }
      }

      draw() {
        ctx.font = `${this.size}px serif`;  // Adjust font and size
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('❅', this.x, this.y);  // Draw ❅ instead of a circle
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
}

