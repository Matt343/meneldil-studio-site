import * as THREE from 'three'
import React, { FunctionComponent, useMemo, useRef, useState } from 'react'
import { CameraControls, Stars, Sparkles } from "@react-three/drei";
import { Canvas, ThreeElements } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import { Noise }  from 'noisejs'

interface SkyProps {
    starCount?: number;
    noise: Noise;
    starDistance?: number;
  }
  
  const Sky: FunctionComponent<SkyProps> = ({starCount = 5000, starDistance = 100}) => {
    return (
      <Stars radius={starDistance} depth={50} count={starCount} factor={8} saturation={1} fade={false} speed={0} />
    )
  }
  
  interface GroundProps {
    noise: Noise;
    width?: number;
    resolution?: number;
    height?: number;
    scale?: number
  }
  
  const Ground: FunctionComponent<GroundProps> = ({noise, width = 1000, resolution = 128, height = 20, scale = .01}) => {
    const groundGeo = useMemo(() => {
      const geo = new THREE.PlaneGeometry(width, width, resolution, resolution)
      const position = geo.attributes.position as THREE.BufferAttribute
      position.usage = THREE.DynamicDrawUsage;
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i) * scale
        const y = position.getY(i) * scale
        const h = noise.perlin2(x, y)
        position.setZ(i, h * height);
      }
      position.needsUpdate = true
      geo.computeVertexNormals()
      return geo
    }, [width, resolution])
    return (
      <mesh position={[0,-10,0]} rotation={new THREE.Euler(-Math.PI / 2, 0, 0)} geometry={groundGeo}>
        <meshPhysicalMaterial color={0x33aa33} roughness={.9}/>
      </mesh>
    )
  }

  export function Environment({noise}: {noise: Noise}) {
    return (
    <Canvas className='bg-black'>
          <pointLight position={[0, 1, 0]} intensity={1} distance={100}/>
          <Ground noise={noise} width={1000} resolution={256}></Ground>
          <Sky noise={noise}></Sky>
          {/* <Sparkles></Sparkles> */}
          <CameraControls />
          <EffectComposer>
            <Bloom luminanceThreshold={1} intensity={1} />
          </EffectComposer>
        </Canvas>
    )
  }