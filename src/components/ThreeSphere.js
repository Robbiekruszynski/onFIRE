import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeSphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Orbit controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    // Create custom shader material for gradient
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vUv; 

        void main() {
          vUv = position; 

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vUv;

        void main() {
          gl_FragColor = vec4(vUv.z + 0.5, vUv.x + 0.5, vUv.y + 0.5, 1.0);
        }
      `,
    });

    // Create sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

    const sphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(sphere);

    // Create cube
    const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.visible = false;  // Initially set to invisible
    scene.add(cube);

    camera.position.z = 3;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update cube visibility based on camera distance
      if (camera.position.z <= 1.5) {
        cube.visible = true;
      } else {
        cube.visible = false;
      }

      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div ref={canvasRef}></div>;
};

export default ThreeSphere;



