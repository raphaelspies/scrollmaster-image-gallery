import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ScrollBox from './ScrollBox'
import React, { useState, useEffect } from 'react'
import { createApi } from 'unsplash-js';

const unsplash = createApi({accessKey: process.env.API_KEY});

export default function Home() {
  const [images, setImages] = useState([]);

  function getImages(){
    console.log(process.env.API_KEY)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>ScrollMaster: The Infinite Scroll Machine</title>
        <meta name="description" content="now you can scroll images forever!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to ScrollMaster!
        </h1>
      <ScrollBox />
      <button onClick={getImages}>Get Images</button>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
