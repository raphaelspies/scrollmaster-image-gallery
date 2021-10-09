import React, { useRef, useEffect } from 'react'
import styles from '../styles/ScrollBox.module.css'
import Card from './Card'

export default function ScrollableList(props) {
  const { onScroll, endOfList, endOfListRef, images, view} = props;

  return (
    <div className={ view ? styles.column : styles.grid}>
      {images.map((image, index) => {
        if (index === images.length -1) {
          return (<Card key={image.id} info={image} endOfListRef={endOfListRef}/>)
        } else {
          return (<Card key={image.id} info={image} />)
        }
      })}
    </div>
  );

}