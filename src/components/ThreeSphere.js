import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector2, Raycaster } from 'three';
import caronImage from '../assets/images/caron.png';
// import soundFile from '../assets/sounds/crayon.m4a'; 

const ThreeSphere = (props) => {
  const { onBlobClick } = props; // Destructure the onBlobClick prop
  const canvasRef = useRef(null);
  // const sound = new Audio(soundFile); // Initialize audio

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

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 }
      },
      vertexShader: `
      varying vec3 vUv;
      uniform float time;
      
      void main() {
        vUv = position;
        float pulseFactor = sin(time + length(position)) * 20.2; // For a pulsating effect
        vec3 newPosition = position + normal * (sin(time * 20.0 + position.x * 20.0) * cos(time * 2.0 + position.y * 15.0) + pulseFactor); //adjustments for sphere roation speed
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
      
      `,
      fragmentShader: `
      varying vec3 vUv;
      uniform float time;
      
      void main() {
        float r = sin(vUv.x * 3.0 + time * 3.0) * 0.5 + 0.5;
        float g = cos(vUv.y * 7.0 + time * 4.0 + 13.0) * 0.5 + 0.5;
        float b = sin(vUv.z * 1.0 + time * 5.0 + 6.0) * 0.5 + 0.5;
        gl_FragColor = vec4(r, g, b, 1.0);
      }
      
      `,
    });
//trigonometric functions to generpate colors between 0.5 and 1 for red, green, and blue channels. To use a different gradient, you could add offsets or multipliers to these channels.
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(sphere);

    const textureLoader = new THREE.TextureLoader();
    const cubeTexture = textureLoader.load(caronImage);

    const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const cubeMaterial = new THREE.MeshBasicMaterial({ map: cubeTexture });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.visible = true; 
    scene.add(cube);

    camera.position.z = 20;

    const onClick = (event) => {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
    
      const intersects = raycaster.intersectObjects([sphere, cube]);
      // console.log("Intersected object test:", intersects); 
    
      if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
          const clickedObject = intersects[i].object;

          if (clickedObject === cube) {
            break;
          } else if (clickedObject === sphere) { 
            onBlobClick(); // Call the function to show Linktree (update this so there is an onclick when hovering)
            break;
          }
        }
      }
    };
    
  
    window.addEventListener('click', onClick);

    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.01;
      material.uniforms.time.value = time;

      if (camera.position.z <= 1.5) {
        cube.visible = true;
      } else {
        cube.visible = false;
      }

      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      cube.rotation.x += 0.02;
      cube.rotation.y += 0.02;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [onBlobClick, props]);

  return <div ref={canvasRef}></div>;
};

export default ThreeSphere;




