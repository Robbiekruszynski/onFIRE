import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import caronImage from '../assets/images/caron.png';

const ThreeSphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let time = 0;
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Orbit controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    // Custom shader material for gradient and displacement
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 }
      },
      vertexShader: `
        varying vec3 vUv;
        uniform float time;

        void main() {
          vUv = position;
          vec3 newPosition = position + normal * sin(time + position.x * 1116.0 + position.y * 6.0 + position.z * 6.0) * .5;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vUv;

        void main() {
          gl_FragColor = vec4(vUv.z + 0.5, vUv.x + 1.5, vUv.y + 0.5, 10.0);
        }
      `,
    });

    // Create sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(sphere);

    // Load texture for cube
    const textureLoader = new THREE.TextureLoader();
    const cubeTexture = textureLoader.load(caronImage);

    // Create cube
    const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const cubeMaterial = new THREE.MeshBasicMaterial({ map: cubeTexture }); 
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.visible = false; 
    scene.add(cube);

    camera.position.z = 3;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.01;
      material.uniforms.time.value = time;

      // Update cube visibility based on camera distance
      if (camera.position.z <= 1.5) {
        cube.visible = true;
      } else {
        cube.visible = false;
      }

      // Rotate both the sphere and the cube
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      cube.rotation.x += 0.02;
      cube.rotation.y += 0.02;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div ref={canvasRef}></div>;
};

export default ThreeSphere;


