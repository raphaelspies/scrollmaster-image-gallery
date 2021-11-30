import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import ScrollBox from '../components/ScrollBox'
import Card from '../components/Card'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createApi } from 'unsplash-js';

// const unsplash = createApi({accessKey: process.env.API_KEY});
const unsplash = createApi({accessKey: process.env.NEXT_PUBLIC_API_KEY});

export default function Home() {
  const [initialLoad, setInitialLoad] = useState(false);
  const [images, setImages] = useState([]);
  const [pagesRequested, setPagesRequested] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [view, setView] = useState(true);
  const [query, setQuery] = useState("cats")

  function getImages(){
    unsplash.search.getPhotos({
      query,
      page: pagesRequested,
    })
    .then((res) => {
      setImages(prevImages => {
        return [...new Set([...prevImages, ...res.response.results])]
      })
      setInitialLoad(true)
      setIsUpdating(false)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const enterQuery = function(e) {
    setQuery(e.target.value)
    e.preventDefault()
  }

  const observer = useRef();
  const endOfListRef = useCallback(node => {
    if (isUpdating) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPagesRequested(prevState => (prevState + 1))
      }
    })
    if (node) observer.current.observe(node)
  }, [isUpdating])

  const changeView = function(e) {
    setView(prevState => (!prevState))
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
        <meta name="ScrollMaster by Raphael Spies" content="now you can scroll images forever!" />
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>
          <p className={styles.text}> Welcome to ScrollMaster! </p>
          <h3>By <a href="https://github.com/raphaelspies">Raphael Spies</a></h3>
          <form>
            <label htmlFor="query">Next, I want to see images of: &nbsp;</label>
            <input id="query" type="text" onChange={enterQuery} value={query}></input>

          </form>
          <button className={styles.button} onClick={changeView}>Change View</button>
        </div>
        <ScrollBox
          images={images}
          endOfListRef={endOfListRef}
          view={view}
        />
      </main>
    </div>
  )
}
