import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeArticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const currentMount = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    
    // Transparent background so the main page background color is visible
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    currentMount.appendChild(renderer.domElement);

    // 3. Warm, Gentle Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.82);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaf0, 1.0);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xff9d00, 0.6, 30);
    pointLight.position.set(-8, 5, 5);
    scene.add(pointLight);

    // 4. Create floating 3D childhood toys & geometric shapes
    const toysGroup = new THREE.Group();
    scene.add(toysGroup);

    interface FloatingToy {
      mesh: THREE.Mesh;
      speedY: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      amplitudeX: number;
      frequencyX: number;
      baseX: number;
    }

    const floatingToys: FloatingToy[] = [];

    // JP Warm Palette Colors
    const toyColors = [
      0xe05a47, // Playful Coral
      0xff9d00, // Golden Yellow
      0x1f4a38, // Forest Green
      0x4fa07b, // Soft Mint Green
      0x2563eb, // Cool Blue
      0xec4899, // Pink
    ];

    // Create programmatically a textured ABC Block canvas
    const createBlockTex = (letter: string, colorHex: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 128, 128);
      ctx.lineWidth = 12;
      ctx.strokeStyle = colorHex;
      ctx.strokeRect(6, 6, 116, 116);
      ctx.font = 'bold 76px sans-serif';
      ctx.fillStyle = colorHex;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(letter, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    // Instantiate different toys geometries
    const ballGeo = new THREE.SphereGeometry(0.9, 16, 16);
    const ringGeo = new THREE.TorusGeometry(0.7, 0.24, 8, 32);
    const coneGeo = new THREE.ConeGeometry(0.7, 1.4, 16);
    const cubeGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const starGeo = new THREE.OctahedronGeometry(0.8, 0); // Polyhedral sparkling star/diamond

    // Materials
    const glossyMatConfigs = toyColors.map(c => new THREE.MeshStandardMaterial({
      color: c,
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.35 // Subtle background blending
    }));

    // Build 24 floating toys
    const letters = ['A', 'B', 'C', '1', '2', '3', 'J', 'P', '🧸', '👶', '❤️', '⛅'];
    for (let i = 0; i < 26; i++) {
      let geo: THREE.BufferGeometry;
      let mat: THREE.Material;

      const typeId = i % 5;
      const colorHexStr = '#' + toyColors[i % toyColors.length].toString(16).padStart(6, '0');

      if (typeId === 0) {
        geo = ballGeo;
        mat = glossyMatConfigs[i % glossyMatConfigs.length];
      } else if (typeId === 1) {
        geo = ringGeo;
        mat = glossyMatConfigs[(i + 1) % glossyMatConfigs.length];
      } else if (typeId === 2) {
        geo = coneGeo;
        mat = glossyMatConfigs[(i + 2) % glossyMatConfigs.length];
      } else if (typeId === 3) {
        geo = starGeo;
        mat = glossyMatConfigs[(i + 3) % glossyMatConfigs.length];
      } else {
        geo = cubeGeo;
        // ABC Block textured
        const tex = createBlockTex(letters[i % letters.length], colorHexStr);
        mat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.2,
          transparent: true,
          opacity: 0.38
        });
      }

      const mesh = new THREE.Mesh(geo, mat);

      // Random arrangement across full vertical & horizontal space
      const x = (Math.random() - 0.5) * 38;
      const y = (Math.random() - 0.5) * 45; // Spread out on Y too
      const z = (Math.random() - 0.5) * 12 - 5; // Put slightly in the background

      mesh.position.set(x, y, z);
      
      const scale = 0.6 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);

      toysGroup.add(mesh);

      floatingToys.push({
        mesh,
        speedY: 0.015 + Math.random() * 0.025,
        rotSpeedX: (Math.random() - 0.5) * 0.012,
        rotSpeedY: (Math.random() - 0.5) * 0.012,
        rotSpeedZ: (Math.random() - 0.5) * 0.008,
        amplitudeX: 1.0 + Math.random() * 1.5,
        frequencyX: 0.5 + Math.random() * 1.0,
        baseX: x,
      });
    }

    // 5. Scroll Interaction Reference
    let targetScrollY = 0;
    let currentScrollY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 6. Mouse interactivity
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouse.targetY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation cycle
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Smooth camera scroll displacement
      currentScrollY += (targetScrollY - currentScrollY) * 0.1;
      
      // Interpolate mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Parallax shifts
      toysGroup.position.y = (currentScrollY * 0.02) % 45; 
      toysGroup.position.x = mouse.x * 2.2;
      toysGroup.rotation.y = mouse.x * 0.15;
      toysGroup.rotation.x = mouse.y * 0.15;

      // Animate floating items individually
      floatingToys.forEach((toy) => {
        // Move upward gently
        toy.mesh.position.y += toy.speedY;

        // Horizontally sway on a sine wave
        toy.mesh.position.x = toy.baseX + Math.sin(elapsed * toy.frequencyX) * toy.amplitudeX;

        // Auto-rotation
        toy.mesh.rotation.x += toy.rotSpeedX;
        toy.mesh.rotation.y += toy.rotSpeedY;
        toy.mesh.rotation.z += toy.rotSpeedZ;

        // Reset if goes off-screen (restarts from bottom)
        if (toy.mesh.position.y + toysGroup.position.y > 25) {
          toy.mesh.position.y = -25 - toysGroup.position.y;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Resizing
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      currentMount.removeChild(renderer.domElement);
      
      // Dispose allocations
      ballGeo.dispose();
      ringGeo.dispose();
      coneGeo.dispose();
      cubeGeo.dispose();
      starGeo.dispose();
      glossyMatConfigs.forEach(m => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none -z-5 overflow-hidden opacity-75 md:opacity-100" 
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
