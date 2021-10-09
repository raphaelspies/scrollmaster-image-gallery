import React, { useRef, useEffect } from 'react'
import styles from '../styles/ScrollBox.module.css'
import Card from './Card'

export default function ScrollBox(props) {
  const { onScroll, endOfList, endOfListRef, images, view} = props;

  return (
    <div>
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.closeModal}>
          <p>text here</p>
        </span>
      </div>
    </div>
    <div className={ view ? styles.column : styles.grid}>
      {images.map((image, index) => {
        if (index === images.length -1) {
          return (<Card key={image.id} info={image} endOfListRef={endOfListRef}/>)
        } else {
          return (<Card key={image.id} info={image} />)
        }
      })}
    </div>
    </div>
  );

}