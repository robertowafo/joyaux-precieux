import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Sparkles, Heart, Star, CloudRain, Sun, Compass, RefreshCw } from 'lucide-react';

export function GsapDecorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<SVGSVGElement>(null);
  const cloud1Ref = useRef<HTMLDivElement>(null);
  const cloud2Ref = useRef<HTMLDivElement>(null);
  const balloonRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  
  // Custom cute rotating/floating page elements
  const moonRef = useRef<HTMLDivElement>(null);
  const bunnyRef = useRef<HTMLDivElement>(null);
  const kittenRef = useRef<HTMLDivElement>(null);
  const pandaRef = useRef<HTMLDivElement>(null);
  const butterflyRef = useRef<HTMLDivElement>(null);
  
  // Clickable toys states
  const [activeToy, setActiveToy] = useState<string | null>(null);
  const [toyPoints, setToyPoints] = useState(0);

  useEffect(() => {
    // ----------------------------------------------------
    // 1. CONSTANT FLOATING ANIMATIONS (GSAP)
    // ----------------------------------------------------
    
    // Sun subtle rotation and breathing scale
    if (sunRef.current) {
      gsap.to(sunRef.current, {
        rotate: 360,
        duration: 25,
        repeat: -1,
        ease: 'none',
      });
      // Breathe scale
      gsap.to(sunRef.current, {
        scale: 1.08,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    }

    // Clouds drifting and swinging
    if (cloud1Ref.current) {
      gsap.to(cloud1Ref.current, {
        x: '+=35',
        y: '+=15',
        rotate: 3,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }
    if (cloud2Ref.current) {
      gsap.to(cloud2Ref.current, {
        x: '-=25',
        y: '-=10',
        rotate: -3,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }

    // Balloon gentle rising and bobbing
    if (balloonRef.current) {
      gsap.to(balloonRef.current, {
        y: '-=40',
        x: '+=15',
        rotate: 6,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }

    // Moon subtle sway and shine
    if (moonRef.current) {
      gsap.to(moonRef.current, {
        rotate: 15,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
      gsap.to(moonRef.current, {
        scale: 1.15,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut'
      });
    }

    // Bunny cute bouncing
    if (bunnyRef.current) {
      gsap.to(bunnyRef.current, {
        y: '-=25',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'bounce.out'
      });
      gsap.to(bunnyRef.current, {
        rotate: 8,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }

    // Kitten playful tilting
    if (kittenRef.current) {
      gsap.to(kittenRef.current, {
        rotate: -12,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
      gsap.to(kittenRef.current, {
        y: '+=10',
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut'
      });
    }

    // Panda gentle rocking
    if (pandaRef.current) {
      gsap.to(pandaRef.current, {
        rotate: 15,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
      gsap.to(pandaRef.current, {
        x: '-=15',
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }

    // Butterfly continuous flying wave
    if (butterflyRef.current) {
      gsap.to(butterflyRef.current, {
        x: '+=30',
        y: '-=20',
        rotate: 18,
        duration: 2.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }

    // Paper plane occasional swooping across the viewport
    const triggerPaperPlaneSwoop = () => {
      if (!planeRef.current) return;
      
      const tl = gsap.timeline({
        onComplete: () => {
          // Trigger again after random delay
          gsap.delayedCall(gsap.utils.random(10, 20), triggerPaperPlaneSwoop);
        }
      });

      // Start position left, randomized Y
      const startY = gsap.utils.random(150, 450);
      const endY = gsap.utils.random(100, 300);

      tl.set(planeRef.current, {
        x: -150,
        y: startY,
        scale: 0.1,
        opacity: 0,
        rotate: 15
      })
      .to(planeRef.current, {
        opacity: 0.75,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out'
      }, 0)
      .to(planeRef.current, {
        x: window.innerWidth + 150,
        y: endY,
        rotate: -15,
        duration: 8,
        ease: 'power1.inOut'
      }, 0)
      .to(planeRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 2,
        ease: 'power2.in'
      }, '>-2');
    };

    // Fast-start the paper plane
    gsap.delayedCall(4, triggerPaperPlaneSwoop);

    // ----------------------------------------------------
    // 2. MAGIC SPARKLE TRAIL CONTROLLER
    // ----------------------------------------------------
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Only spawn elements with a 20% limit to avoid performance drops
      if (Math.random() > 0.25) return;

      const sparkle = document.createElement('div');
      sparkle.className = 'absolute pointer-events-none text-xl select-none z-55';
      
      const symbols = ['⭐', '💖', '🎈', '✨', '🌻', '🐶', '🦄', '🐳', '🌈', '🍭'];
      sparkle.innerText = gsap.utils.random(symbols);
      
      // Initial style positioning
      // Offset by scroll position
      const scrollY = window.scrollY || window.pageYOffset;
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY + scrollY}px`;
      
      containerRef.current.appendChild(sparkle);

      // Randomize velocity & size
      const randomX = gsap.utils.random(-80, 80);
      const randomY = gsap.utils.random(-120, -40);
      const randomScale = gsap.utils.random(0.5, 1.5);
      const randomDuration = gsap.utils.random(1.2, 2.5);
      const randomRotation = gsap.utils.random(-180, 180);

      gsap.fromTo(sparkle, 
        {
          scale: 0,
          opacity: 1,
          rotate: 0,
        },
        {
          x: `+=${randomX}`,
          y: `+=${randomY}`,
          scale: randomScale,
          rotate: randomRotation,
          opacity: 0,
          duration: randomDuration,
          ease: 'power2.out',
          onComplete: () => {
            sparkle.remove();
          }
        }
      );
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ----------------------------------------------------
    // 3. SPRINGY HOVER EFFECTS ON HEADING / BUTTONS
    // ----------------------------------------------------
    // We bind elastic scales using event delegation to elements with specific data attributes or general CTAs
    const applyElasticHovers = () => {
      const itemsToBind = document.querySelectorAll('button, a, h1 span, h2 span, .toy-interactive');
      itemsToBind.forEach((element) => {
        // Skip elements that are already bound
        if (element.classList.contains('gsap-bound')) return;
        element.classList.add('gsap-bound');

        element.addEventListener('mouseenter', () => {
          gsap.to(element, {
            scale: 1.08,
            duration: 0.6,
            ease: 'elastic.out(1.2, 0.4)',
            overwrite: 'auto'
          });
        });

        element.addEventListener('mouseleave', () => {
          gsap.to(element, {
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        });
      });
    };

    // Periodically run binds in case routes/states change
    applyElasticHovers();
    const intervalId = setInterval(applyElasticHovers, 1500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(intervalId);
    };
  }, []);

  // Click on toy custom GSAP effect
  const handleToyClick = (toyId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveToy(toyId);
    setToyPoints(prev => prev + 10);

    const btn = event.currentTarget;
    
    // Elastic spin and hop
    gsap.timeline()
      .to(btn, {
        scale: 1.4,
        y: -30,
        rotate: 360,
        duration: 0.6,
        ease: 'back.out(1.5)'
      })
      .to(btn, {
        scale: 1,
        y: 0,
        rotate: 0,
        duration: 0.4,
        ease: 'bounce.out'
      });

    // Create custom burst around the button
    const rect = btn.getBoundingClientRect();
    const scrollY = window.scrollY;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2 + scrollY;

    const emojis = toyId === 'teddy' ? ['🐼', '🦁', '🐻', '💛', '👋'] : 
                   toyId === 'ufo' ? ['🚀', '🛰️', '👽', '🪐', '💫'] : 
                   ['🦄', '🎨', '🎠', '🍭', '🌈'];

    for (let i = 0; i < 12; i++) {
      const burstParticle = document.createElement('div');
      burstParticle.className = 'absolute pointer-events-none text-2xl z-55 select-none';
      burstParticle.innerText = emojis[i % emojis.length];
      burstParticle.style.left = `${centerX}px`;
      burstParticle.style.top = `${centerY}px`;
      
      containerRef.current?.appendChild(burstParticle);

      const angle = (i * 360) / 12 + gsap.utils.random(-15, 15);
      const distance = gsap.utils.random(80, 180);
      const rad = (angle * Math.PI) / 180;
      
      const destX = Math.cos(rad) * distance;
      const destY = Math.sin(rad) * distance - gsap.utils.random(20, 60);

      gsap.fromTo(burstParticle,
        { scale: 0, opacity: 1, rotate: 0 },
        {
          x: destX,
          y: destY,
          scale: gsap.utils.random(1.2, 2),
          rotate: gsap.utils.random(-360, 360),
          opacity: 0,
          duration: gsap.utils.random(1.5, 2.5),
          ease: 'power3.out',
          onComplete: () => burstParticle.remove()
        }
      );
    }

    setTimeout(() => setActiveToy(null), 1000);
  };

  return (
    <div ref={containerRef} className="absolute inset-x-0 top-0 bottom-0 pointer-events-none overflow-hidden select-none z-10">
      
      {/* ----------------------------------------------------
          AESTHETIC FLOATING CHILD-SHAPES IN THE BACKGROUND
          ---------------------------------------------------- */}
      
      {/* 1. Large Smiling Sun in the top-right */}
      <svg
        ref={sunRef}
        viewBox="0 0 100 100"
        className="absolute top-[8%] right-[4%] w-24 h-24 sm:w-32 sm:h-32 opacity-25 pointer-events-auto cursor-pointer"
        onClick={() => {
          if (!sunRef.current) return;
          gsap.timeline()
            .to(sunRef.current, { rotate: '+=185', duration: 0.8, ease: 'back.out' })
            .to(sunRef.current, { scale: 1.3, duration: 0.3, yoyo: true, repeat: 1 });
        }}
        id="smiling-sun-svg"
      >
        <circle cx="50" cy="50" r="28" fill="#ff9d00" />
        {/* Rays */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2="50"
              y2="12"
              transform={`rotate(${angle} 50 50)`}
              stroke="#ff9d00"
              strokeWidth="5"
              strokeLinecap="round"
            />
          );
        })}
        {/* Smile and Eyes */}
        <circle cx="50" cy="50" r="26" fill="#ffb433" />
        <circle cx="41" cy="45" r="3.5" fill="#172d24" />
        <circle cx="59" cy="45" r="3.5" fill="#172d24" />
        {/* Blush */}
        <circle cx="36" cy="52" r="3" fill="#e05a47" opacity="0.6" />
        <circle cx="64" cy="52" r="3" fill="#e05a47" opacity="0.6" />
        {/* Smiling mouth */}
        <path
          d="M 40,55 A 10,10 0 0,0 60,55"
          fill="none"
          stroke="#172d24"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* 2. Cute cloud 1 in the top-left */}
      <div 
        ref={cloud1Ref}
        className="absolute top-[16%] left-[5%] opacity-35 pointer-events-auto cursor-pointer flex flex-col items-center select-none"
        onClick={() => {
          if (!cloud1Ref.current) return;
          gsap.to(cloud1Ref.current, { scale: 1.25, duration: 0.3, yoyo: true, repeat: 1 });
        }}
      >
        <div className="relative w-28 h-10 bg-white rounded-full shadow-xs">
          <div className="absolute -top-6 left-4 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute -top-8 left-12 w-14 h-14 bg-white rounded-full"></div>
          {/* Smiling face on the cloud */}
          <div className="absolute top-2 left-9 flex gap-4">
            <span className="text-[5px] font-bold text-lead-green/60">◡</span>
            <span className="text-[5px] font-bold text-lead-green/60">◡</span>
          </div>
          <div className="absolute top-4 left-[46px] w-2.5 h-1.5 border-b border-lead-green/60 rounded-full"></div>
        </div>
      </div>

      {/* 3. Cute cloud 2 near the public targets section */}
      <div 
        ref={cloud2Ref}
        className="absolute top-[52%] right-[6%] opacity-25 pointer-events-auto cursor-pointer flex flex-col items-center select-none"
        onClick={() => {
          if (!cloud2Ref.current) return;
          gsap.to(cloud2Ref.current, { y: '-=20', duration: 0.5, yoyo: true, repeat: 1, ease: 'power2.out' });
        }}
      >
        <div className="relative w-32 h-12 bg-white rounded-full shadow-xs">
          <div className="absolute -top-7 left-5 w-14 h-14 bg-white rounded-full"></div>
          <div className="absolute -top-9 left-14 w-16 h-16 bg-white rounded-full"></div>
          {/* Eyes & Smile */}
          <div className="absolute top-3 left-12 flex gap-4">
            <span className="text-[6px] text-lead-green/50">●</span>
            <span className="text-[6px] text-lead-green/50">●</span>
          </div>
          <div className="absolute top-5 left-[54px] w-3 h-2 border-b-2 border-lead-green/50 rounded-full"></div>
        </div>
      </div>

      {/* 4. Cute Levitating Heart Balloon */}
      <div 
        ref={balloonRef}
        className="absolute top-[34%] left-[2%] opacity-35 pointer-events-auto cursor-pointer select-none"
        onClick={(e) => {
          if (!balloonRef.current) return;
          gsap.timeline()
            .to(balloonRef.current, { rotate: '+=360', duration: 1, ease: 'power3.out' })
            .to(balloonRef.current, { y: '-=30', scale: 1.15, duration: 0.4, yoyo: true, repeat: 1 });
        }}
      >
        <div className="flex flex-col items-center">
          <div className="text-5xl text-coral drop-shadow-md animate-pulse">🎈</div>
          <div className="w-0.5 h-12 bg-lead-green/30 -mt-1 rounded-full"></div>
        </div>
      </div>

      {/* 4a. Cute Crescent Moon */}
      <div 
        ref={moonRef}
        className="absolute top-[26%] right-[8%] opacity-35 pointer-events-auto cursor-pointer select-none"
        onClick={() => {
          if (!moonRef.current) return;
          gsap.timeline()
            .to(moonRef.current, { rotate: '+=360', duration: 1.2, ease: 'back.out' })
            .to(moonRef.current, { scale: 1.4, duration: 0.3, yoyo: true, repeat: 1 });
          
          // Mini-burst of stars!
          if (containerRef.current) {
            const rect = moonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2 + window.scrollY;
            for (let i = 0; i < 6; i++) {
              const star = document.createElement('div');
              star.className = 'absolute pointer-events-none text-xl z-55';
              star.innerText = '✨';
              star.style.left = `${centerX}px`;
              star.style.top = `${centerY}px`;
              containerRef.current.appendChild(star);
              gsap.fromTo(star, { scale: 0, opacity: 1 }, {
                x: gsap.utils.random(-60, 60),
                y: gsap.utils.random(-60, 60),
                scale: gsap.utils.random(1, 1.8),
                opacity: 0,
                duration: 1.2,
                onComplete: () => star.remove()
              });
            }
          }
        }}
      >
        <div className="text-5xl filter drop-shadow-[0_4px_6px_rgba(255,223,120,0.4)] hover:scale-110 transition-transform">
          🌙
        </div>
      </div>

      {/* 4b. Cute Flying Butterfly */}
      <div 
        ref={butterflyRef}
        className="absolute top-[44%] left-[6%] opacity-35 pointer-events-auto cursor-pointer select-none"
        onClick={() => {
          if (!butterflyRef.current) return;
          gsap.timeline()
            .to(butterflyRef.current, { scaleX: -1, duration: 0.2, repeat: 3, yoyo: true })
            .to(butterflyRef.current, { y: '-=40', duration: 0.4, yoyo: true, repeat: 1 });
        }}
      >
        <div className="text-4xl filter drop-shadow-md hover:scale-115 transition-transform">
          🦋
        </div>
      </div>

      {/* 4c. Cute Jumping Bunny */}
      <div 
        ref={bunnyRef}
        className="absolute top-[62%] left-[4%] opacity-35 pointer-events-auto cursor-pointer select-none"
        onClick={() => {
          if (!bunnyRef.current) return;
          gsap.timeline()
            .to(bunnyRef.current, { y: '-=60', rotate: 360, duration: 0.7, ease: 'power2.out' })
            .to(bunnyRef.current, { y: 0, rotate: 0, duration: 0.5, ease: 'bounce.out' });
        }}
      >
        <div className="text-4xl sm:text-5xl filter drop-shadow-md hover:scale-115 transition-transform">
          🐰
        </div>
      </div>

      {/* 4d. Playful Rolling Panda */}
      <div 
        ref={pandaRef}
        className="absolute top-[74%] right-[5%] opacity-30 pointer-events-auto cursor-pointer select-none"
        onClick={() => {
          if (!pandaRef.current) return;
          gsap.timeline()
            .to(pandaRef.current, { rotate: '+=360', scale: 1.3, duration: 0.8, ease: 'back.out' })
            .to(pandaRef.current, { scale: 1, duration: 0.3 });
        }}
      >
        <div className="text-4xl sm:text-5xl filter drop-shadow-md hover:scale-115 transition-transform">
          🐼
        </div>
      </div>

      {/* 4e. Curious Playful Kitten */}
      <div 
        ref={kittenRef}
        className="absolute top-[86%] left-[5%] opacity-35 pointer-events-auto cursor-pointer select-none"
        onClick={() => {
          if (!kittenRef.current) return;
          gsap.timeline()
            .to(kittenRef.current, { y: '-=30', scaleY: 0.8, duration: 0.2 })
            .to(kittenRef.current, { y: 0, scaleY: 1.2, duration: 0.3, ease: 'back.out' })
            .to(kittenRef.current, { scaleY: 1, duration: 0.2 });
        }}
      >
        <div className="text-4xl sm:text-5xl filter drop-shadow-md hover:scale-115 transition-transform">
          🐱
        </div>
      </div>

      {/* 5. Paper plane that swoops on intervals */}
      <div 
        ref={planeRef} 
        className="absolute pointer-events-none opacity-0 select-none text-4xl"
        style={{ transformOrigin: 'center' }}
      >
        ✈️
      </div>

      {/* ----------------------------------------------------
          INTERACTIVE SIDE BAR FOR FLOATING TOYS & FUN SCORE
          ---------------------------------------------------- */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-auto flex flex-col gap-3">
        {toyPoints > 0 && (
          <div className="bg-white/95 border-2 border-highlight px-3.5 py-1.5 rounded-full shadow-md text-lead-green font-friendly font-bold text-xs flex items-center gap-1.5 animate-bounce">
            🎈 Joyeuse Énergie : <span className="text-coral text-sm">{toyPoints}</span> ✨
          </div>
        )}
        
        <div className="flex gap-2.5 bg-white/90 backdrop-blur-md px-3.5 py-2.5 rounded-full border border-lead-green/10 shadow-lg justify-center items-center">
          <span className="text-xs uppercase tracking-wider font-bold text-lead-green/60 font-friendly mr-1 hidden sm:inline-block">Jouets :</span>
          
          {/* Toy Teddy Bear */}
          <button
            onClick={(e) => handleToyClick('teddy', e)}
            className="w-10 h-10 rounded-full bg-mint hover:bg-lead-green text-white hover:text-white flex items-center justify-center text-xl shadow-xs transition-colors duration-200 cursor-pointer text-center relative hover:scale-110 active:scale-95"
            title="Teddy l'ours protecteur"
          >
            🧸
          </button>

          {/* Toy Rocket */}
          <button
            onClick={(e) => handleToyClick('ufo', e)}
            className="w-10 h-10 rounded-full bg-yellow-bg hover:bg-[#ff9d00] flex items-center justify-center text-xl shadow-xs transition-colors duration-200 cursor-pointer relative hover:scale-110 active:scale-95"
            title="Fusée de l'aventure"
          >
            🚀
          </button>

          {/* Toy Magic Wand */}
          <button
            onClick={(e) => handleToyClick('magic', e)}
            className="w-10 h-10 rounded-full bg-[#fbebeb] hover:bg-coral flex items-center justify-center text-xl shadow-xs transition-colors duration-200 cursor-pointer relative hover:scale-110 active:scale-95"
            title="Baguette des fées"
          >
            🪄
          </button>
        </div>
      </div>

    </div>
  );
}
