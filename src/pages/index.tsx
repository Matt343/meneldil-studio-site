import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'

import Head from 'next/head'
import { Texturina } from 'next/font/google'
import { BloomFilter } from 'next/dist/shared/lib/bloom-filter'

const texturina = Texturina({ subsets: ['latin'] })

function Star(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  return (
    <mesh
      {...props}
      ref={ref}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
        <sphereGeometry args={[.02, 3, 2]} />
        <meshBasicMaterial color={hovered ? [5, 5, 5] : [4,4,4]} toneMapped={false} />
    </mesh>
  )
}

export default function Home() {
  const stars = [...Array(1000)]
  const scatterScale = 50
  return (
    <main className='h-screen w-full bg-black'>
      <Head>
        <title>Meneldil Studio</title>
        <meta name="description" content="Art, projects, and demos by Matt Allen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="canvas-container" className={`hero ${texturina.className} h-full w-full`}>
        <Canvas className='bg-black' linear>
          {stars.map((s, _) => <Star position={[
            Math.random() * scatterScale - (scatterScale / 2), 
            Math.random() * scatterScale - (scatterScale / 2), 
            Math.random() * scatterScale * -1.25
          ]}/>)}
          <EffectComposer>
            <Bloom luminanceThreshold={1} intensity={1} />
          </EffectComposer>
        </Canvas>
      </div>
    </main>
  )
}
