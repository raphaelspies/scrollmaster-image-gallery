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
  const [pageNo, setPageNo] = useState(1)
  const [pagesLoaded, setPagesLoaded] = useState(0)

  function getImages(){
    console.log(pageNo)
    unsplash.search.getPhotos({
      query: "cat",
      page: pageNo,
    })
    .then((res) => {
      console.log(res)
      setImages(images.concat(res.response.results))
      setIsLoaded(true)
      setPagesLoaded(pagesLoaded + 1)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleScroll = useCallback((event) => {
    let element = event.target;
    // console.log(`scrollTop+clientHeight+1: ${element.scrollTop + element.clientHeight + 1} \n scrollHeight: ${element.scrollHeight}`)
    if (element.scrollTop + element.clientHeight + 1 >= element.scrollHeight) {
      if (pagesLoaded != pageNo){
        setPageNo(pageNo + 1)
        console.log("pagesLoaded, pageNo: ", pagesLoaded, pageNo)
      }
    }

  }, [pagesLoaded, pageNo]);

  useEffect(() => {
    getImages();
  }, [pageNo])

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
