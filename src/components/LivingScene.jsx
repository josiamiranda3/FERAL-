import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LivingScene() {
  const host = useRef(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xe9e7dc, 0.055);
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 1.7, 9.6);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xf9f5e8, 0x485a3b, 2.1));
    const key = new THREE.DirectionalLight(0xfff4d9, 3.3); key.position.set(4, 7, 5); scene.add(key);
    const rim = new THREE.PointLight(0x93a878, 32, 16); rim.position.set(-4, 2, -3); scene.add(rim);

    const world = new THREE.Group(); scene.add(world);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0xd0d0bd, roughness: 0.96 });
    const ground = new THREE.Mesh(new THREE.CircleGeometry(5.8, 96), groundMat);
    ground.rotation.x = -Math.PI / 2; ground.position.y = -1.48; world.add(ground);

    const core = new THREE.Group(); world.add(core);
    const stone = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 5), new THREE.MeshStandardMaterial({ color: 0x667b4d, roughness: 0.82, metalness: 0.02, flatShading: false }));
    stone.scale.set(1.0, 1.13, 0.92); stone.position.set(0, -0.03, 0); core.add(stone);
    // A layered architectural canopy made from sculptural arches.
    for (let i = 0; i < 7; i++) {
      const arc = new THREE.Mesh(new THREE.TorusGeometry(1.62 + i * 0.105, 0.025 + (i % 2) * 0.012, 8, 120, Math.PI * 1.13), new THREE.MeshStandardMaterial({ color: i % 2 ? 0x9c9d7e : 0x334a35, roughness: 0.58, metalness: 0.18 }));
      arc.rotation.set(0.35 + i * 0.22, i * 0.48, -0.4 + i * 0.17); arc.position.y = 0.1 + i * 0.055; core.add(arc);
    }
    // Leaf-shaped meshes, distributed around the central form.
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0); leafShape.bezierCurveTo(0.42, 0.12, 0.62, 0.55, 0.08, 0.92); leafShape.bezierCurveTo(-0.08, 0.62, -0.36, 0.24, 0, 0);
    const leafGeo = new THREE.ShapeGeometry(leafShape, 12);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x87956b, side: THREE.DoubleSide, roughness: 0.74 });
    const leaves = new THREE.Group(); core.add(leaves);
    for (let i = 0; i < 22; i++) {
      const leaf = new THREE.Mesh(leafGeo, leafMat.clone());
      const a = i * 2.399;
      const radius = 1.1 + (i % 5) * 0.12;
      leaf.position.set(Math.cos(a) * radius, -0.52 + (i % 7) * 0.19, Math.sin(a) * radius * 0.72);
      leaf.rotation.set((i % 4) * 0.45, -a, Math.sin(i) * 0.5);
      const s = 0.44 + (i % 4) * 0.11; leaf.scale.set(s, s, s); leaves.add(leaf);
    }
    // Fine floating pollen / spores.
    const count = 520; const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { const r = 1.8 + Math.random() * 3.7; const a = Math.random() * Math.PI * 2; positions[i*3] = Math.cos(a)*r; positions[i*3+1] = (Math.random()*5.8)-2.1; positions[i*3+2] = Math.sin(a)*r*0.55; }
    const pollenGeo = new THREE.BufferGeometry(); pollenGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pollen = new THREE.Points(pollenGeo, new THREE.PointsMaterial({ color: 0x68764e, size: 0.022, transparent: true, opacity: 0.64, sizeAttenuation: true })); scene.add(pollen);

    let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
    const onMove = (e) => { const r = el.getBoundingClientRect(); pointerX = ((e.clientX-r.left)/r.width - .5) * 2; pointerY = ((e.clientY-r.top)/r.height - .5) * 2; };
    el.addEventListener('pointermove', onMove);
    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate); const t = clock.getElapsedTime();
      targetX += (pointerX - targetX) * 0.035; targetY += (pointerY - targetY) * 0.035;
      if (!reduced) { core.rotation.y = t * 0.065 + targetX * 0.15; core.rotation.x = Math.sin(t * 0.22) * 0.035 - targetY * 0.055; leaves.rotation.y = -t * 0.025; pollen.rotation.y = t * 0.008; }
      camera.position.x += (targetX * 0.42 - camera.position.x) * 0.018;
      camera.position.y += (1.7 - targetY * 0.18 - camera.position.y) * 0.018;
      camera.lookAt(0, -0.05, 0); renderer.render(scene, camera);
    };
    animate();
    const resize = () => { const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return; camera.aspect = w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); };
    const observer = new ResizeObserver(resize); observer.observe(el);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); el.removeEventListener('pointermove', onMove); renderer.dispose(); scene.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) { if (Array.isArray(o.material)) o.material.forEach(m => m.dispose()); else o.material.dispose(); } }); renderer.domElement.remove(); };
  }, []);
  return <div className="living-scene" ref={host} aria-label="Interactive procedural 3D living sculpture" role="img" />;
}
