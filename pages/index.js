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
  //tracks whether reload after initial API request is complete
  const [initialLoad, setInitialLoad] = useState(false);
  //
  const [images, setImages] = useState([]);
  const [pagesRequested, setPagesRequested] = useState(1);

  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  function getImages(){
    console.log("pagesLoaded, pagesRequested: ", pagesLoaded, pagesRequested)
    console.log(unsplash)
    unsplash.search.getPhotos({
      query: "flowers",
      page: pagesRequested,
    })
    .then((res) => {
      console.log(res)
      // setImages(images.concat(res.response.results))
      setImages(prevImages => {
        return [...new Set([...prevImages, res.response.results[0]])]
      })
      setInitialLoad(true)
      setPagesLoaded(prevState => (prevState + 1))
      setIsUpdating(false)
      console.log("pagesLoaded, pagesRequested: ", pagesLoaded, pagesRequested)

    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleScroll = useCallback((event) => {
    let element = event.target;
    // console.log(`scrollTop+clientHeight+1: ${element.scrollTop + element.clientHeight + 1} \n scrollHeight: ${element.scrollHeight}`)
    if (Math.floor(element.scrollTop + element.clientHeight + 1) === element.scrollHeight && !isUpdating) {
      // setPagesRequested(prevState => (prevState + 1))
        setIsUpdating(true)
    }

  }, [pagesLoaded, pagesRequested]);

  useEffect(() => {
    getImages();
  }, [pagesRequested])

  if (!initialLoad) {
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
