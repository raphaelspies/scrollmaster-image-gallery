import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../styles/ScrollBox.module.css'

import ScrollBox from '../components/ScrollBox'
import Card from '../components/Card'
import React, { useState, useEffect } from 'react'
import { createApi } from 'unsplash-js';

const unsplash = createApi({accessKey: process.env.API_KEY});

export default function Home() {
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function getImages(){
    console.log(process.env.API_KEY)
    unsplash.search.getPhotos({
      query: "cat",
    })
    .then((res) => {
      console.log(res)
      setImages(res.response.results)
      setIsLoaded(true)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getImages();
  }, [])

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
      <div className={styles.ScrollBox}>
      {!isLoaded
        ? "Loading ..."
        : images.map((image) => (
            <Card
              key={image.id}
              info={image}
            />
        ))
      }
    </div>

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
