import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, RefreshCw } from 'lucide-react';

export function ThreeToys() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredToy, setHoveredToy] = useState<string | null>(null);
  const [clickedMessage, setClickedMessage] = useState<string | null>(null);
  const [interactionCount, setInteractionCount] = useState<number>(0);

  // Encouragements tailored to child development and psychology
  const toyMessages: Record<string, string[]> = {
    ball: [
      "⚽ Motricité globale : Bébé apprend à suivre du regard !",
      "🎈 Éveil sensoriel : Les couleurs primaires stimulent la rétine !",
      "✨ coordination : Hop, j'attrape le ballon de la coordination !"
    ],
    ring: [
      "💍 Tri & Logique : Empiler dans le bon ordre de grandeur !",
      "🧠 Raisonnement : Comprendre les tailles et les volumes !",
      "🌸 patience : Travailler la motricité fine avec calme."
    ],
    block: [
      "🧱 Construction : Bâtir ses premières structures cognitives !",
      "🪵 Langage : J comme Joyaux, P comme Précieux !",
      "🌟 Prise de repères : Structurer l'espace tridimensionnel."
    ],
    top: [
      "🌀 Cause à effet : Je tourne si tu me donnes de l'élan !",
      "⚡ Concentration : Captiver l'attention de l'enfant !",
      "🍀 Équilibre : Trouver le centre de gravité de mes émotions."
    ]
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const width = currentMount.clientWidth;
    const height = 400;

    // ----------------------------------------------------
    // 1. SCENE & CAMERA SETUP
    // ----------------------------------------------------
    const scene = new THREE.Scene();
    scene.background = null; // Transparent to fit the warm background beautifully!

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // ----------------------------------------------------
    // 2. LIGHTS (Warm & Cheerful)
    // ----------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    directionalLight.position.set(5, 8, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff9d00, 0.8, 20);
    pointLight.position.set(-4, -2, 3);
    scene.add(pointLight);

    // ----------------------------------------------------
    // 3. TOY ASSEMBLY (ABC Block, Beach Ball, Stacking Ring, Top)
    // ----------------------------------------------------

    const toyGroup = new THREE.Group();
    scene.add(toyGroup);

    const updateGroupScale = () => {
      const w = currentMount.clientWidth;
      if (w < 480) {
        toyGroup.scale.set(0.6, 0.6, 0.6);
      } else if (w < 768) {
        toyGroup.scale.set(0.8, 0.8, 0.8);
      } else {
        toyGroup.scale.set(1.1, 1.1, 1.1);
      }
    };
    updateGroupScale();

    // Group for holding references for raycasting
    const objectsToIntersect: THREE.Object3D[] = [];

    // --- TOY 1: Beach Ball (Sphere) ---
    const ballGeometry = new THREE.SphereGeometry(1.4, 32, 32);
    
    // Create a multi-colored texture programmatically
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const colors = ['#e05a47', '#ff9d00', '#faf8f2', '#1f4a38', '#ff9d00', '#e8f1ec'];
    const w = canvas.width / colors.length;
    for (let i = 0; i < colors.length; i++) {
      ctx.fillStyle = colors[i];
      ctx.fillRect(i * w, 0, w, canvas.height);
    }
    const ballTexture = new THREE.CanvasTexture(canvas);
    
    const ballMaterial = new THREE.MeshStandardMaterial({
      map: ballTexture,
      roughness: 0.15,
      metalness: 0.05,
    });
    const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    ballMesh.position.set(-4.5, 0.5, 0);
    ballMesh.name = "ball";
    ballMesh.castShadow = true;
    toyGroup.add(ballMesh);
    objectsToIntersect.push(ballMesh);

    // --- TOY 2: Stacking Ring (Torus) ---
    const ringGeometry = new THREE.TorusGeometry(1.1, 0.45, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xe05a47, // Playful JP Coral Red
      roughness: 0.1,
      metalness: 0.1,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.position.set(-1.5, -1, 0);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.name = "ring";
    ringMesh.castShadow = true;
    toyGroup.add(ringMesh);
    objectsToIntersect.push(ringMesh);

    // --- TOY 3: ABC Block (Layered Cube) ---
    const blockGeometry = new THREE.BoxGeometry(2, 2, 2);
    
    // Create canvas texture with letter "J" and "P" (Joyaux Précieux)
    const blockMaterials = Array.from({ length: 6 }).map((_, i) => {
      const blockCanvas = document.createElement('canvas');
      blockCanvas.width = 128;
      blockCanvas.height = 128;
      const bCtx = blockCanvas.getContext('2d')!;
      
      // Beautiful border and soft background
      bCtx.fillStyle = '#faf8f2';
      bCtx.fillRect(0, 0, 128, 128);
      bCtx.lineWidth = 14;
      bCtx.strokeStyle = i % 2 === 0 ? '#1f4a38' : '#ff9d00';
      bCtx.strokeRect(7, 7, 114, 114);
      
      // Lettering
      bCtx.font = 'bold 80px Fredoka, sans-serif';
      bCtx.fillStyle = i % 2 === 0 ? '#1f4a38' : '#e05a47';
      bCtx.textAlign = 'center';
      bCtx.textBaseline = 'middle';
      const letter = i % 3 === 0 ? 'J' : (i % 3 === 1 ? 'P' : '👶');
      bCtx.fillText(letter, 64, 64);

      const blockTex = new THREE.CanvasTexture(blockCanvas);
      return new THREE.MeshStandardMaterial({
        map: blockTex,
        roughness: 0.2,
      });
    });

    const blockMesh = new THREE.Mesh(blockGeometry, blockMaterials);
    blockMesh.position.set(1.5, 1, 0);
    blockMesh.name = "block";
    blockMesh.castShadow = true;
    toyGroup.add(blockMesh);
    objectsToIntersect.push(blockMesh);

    // --- TOY 4: Spinning Top (Cone + Cylinder combined) ---
    const topGroup = new THREE.Group();
    topGroup.position.set(4.5, -0.5, 0);
    topGroup.name = "top";
    
    const coneGeom = new THREE.ConeGeometry(1.1, 1.8, 32);
    const coneMat = new THREE.MeshStandardMaterial({
      color: 0xff9d00, // Sunny yellow JP
      roughness: 0.1,
    });
    const coneMesh = new THREE.Mesh(coneGeom, coneMat);
    coneMesh.rotation.x = Math.PI; // upside down cone
    topGroup.add(coneMesh);

    const tipGeom = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 16);
    const tipMat = new THREE.MeshStandardMaterial({
      color: 0x1f4a38,
      roughness: 0.3,
    });
    const tipMesh = new THREE.Mesh(tipGeom, tipMat);
    tipMesh.position.y = 1.1;
    topGroup.add(tipMesh);

    toyGroup.add(topGroup);
    // Add custom hit-box transparent cylinder for raycaster ease
    const hitBoxGeom = new THREE.CylinderGeometry(1.3, 1.3, 2.5, 16);
    const hitBoxMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitBoxMesh = new THREE.Mesh(hitBoxGeom, hitBoxMat);
    hitBoxMesh.name = "top";
    topGroup.add(hitBoxMesh);
    objectsToIntersect.push(hitBoxMesh);

    // ----------------------------------------------------
    // 4. RAYCASTING & INTERACTION
    // ----------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: PointerEvent) => {
      // Relative coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(objectsToIntersect);

      if (intersects.length > 0) {
        const first = intersects[0].object;
        let pName = first.name;
        // fallback in case of nested meshes
        if (!pName && first.parent && first.parent.name) {
          pName = first.parent.name;
        }

        if (pName) {
          setHoveredToy(pName);
          document.body.style.cursor = 'pointer';
        }
      } else {
        setHoveredToy(null);
        document.body.style.cursor = 'default';
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(objectsToIntersect);

      if (intersects.length > 0) {
        const target = intersects[0].object;
        let name = target.name;
        if (!name && target.parent && target.parent.name) {
          name = target.parent.name;
        }

        if (name) {
          // Play acrobatics
          let mesh: THREE.Object3D | null = null;
          if (name === 'ball') mesh = ballMesh;
          if (name === 'ring') mesh = ringMesh;
          if (name === 'block') mesh = blockMesh;
          if (name === 'top') mesh = topGroup;

          if (mesh) {
            setInteractionCount(prev => prev + 1);
            // Rotational and vertical jump animation
            const timeline = {
              progress: 0,
              baseY: mesh.position.y
            };

            const animateJump = () => {
              timeline.progress += 0.08;
              if (timeline.progress <= Math.PI) {
                // Sin wave jump
                mesh!.position.y = timeline.baseY + Math.sin(timeline.progress) * 2.2;
                
                if (name === 'ball') {
                  mesh!.rotation.x += 0.15;
                  mesh!.rotation.y += 0.15;
                } else if (name === 'ring') {
                  mesh!.rotation.y += 0.25;
                } else if (name === 'block') {
                  mesh!.rotation.z += 0.2;
                  mesh!.rotation.x += 0.1;
                } else if (name === 'top') {
                  mesh!.rotation.y += 0.4;
                }

                requestAnimationFrame(animateJump);
              } else {
                mesh!.position.y = timeline.baseY;
              }
            };
            animateJump();

            // Select random insightful child psych message
            const playlist = toyMessages[name] || ["Merveilleux !"];
            const randomMsg = playlist[Math.floor(Math.random() * playlist.length)];
            setClickedMessage(randomMsg);

            // Create little colorful HTML circular burst particles where user clicked
            const burst = document.createElement('div');
            burst.className = 'absolute pointer-events-none w-4 h-4 rounded-full bg-coral z-30 transition-transform';
            burst.style.left = `${e.clientX - rect.left}px`;
            burst.style.top = `${e.clientY - rect.top}px`;
            currentMount.appendChild(burst);
            
            setTimeout(() => burst.remove(), 800);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    // ----------------------------------------------------
    // 5. ANIMATION RENDERING LOOP (Butter smooth)
    // ----------------------------------------------------
    const clock = new THREE.Clock();

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle floating/bobbing sin wave
      ballMesh.position.y = 0.5 + Math.sin(elapsedTime * 1.5) * 0.35;
      ringMesh.position.y = -1 + Math.cos(elapsedTime * 1.2) * 0.28;
      blockMesh.position.y = 1 + Math.sin(elapsedTime * 1.8) * 0.3;
      topGroup.position.y = -0.5 + Math.sin(elapsedTime * 1.3) * 0.25;

      // Base rotation
      ballMesh.rotation.y += 0.007;
      ringMesh.rotation.z += 0.005;
      blockMesh.rotation.x += 0.005;
      blockMesh.rotation.y += 0.005;
      topGroup.rotation.y += 0.015;

      // Amplify rotation on hover
      if (hoveredToy) {
        if (hoveredToy === 'ball') {
          ballMesh.rotation.y += 0.03;
          ballMesh.rotation.x += 0.01;
        } else if (hoveredToy === 'ring') {
          ringMesh.rotation.z += 0.04;
        } else if (hoveredToy === 'block') {
          blockMesh.rotation.y += 0.035;
          blockMesh.rotation.z += 0.02;
        } else if (hoveredToy === 'top') {
          topGroup.rotation.y += 0.08;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // ----------------------------------------------------
    // 6. RESPONSIVE CONTAINER RESIZING
    // ----------------------------------------------------
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
      updateGroupScale();
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      cancelAnimationFrame(animationFrameId);
      
      // Dispose materials/geometries
      ballGeometry.dispose();
      ballMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      blockGeometry.dispose();
      blockMaterials.forEach(m => m.dispose());
      coneGeom.dispose();
      coneMat.dispose();
      tipGeom.dispose();
      tipMat.dispose();
      hitBoxGeom.dispose();
      hitBoxMat.dispose();
      renderer.dispose();
    };
  }, [hoveredToy]);

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4 relative z-30 font-friendly">
      
      {/* Playful Banner */}
      <div className="bg-white/90 backdrop-blur-xl border border-lead-green/10 rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
        
        {/* Confetti decoration top right */}
        <div className="absolute top-4 right-4 text-coral text-xl animate-bounce">🎈</div>
        <div className="absolute bottom-4 left-4 text-[#ff9d00] text-xl animate-pulse">🧸</div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint text-lead-green font-semibold text-xs border border-lead-green/5 shadow-xs">
            <Sparkles size={12} className="text-[#ff9d00] animate-spin" />
            <span>EXCLUSIF : ESPACE DE JEU 3D INTERACTIF</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-lead-green mt-3">
            L'Éveil par le Jeu & Développement
          </h2>
          <p className="text-sm text-lead-green/75 max-w-xl mt-2 leading-relaxed">
            Cliquez directement sur les jouets 3D pour effectuer des pirouettes acrobatiques et décoder l'impact psychologique de chaque objet sur le développement de votre enfant !
          </p>
        </div>

        {/* The Three JS Mountable Sandbox */}
        <div className="relative w-full h-[400px] mt-4 flex items-center justify-center rounded-2xl overflow-hidden bg-radial-gradient from-white/40 via-mint/10 to-transparent">
          <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />
          
          {/* Active Hover Floating Legend */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 border border-lead-green/10 px-4 py-2 rounded-full shadow-md text-xs text-lead-green font-bold flex items-center gap-2 pointer-events-none animate-bounce">
            {hoveredToy ? (
              <span className="flex items-center gap-1.5">
                {hoveredToy === 'ball' && '⚽ Jouer avec la Balle Sensorielle'}
                {hoveredToy === 'ring' && '💍 Empiler l\'Anneau du Développement'}
                {hoveredToy === 'block' && '🧱 Empiler le Cube de Construction (J, P)'}
                {hoveredToy === 'top' && '🌀 Faites tourner la Toupie de l\'Attention'}
                <span className="text-coral">Cliquez !</span>
              </span>
            ) : (
              <span className="text-lead-green/60 flex items-center gap-1.5">
                👈 Survolez et cliquez sur les jouets tridimensionnels
              </span>
            )}
          </div>
        </div>

        {/* Dynamic educational feedback bubble (AnimatePresence) */}
        <div className="min-h-[80px] flex items-center justify-center mt-4">
          <AnimatePresence mode="wait">
            {clickedMessage ? (
              <motion.div
                key={clickedMessage}
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -15 }}
                className="bg-yellow-bg border-2 border-[#ff9d00]/30 rounded-2xl px-6 py-4 shadow-sm text-center max-w-xl"
              >
                <div className="flex items-center gap-2 justify-center mb-1 text-xs uppercase tracking-widest font-extrabold text-[#ff9d00] font-sans">
                  <Sparkles size={12} /> Éclairage de Lina NGUERELESSIO, étudiante en Psychologie du Dev
                </div>
                <p className="text-sm font-semibold text-lead-green text-center">
                  {clickedMessage}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="text-xs text-lead-green/50 italic flex items-center gap-1"
              >
                <HelpCircle size={13} /> Vos interactions s'affichent sous forme de conseils psycho-éducatifs
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
