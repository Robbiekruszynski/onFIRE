import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector2, Raycaster } from 'three';
import caronImage from '../assets/images/caron.png';
// import sound from '../assets/sounds/crayon.m4a'

const ThreeSphere = (props) => {
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

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 }
      },
     vertexShader: `
  varying vec3 vUv;
  uniform float time;

  void main() {
    vUv = position;
    vec3 newPosition = position + normal * sin(time + position.x * 30.0) * cos(time + position.y * 20.0) * 0.3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`,
fragmentShader: `
  varying vec3 vUv;
  uniform float time;

  void main() {
    float r = sin(vUv.x * 6.0 + time * 2.0) * 0.5 + 0.5;
    float g = cos(vUv.y * 6.0 + time * 3.0 + 2.0) * 0.5 + 0.5;
    float b = sin(vUv.z * 6.0 + time * 4.0 + 4.0) * 0.5 + 0.5;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`,

    });

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(sphere);

    const textureLoader = new THREE.TextureLoader();
    const cubeTexture = textureLoader.load(caronImage);

    const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const cubeMaterial = new THREE.MeshBasicMaterial({ map: cubeTexture });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.visible = false;
    scene.add(cube);

    camera.position.z = 3;

    const onClick = (event) => {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([sphere]);
      if (intersects.length > 0) {
        if (props.onBlobClick) {
          props.onBlobClick();
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
  }, [props]);

  return <div ref={canvasRef}></div>;
};

export default ThreeSphere;



