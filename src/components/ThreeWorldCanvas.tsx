import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { Eye, RotateCcw, Box, Sparkles, Layers } from 'lucide-react';

interface ThreeWorldCanvasProps {
  isDarkMode?: boolean;
  activeChapter?: string;
  onSelectFeature?: (featureName: string) => void;
}

export const ThreeWorldCanvas: React.FC<ThreeWorldCanvasProps> = ({
  isDarkMode = true,
  activeChapter = 'chapter-horizon',
  onSelectFeature
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [hoveredObjectName, setHoveredObjectName] = useState<string | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const interactablesRef = useRef<THREE.Mesh[]>([]);
  const materialsRef = useRef<THREE.Material[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- THREE.JS SCENE SETUP (Huyml.co style 3D Creative Playground) ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0a0d14, 0.025);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 9);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    keyLight.position.set(6, 10, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa855f7, 2.5);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    const centerPointLight = new THREE.PointLight(0x2dd4bf, 3.0, 15);
    centerPointLight.position.set(0, 0, 0);
    scene.add(centerPointLight);

    // --- 3D INTERACTIVE PLAYGROUND GROUP ---
    const coreGroup = new THREE.Group();
    coreGroupRef.current = coreGroup;
    scene.add(coreGroup);

    interactablesRef.current = [];
    materialsRef.current = [];

    const track = <T extends THREE.Material>(mat: T): T => {
      materialsRef.current.push(mat);
      return mat;
    };

    // 1. Central Iridescent Polyhedral Core (The Database Architecture Prism)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = track(
      new THREE.MeshPhysicalMaterial({
        color: 0x0d99ff,
        emissive: 0x064e3b,
        emissiveIntensity: 0.25,
        roughness: 0.1,
        metalness: 0.85,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        wireframe: false
      })
    );
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.name = 'PostgreSQL Core Engine';
    coreGroup.add(coreMesh);
    interactablesRef.current.push(coreMesh);

    // 2. Floating Orbiting Rings (Huy Le Creative Motion)
    const ringGeo1 = new THREE.TorusGeometry(2.8, 0.04, 16, 100);
    const ringMat1 = track(
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.6,
        roughness: 0.2
      })
    );
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.6, 0.035, 16, 100);
    const ringMat2 = track(
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0xa855f7,
        emissiveIntensity: 0.5,
        roughness: 0.2
      })
    );
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // 3. Floating Interactive Satellites / Nodes
    const satelliteData = [
      { geo: new THREE.OctahedronGeometry(0.55), color: 0x10b981, pos: [-3.2, 1.4, 0.8], name: 'NestJS Microservices Node' },
      { geo: new THREE.BoxGeometry(0.75, 0.75, 0.75), color: 0xf59e0b, pos: [3.2, -1.2, 1.2], name: 'Redis Sub-Millisecond Cache' },
      { geo: new THREE.DodecahedronGeometry(0.6), color: 0xa855f7, pos: [1.8, 2.6, -1.5], name: 'Power BI Analytics REST' },
      { geo: new THREE.TetrahedronGeometry(0.65), color: 0x06b6d4, pos: [-2.2, -2.2, -1.2], name: 'Angular Enterprise Framework' }
    ];

    const satellites: THREE.Mesh[] = [];

    satelliteData.forEach((sd) => {
      const mat = track(
        new THREE.MeshStandardMaterial({
          color: sd.color,
          emissive: sd.color,
          emissiveIntensity: 0.4,
          roughness: 0.2,
          metalness: 0.8
        })
      );
      const mesh = new THREE.Mesh(sd.geo, mat);
      mesh.position.set(sd.pos[0], sd.pos[1], sd.pos[2]);
      mesh.name = sd.name;
      coreGroup.add(mesh);
      satellites.push(mesh);
      interactablesRef.current.push(mesh);
    });

    // 4. Ambient Floating Particle Swarm (Huyml Galaxy Effect)
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x38bdf8);
    const cPurple = new THREE.Color(0xa855f7);
    const cEmerald = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const rand = Math.random();
      const col = rand > 0.6 ? cCyan : rand > 0.3 ? cPurple : cEmerald;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // --- MOUSE INTERACTION & RAYCASTING ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.x = x;
      mouse.y = y;

      targetRotY = x * 0.6;
      targetRotX = -y * 0.4;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactablesRef.current);
      if (intersects.length > 0) {
        container.style.cursor = 'pointer';
        setHoveredObjectName(intersects[0].object.name || 'Architecture Node');
      } else {
        container.style.cursor = 'default';
        setHoveredObjectName(null);
      }
    };

    const handleClick = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactablesRef.current);
      if (intersects.length > 0) {
        const target = intersects[0].object as THREE.Mesh;
        target.scale.set(1.5, 1.5, 1.5);
        setTimeout(() => target.scale.set(1, 1, 1), 300);

        confetti({
          particleCount: 35,
          spread: 60,
          origin: {
            x: event.clientX / window.innerWidth,
            y: event.clientY / window.innerHeight
          },
          colors: ['#0d99ff', '#a855f7', '#10b981', '#38bdf8']
        });

        if (onSelectFeature && target.name) {
          onSelectFeature(target.name);
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // --- ANIMATION TICK ---
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Damped mouse rotation
      coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.05;
      coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.05;

      if (isRotating) {
        coreGroup.rotation.y += 0.005;
        ring1.rotation.z += 0.01;
        ring2.rotation.z -= 0.008;
      }

      coreMesh.rotation.x = elapsed * 0.3;
      coreMesh.rotation.y = elapsed * 0.4;

      satellites.forEach((sat, i) => {
        sat.rotation.x += 0.015;
        sat.rotation.y += 0.02;
        sat.position.y += Math.sin(elapsed * 2 + i) * 0.004;
      });

      particleField.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isRotating]);

  const toggleWireframe = () => {
    const nextState = !wireframe;
    setWireframe(nextState);
    materialsRef.current.forEach((mat) => {
      if ('wireframe' in mat) {
        (mat as THREE.MeshStandardMaterial).wireframe = nextState;
      }
    });
  };

  const resetCamera = () => {
    if (cameraRef.current && coreGroupRef.current) {
      cameraRef.current.position.set(0, 3.5, 9);
      cameraRef.current.lookAt(0, 0, 0);
      coreGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#090d16] to-[#04060a] border border-white/10 shadow-2xl">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono font-bold text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Three.js Creative Playground • Click Nodes to Interact</span>
        </div>
      </div>

      {/* Hover Object Indicator */}
      {hoveredObjectName && (
        <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-xl bg-cyan-950/80 text-cyan-200 text-xs font-mono font-bold border border-cyan-500/40 shadow-lg backdrop-blur animate-in fade-in">
          ✦ {hoveredObjectName}
        </div>
      )}

      {/* Controls Bar */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-[#121215]/85 p-1.5 rounded-xl border border-white/10 backdrop-blur shadow-lg">
        <button
          onClick={() => setIsRotating(!isRotating)}
          type="button"
          className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
            isRotating ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{isRotating ? 'Orbiting' : 'Paused'}</span>
        </button>

        <button
          onClick={toggleWireframe}
          type="button"
          className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
            wireframe ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>{wireframe ? 'Solid' : 'Wireframe'}</span>
        </button>

        <button
          onClick={resetCamera}
          type="button"
          title="Reset Camera Center"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Micro Legend */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400 backdrop-blur">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400" /> PostgreSQL</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> NestJS</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Redis</span>
      </div>
    </div>
  );
};
