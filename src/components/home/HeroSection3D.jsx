import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function HeroSection3D() {
  const canvasRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Volumetric Sphere Shader
    const sphereGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#00843e') },
        color2: { value: new THREE.Color('#00ff7f') },
        mouseX: { value: 0 },
        mouseY: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float time;
        uniform float mouseX;
        uniform float mouseY;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          float displacement = sin(pos.x * 3.0 + time) * 
                              cos(pos.y * 3.0 + time) * 
                              sin(pos.z * 3.0 + time) * 0.1;
          
          displacement += mouseX * 0.3 * sin(pos.y * 5.0);
          displacement += mouseY * 0.3 * cos(pos.x * 5.0);
          
          pos += normal * displacement;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float mouseX;
        uniform float mouseY;
        
        void main() {
          // Fresnel effect for volumetric look
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
          
          // Animated noise pattern
          float noise = sin(vPosition.x * 5.0 + time) * 
                       cos(vPosition.y * 5.0 + time) * 
                       sin(vPosition.z * 5.0 + time);
          
          // Color mixing based on position and time
          vec3 color = mix(color1, color2, vUv.y + noise * 0.3);
          
          // Add glow effect
          float glow = fresnel * (0.8 + noise * 0.2);
          color += glow * 0.5;
          
          // Mouse interaction
          float mouseInfluence = (mouseX + mouseY) * 0.5;
          color += mouseInfluence * vec3(0.2, 0.5, 0.3);
          
          gl_FragColor = vec4(color, 0.7 + fresnel * 0.3);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(2, 0, 0);
    scene.add(sphere);

    // Particles System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Random positions in a sphere-ish distribution
      const radius = 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.random() * radius;
      
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
      
      // Green color variations
      colors[i] = 0.0 + Math.random() * 0.3;
      colors[i + 1] = 0.5 + Math.random() * 0.5;
      colors[i + 2] = 0.2 + Math.random() * 0.3;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lights
    const pointLight = new THREE.PointLight('#00ff7f', 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.3);
    scene.add(ambientLight);

    // Mouse movement
    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationId;
    const clock = new THREE.Clock();
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      
      // Update shader uniforms
      sphereMaterial.uniforms.time.value = elapsed;
      sphereMaterial.uniforms.mouseX.value = mousePosition.current.x;
      sphereMaterial.uniforms.mouseY.value = mousePosition.current.y;
      
      // Rotate sphere
      sphere.rotation.x = elapsed * 0.2;
      sphere.rotation.y = elapsed * 0.3;
      
      // Rotate particles
      particles.rotation.y = elapsed * 0.05;
      
      // Animate particles positions
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] = Math.sin(elapsed + positions[i]) * 0.1 + positions[i + 1];
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
      // Camera follows mouse slightly
      camera.position.x = mousePosition.current.x * 0.5;
      camera.position.y = mousePosition.current.y * 0.5;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/50" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,132,62,0.1),transparent_50%)]" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,255,127,0.05),transparent_50%)]" style={{ zIndex: 2 }} />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          zIndex: 2,
          backgroundImage: `
            linear-gradient(rgba(0,132,62,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,132,62,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex"
            >
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/50 to-emerald-500/50 rounded-full blur-md group-hover:blur-lg transition-all" />
                <div className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-sm border border-green-500/30">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-green-400">Powered by TerangaMath</span>
                </div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight"
              >
                <span className="block text-white">Transforming</span>
                <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                  Mathematics
                </span>
                <span className="block text-white">Through Innovation</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-1 w-32 bg-gradient-to-r from-green-500 to-emerald-500 origin-left"
              />
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-xl"
            >
              Empowering young minds in Senegal through{' '}
              <span className="text-green-400 font-semibold">hospitality</span>,{' '}
              <span className="text-emerald-400 font-semibold">passion</span>, and{' '}
              <span className="text-green-500 font-semibold">excellence</span> in mathematics.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              {/* Primary CTA */}
              <motion.a
                href="#programs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2 text-white font-bold text-lg">
                  Découvrir nos programmes
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="https://www.helloasso.com/associations/terangamath/formulaires/1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-full border-2 border-green-500/50 backdrop-blur-sm bg-slate-900/50 hover:bg-slate-900/70 transition-colors"
              >
                <span className="flex items-center gap-2 text-green-400 font-bold text-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  Soutenir notre mission
                </span>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-black text-green-400">500+</div>
                <div className="text-sm text-gray-400 mt-1">Élèves formés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400">50+</div>
                <div className="text-sm text-gray-400 mt-1">Ateliers organisés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-green-500">10+</div>
                <div className="text-sm text-gray-400 mt-1">Médailles gagnées</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
              
              {/* Glass card */}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400">Scroll pour découvrir</span>
          <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}