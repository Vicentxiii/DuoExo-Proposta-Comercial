/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Loader2 } from 'lucide-react';

interface ThreeCarViewerProps {
  rotationAngle: number;
  onRotationChange: (angle: number) => void;
  paintColor: string; // Hex string e.g. "#121214"
  wheelColor: string; // Hex string
  wheelsType: string; // "aero" | "spoke" | "carbon"
  aeroKit: boolean;
}

export default function ThreeCarViewer({
  rotationAngle,
  onRotationChange,
  paintColor,
  wheelColor,
  wheelsType,
  aeroKit
}: ThreeCarViewerProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Drag interaction state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const lastPointerPos = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  const pitchRef = useRef<number>(0); // Vertical rotation in degrees
  const yawRef = useRef<number>(rotationAngle); // Horizontal rotation in degrees

  // Keep references to loaded elements to modify them on props change
  const modelRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const wheelMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const glassMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const spoilerPartsRef = useRef<THREE.Object3D[]>([]);

  // Track rotation in a ref to avoid stale closure in ThreeJS animation loop
  const rotationRef = useRef<number>(rotationAngle);
  const zoomRef = useRef<number>(1.0);

  useEffect(() => {
    // Sync external rotation changes if any, but internal dragging will also update yawRef
    if (!isDragging) {
      yawRef.current = rotationAngle;
    }
    rotationRef.current = rotationAngle;
  }, [rotationAngle, isDragging]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    
    // Create scene
    const scene = new THREE.Scene();
    // Solid clean white background as requested
    scene.background = new THREE.Color('#ffffff');
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Move car closer initially
    camera.position.set(0, 1.1, 4.2);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Add high fidelity studio lighting for white studio background
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.8);
    topLight.position.set(0, 10, 0);
    scene.add(topLight);

    // Add floor shadow receiver
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    // Soft shadow suited for solid white background
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    // Load Model
    const loader = new GLTFLoader();
    loader.load(
      '/2021_lexus_bev_sport_concept.glb',
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        
        // Compute bounding box to automatically center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Reset translation to center
        model.position.sub(center);
        
        // Position on top of the floor with a slight upward offset to keep wheels visible on zoom
        model.position.y = -box.min.y + 0.15;

        // Scale model to fit the scene beautifully
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 3.5 / maxDim;
        model.scale.setScalar(targetScale);

        // Track materials dynamically
        const paintMats: THREE.MeshStandardMaterial[] = [];
        const wheelMats: THREE.MeshStandardMaterial[] = [];
        const glassMats: THREE.MeshStandardMaterial[] = [];
        const spoilerParts: THREE.Object3D[] = [];

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // Detect if parents contain wheels or glass
            let isWheel = false;
            let isGlass = false;
            let curr: THREE.Object3D | null = child;
            while (curr) {
              const name = curr.name.toLowerCase();
              if (name.includes('wheel') || name.includes('rim') || name.includes('roda') || name.includes('tire')) {
                isWheel = true;
              }
              if (name.includes('glass') || name.includes('window') || name.includes('vidro') || name.includes('windshield')) {
                isGlass = true;
              }
              curr = curr.parent;
            }

            const mat = mesh.material;
            if (mat) {
              const materials = Array.isArray(mat) ? mat : [mat];
              materials.forEach((m) => {
                if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshPhysicalMaterial) {
                  const name = m.name.toLowerCase();
                  
                  // Match paint keywords
                  if (
                    name.includes('paint') || 
                    name.includes('body') || 
                    name.includes('color') || 
                    name.includes('car_paint') ||
                    name.includes('metallic') ||
                    name.includes('carpaint') ||
                    name.includes('shell') ||
                    name.includes('pintura') ||
                    name.includes('carrosserie') ||
                    name.includes('exterior')
                  ) {
                    paintMats.push(m);
                  } else if (isWheel || name.includes('wheel') || name.includes('rim') || name.includes('alloy') || name.includes('spoke')) {
                    if (!wheelMats.includes(m)) {
                      wheelMats.push(m);
                    }
                  } else if (isGlass || name.includes('glass') || name.includes('window') || name.includes('windshield') || name.includes('vidro')) {
                    if (!glassMats.includes(m)) {
                      glassMats.push(m);
                    }
                  }
                }
              });
            }
          }

          // Search spoiler/wing
          const childName = child.name.toLowerCase();
          if (
            childName.includes('spoiler') || 
            childName.includes('wing') || 
            childName.includes('aerokit') || 
            childName.includes('splitter') ||
            childName.includes('diffuser')
          ) {
            spoilerParts.push(child);
          }
        });

        // Fallback: If no material matched our paint keywords, try to target materials that seem to be the main body
        if (paintMats.length === 0) {
          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              const mat = mesh.material;
              if (mat) {
                const materials = Array.isArray(mat) ? mat : [mat];
                materials.forEach((m) => {
                  if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshPhysicalMaterial) {
                    const name = m.name.toLowerCase();
                    if (
                      name.includes('car') || 
                      name.includes('main') || 
                      name.includes('primary') ||
                      name.includes('material')
                    ) {
                      paintMats.push(m);
                    }
                  }
                });
              }
            }
          });
        }

        materialsRef.current = paintMats;
        wheelMaterialsRef.current = wheelMats;
        glassMaterialsRef.current = glassMats;
        spoilerPartsRef.current = spoilerParts;

        // Apply initial configuration options
        applyPaintColor(paintColor);
        applyWheelColor(wheelColor);
        applyAeroKit(aeroKit);

        // Standard transparent glossy glass
        glassMaterialsRef.current.forEach((mat) => {
          mat.transparent = true;
          mat.opacity = 0.45;
          mat.roughness = 0.05;
          mat.metalness = 0.95;
          mat.needsUpdate = true;
        });

        scene.add(model);
        setIsLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100));
        } else {
          setLoadingProgress((prev) => Math.min(prev + 5, 95));
        }
      },
      (err) => {
        console.error('Error loading 3D model:', err);
        setError('Falha ao carregar o modelo 3D.');
        setIsLoading(false);
      }
    );

    // Apply color options to matched materials
    function applyPaintColor(colorHex: string) {
      const color = new THREE.Color(colorHex);
      materialsRef.current.forEach((mat) => {
        mat.color.copy(color);
        if (colorHex === '#121214') {
          // Matte black finish
          mat.roughness = 0.6;
          mat.metalness = 0.25;
        } else {
          // Glossy premium finish
          mat.roughness = 0.15;
          mat.metalness = 0.85;
        }
        mat.needsUpdate = true;
      });
    }

    function applyWheelColor(colorHex: string) {
      const color = new THREE.Color(colorHex);
      wheelMaterialsRef.current.forEach((mat) => {
        mat.color.copy(color);
        mat.roughness = 0.35;
        mat.metalness = 0.75;
        mat.needsUpdate = true;
      });
    }

    // Toggle aero parts
    function applyAeroKit(enabled: boolean) {
      spoilerPartsRef.current.forEach((part) => {
        part.visible = enabled;
      });
    }

    // Render frame loop
    let animationFrameId: number;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      
      if (modelRef.current) {
        // Smooth rotation interpolation
        const targetYawRad = (yawRef.current * Math.PI) / 180;
        const targetPitchRad = (pitchRef.current * Math.PI) / 180;
        
        // Use smooth interpolation for both axes
        modelRef.current.rotation.y += (targetYawRad - modelRef.current.rotation.y) * 0.15;
        modelRef.current.rotation.x += (targetPitchRad - modelRef.current.rotation.x) * 0.15;
      }

    // Smooth zoom application
    const width = container.clientWidth;
    const baseDistance = width < 640 ? 6.0 : 4.2;
    const targetZ = baseDistance / zoomRef.current;
    camera.position.z += (targetZ - camera.position.z) * 0.1;
    
    // Adjust Y position to keep wheels in view as we zoom in
    // Moving camera Y down slightly as we zoom in helps focus on the lower part if needed, 
    // but user wants car "more up", so we move camera Y DOWN to look from a lower angle or move model UP.
    const targetY = (width < 640 ? 0.85 : 0.9) - (zoomRef.current - 1) * 0.1;
    camera.position.y += (targetY - camera.position.y) * 0.1;

      renderer.render(scene, camera);
    }
    animate();

    // Sizing and camera adjustment based on aspect ratio
    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      
      // Dynamic camera zoom so it never overflows or clips on mobile screens
      if (width < 640) {
        camera.position.set(0, 0.85, 6.0 / zoomRef.current);
      } else {
        camera.position.set(0, 1.1, 4.2 / zoomRef.current);
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // Run setup once on mount

  // React to paint color changes
  useEffect(() => {
    if (modelRef.current && materialsRef.current.length > 0) {
      const color = new THREE.Color(paintColor);
      materialsRef.current.forEach((mat) => {
        mat.color.copy(color);
        if (paintColor === '#121214') {
          mat.roughness = 0.6;
          mat.metalness = 0.25;
        } else {
          mat.roughness = 0.15;
          mat.metalness = 0.85;
        }
        mat.needsUpdate = true;
      });
    }
  }, [paintColor]);

  // React to wheel color changes
  useEffect(() => {
    if (wheelMaterialsRef.current.length > 0) {
      const color = new THREE.Color(wheelColor);
      wheelMaterialsRef.current.forEach((mat) => {
        mat.color.copy(color);
        mat.needsUpdate = true;
      });
    }
  }, [wheelColor]);

  // React to aeroKit changes
  useEffect(() => {
    spoilerPartsRef.current.forEach((part) => {
      part.visible = aeroKit;
    });
  }, [aeroKit]);

  // Pointer/Drag events to turn car in 3D
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isLoading || error) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastPointerPos.current.x;
    const deltaY = e.clientY - lastPointerPos.current.y;
    
    lastPointerPos.current = { x: e.clientX, y: e.clientY };

    // Update yaw (horizontal) - infinite
    yawRef.current -= deltaX * 0.6;
    
    // Update pitch (vertical) - limited to avoid flipping
    const newPitch = pitchRef.current + deltaY * 0.4;
    pitchRef.current = Math.min(Math.max(newPitch, -15), 45); // Limit from -15 to 45 degrees

    // Report yaw back to parent if needed (clamped for UI consistency if they use it elsewhere)
    onRotationChange(yawRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDragging(false);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const handleNativeWheel = (e: WheelEvent) => {
      // Prevent the page from scrolling when zooming inside the card
      e.preventDefault();
      const zoomSpeed = 0.0015;
      zoomRef.current = Math.min(Math.max(zoomRef.current - e.deltaY * zoomSpeed, 0.7), 2.8);
    };

    container.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleNativeWheel);
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className="relative w-full h-[240px] md:h-[320px] flex items-center justify-center bg-white select-none cursor-grab active:cursor-grabbing overflow-hidden touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 gap-3">
          <Loader2 className="w-8 h-8 text-brand-accent animate-spin" />
          <span className="font-mono text-[10px] text-zinc-600 tracking-wider">
            Carregando Lexus 3D Real ({loadingProgress}%)
          </span>
          <div className="w-40 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-accent transition-all duration-150"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 p-4 text-center">
          <p className="text-xs text-red-500 font-mono mb-2">{error}</p>
          <p className="text-[10px] text-zinc-500">Exibindo renderização alternativa inteligente</p>
        </div>
      )}
    </div>
  );
}
