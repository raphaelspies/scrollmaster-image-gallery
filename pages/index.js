import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../styles/ScrollBox.module.css'

import ScrollBox from '../components/ScrollBox'
import Card from '../components/Card'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createApi } from 'unsplash-js';

const unsplash = createApi({accessKey: process.env.API_KEY});

export default function Home() {
  const [initialLoad, setInitialLoad] = useState(false);
  const [images, setImages] = useState([]);
  const [pagesRequested, setPagesRequested] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [view, setView] = useState(true);

  function getImages(){
    console.log(unsplash)
    unsplash.search.getPhotos({
      query: "flowers",
      page: pagesRequested,
    })
    .then((res) => {
      console.log(res)
      setImages(prevImages => {
        return [...new Set([...prevImages, ...res.response.results])]
      })
      setInitialLoad(true)
      setIsUpdating(false)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const observer = useRef();
  const endOfListRef = useCallback(node => {
    if (isUpdating) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(listEntries => {
      if (listEntries[0].isIntersecting) {
        setPagesRequested(prevState => (prevState + 1))
      }
    })
    if (node) observer.current.observe(node)
  }, [isUpdating])

  const changeView = function(e) {
    setView(prevState => (!prevState))
    console.log(view)
  }

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
          <button onClick={changeView}>Change View</button>
        </h1>
        <ScrollBox
          images={images}
          endOfListRef={endOfListRef}
          view={view}
        />
      </main>
    </div>
  )
}
