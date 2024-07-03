import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import CONE from "../../assets/3d-models/cone.glb";
import CUBE from "../../assets/3d-models/cube.glb";
import SPHERE from "../../assets/3d-models/sphere.glb";

const Models = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rotationSpeedsRef = useRef({
        cone: 0.01,
        cube: 0.01,
        sphere: 0.01,
    });
    const visibilityRef = useRef({
        cone: true,
        cube: true,
        sphere: true,
    });

    useEffect(() => {
        const currentMount = mountRef.current;

        // Camera set-up
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // renderer (Background)
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setClearColor(0x33334C);
        currentMount.appendChild(renderer.domElement);

        // Shadow
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        // Loghts
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // loading the models
        const loader = new GLTFLoader();
        const loadModel = (path, name, position) => {
            loader.load(path, (gltf) => {
                const model = gltf.scene;
                model.name = name;
                model.position.x = position;
                model.visible = visibilityRef.current[name];

                scene.add(model);
            }, undefined, (error) => {
                console.error('An error happened while loading the model', error);
            });
        };

        loadModel(CONE, 'cone', -4);
        loadModel(CUBE, 'cube', 0);
        loadModel(SPHERE, 'sphere', 4);

        // Roatation
        const animate = () => {
            requestAnimationFrame(animate);

            ['cone', 'cube', 'sphere'].forEach((object) => {
                const model = scene.getObjectByName(object);
                if (model && visibilityRef.current[object]) {
                    model.rotation.y += rotationSpeedsRef.current[object];
                }
            });

            renderer.render(scene, camera);
        };

        animate();
        return () => {
            currentMount.removeChild(renderer.domElement);
        };
    }, []);

    const handleSpeedChange = (e, object) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0) {
            rotationSpeedsRef.current[object] = value;
            const inputs = document.querySelectorAll(`.${object}-speed-input`);
            inputs.forEach(input => {
                input.value = value;
            });
        }
    };

    const handleVisibilityToggle = (object) => {
        visibilityRef.current[object] = !visibilityRef.current[object];
        const scene = sceneRef.current;
        const objectInScene = scene.getObjectByName(object);
        if (objectInScene) {
            objectInScene.visible = visibilityRef.current[object];
        }
    };

    return (
        <div className="h-screen">
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 p-4">
                {['cone', 'cube', 'sphere'].map((object) => (
                    <div key={object} className="border-2 rounded-lg p-3 mb-4 md:mb-0">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md" onClick={() => handleVisibilityToggle(object)}>Toggle {object}</button>
                        <div className="mt-2">
                            <span>Rotation Speed:</span>
                            <div className="flex items-center gap-4">
                                <input
                                    type='range'
                                    min='0'
                                    max='10'
                                    step='1'
                                    className={`bg-gray-300 w-1/2 ${object}-speed-input`}
                                    defaultValue={rotationSpeedsRef.current[object]}
                                    onChange={(e) => handleSpeedChange(e, object)}
                                />
                                <input
                                    type='number'
                                    min='0'
                                    step='0.001'
                                    className={`bg-gray-300 px-2 py-1 w-20 ${object}-speed-input`}
                                    defaultValue={rotationSpeedsRef.current[object]}
                                    onChange={(e) => handleSpeedChange(e, object)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={mountRef} className="w-full h-full" />
        </div>
    );
};

export default Models;
