import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../styles/ScrollBox.module.css'

import ScrollBox from '../components/ScrollBox'
import Card from '../components/Card'
import React, { useState, useEffect, useCallback } from 'react'
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

  // function handleScroll(event) {
  //   console.log(`Height: ${event.target.scrollHeight}\n ${event.target.scrollTop}`)
  //     let element = event.target
  //     if (element.scrollHeight - element.scrollTop === element.clientHeight) {
  //       // do something at end of scroll
  //       console.log('end!')
  //     }
  // }

  const handleScroll = useCallback(() => {
    console.log("scrolling");
  }, []);

  useEffect(() => {
    getImages();
  }, [])

  if (!isLoaded) {
    return (<div>Loading...</div>)
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

        <ScrollBox images={images} onScroll={handleScroll}/>

      </main>
    </div>
  )
}
