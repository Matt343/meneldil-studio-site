import React, { useState } from 'react'
import { generateSlug } from 'random-word-slugs';
import Head from 'next/head'
import { Texturina } from 'next/font/google'
import { Environment } from './components/Environment';

const texturina = Texturina({ subsets: ['latin'] })

export default function Home() {
  const [seed, setSeed] = useState(generateSlug())
  const noise = new Noise(Math.random())
  return (
    <main className='h-screen w-full bg-black'>
      <Head>
        <title>Meneldil Studio</title>
        <meta name="description" content="Art, projects, and demos by Matt Allen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="canvas-container" className={`hero ${texturina.className} h-full w-full z-20`}>
        <Environment noise={noise} />
      </div>
    </main>
  )
}
