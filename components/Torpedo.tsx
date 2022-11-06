import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import {
  EdgesGeometry,
  LineBasicMaterial,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
} from "three";
import { SimplifyModifier } from "three/examples/jsm/modifiers/SimplifyModifier";

// TODO: make the torpedo show up properly.

function getMouseDegrees(x: number, y: number, degreeLimit: number) {
  let dx = 0,
    dy = 0,
    xdiff,
    xPercentage,
    ydiff,
    yPercentage;

  let w = { x: window.innerWidth, y: window.innerHeight };

  // Left (Rotates neck left between 0 and -degreeLimit)

  // 1. If cursor is in the left half of screen
  if (x <= w.x / 2) {
    // 2. Get the difference between middle of screen and cursor position
    xdiff = w.x / 2 - x;
    // 3. Find the percentage of that difference (percentage toward edge of screen)
    xPercentage = (xdiff / (w.x / 2)) * 100;
    // 4. Convert that to a percentage of the maximum rotation we allow for the neck
    dx = ((degreeLimit * xPercentage) / 100) * -1;
  }
  // Right (Rotates neck right between 0 and degreeLimit)
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = (degreeLimit * xPercentage) / 100;
  }
  // Up (Rotates neck up between 0 and -degreeLimit)
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    // Note that I cut degreeLimit in half when she looks up
    dy = ((degreeLimit * 0.5 * yPercentage) / 100) * -1;
  }

  // Down (Rotates neck down between 0 and degreeLimit)
  if (y >= w.y / 2) {
    ydiff = y - w.y / 2;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = (degreeLimit * yPercentage) / 100;
  }
  return { x: dx, y: dy };
}

function TorpedoComponent(props: any) {
  const mesh = useRef<THREE.Mesh>();

  const obj = useLoader(OBJLoader, "../assets/torpedo.obj");
  obj.scale.setScalar(0.002);

  obj.rotation.z = (3 * Math.PI) / 4;
  // console.log(obj.rotation.y);
  // obj.rotation.x = (3 * Math.PI) / 4;
  // obj.rotation.y = (3 * Math.PI) / 4;

  obj.position.set(0, 1, -3);

  obj.traverse((child) => {
    // @ts-ignore
    if (child.isMesh) {
      // @ts-ignore
      child.material = new MeshBasicMaterial({
        wireframe: true,
        color: 0xffffff,
      });
    }
  });

  useFrame((state, delta) => {
    if (mesh.current) {
      // if (mesh.current.rotation.y > Math.PI) {
      // mesh.current.rotation.y -= 0.005;
      // } else if (mesh.current.rotation.y < Math.PI) {
      mesh.current.rotation.y += 0.005;
      // }
    }
    // mesh.current?.rotateOnAxis();
  });
  return <primitive ref={mesh} object={obj} />;
}

export default function Torpedo() {
  // const onMouseMove = (e: any) => {
  //   if (mesh.current) {
  //     let degrees = getMouseDegrees(e.clientX, e.clientY, 10);
  //     mesh.current.rotation.x = MathUtils.degToRad(degrees.x);
  //     mesh.current.rotation.y = MathUtils.degToRad(degrees.y);
  //   }
  // };

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <TorpedoComponent />
    </Canvas>
  );
}
