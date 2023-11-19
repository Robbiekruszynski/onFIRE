import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector2, Raycaster } from 'three';
import caronImage from '../assets/images/caron.png';

const ThreeMountainTerrain = (props) => {
  const { onBlobClick } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    let time = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    // Create a plane geometry for the terrain
    const terrainGeometry = new THREE.PlaneGeometry(20, 20, 64, 64);
    terrainGeometry.rotateX(-Math.PI / 2); // Rotate the geometry to lay flat

    // Modify the vertices to create a mountainous terrain
    const vertices = terrainGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      vertices[i + 2] = Math.random() * 2; // Random height for each vertex
    }
    terrainGeometry.attributes.position.needsUpdate = true;
    terrainGeometry.computeVertexNormals(); // Necessary for proper lighting interaction

    const terrainMaterial = new THREE.MeshStandardMaterial({ color: 0x8b8b83 });
    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    scene.add(terrain);

    // Adjust the lighting for the terrain
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    camera.position.z = 20;

    // Define the checkHover and onClick functions
    const checkHover = (event) => {
      // ... your implementation
    };

    const onClick = (event) => {
      // ... your implementation
    };

    // Add event listeners
    window.addEventListener('mousemove', checkHover);
    window.addEventListener('click', onClick);

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      // ... other animation code
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('click', onClick);
    };
  }, [onBlobClick]);

  return <div ref={canvasRef}></div>;
};

export default ThreeMountainTerrain;
