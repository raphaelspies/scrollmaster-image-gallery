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
  //     let element = event.target
  //     if (element.scrollHeight - element.scrollTop === element.clientHeight) {
  //       // do something at end of scroll
  //       console.log('end!')
  //     }
  // }

  const handleScroll = useCallback((event) => {
    let element = event.target;
    // console.log(`scrollHeight: ${element.scrollHeight}\n scrollTop: ${element.scrollTop} \n clientHeight: ${element.clientHeight}`)
    console.log(`scrollTop+clientHeight+1: ${element.scrollTop + element.clientHeight + 1} \n scrollHeight: ${element.scrollHeight}`)
    // if (element.scrollHeight - element.scrollTop + 10 >= element.clientHeight) {
    if (element.scrollTop + element.clientHeight + 1 >= element.scrollHeight) {
      alert("end")
    }

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
