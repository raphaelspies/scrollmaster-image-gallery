import { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Card.module.css'
import { DateTime } from 'luxon';


export default function Card (props) {
 const [isModal, setIsModal] = useState(false)

 const openModal = function(e) {
  setIsModal(prevState => (!prevState))
}


 const {
  endOfListRef,
  info: {
    urls,
    description,
    alt_description,
    width,
    height,
    created_at,
    user: {
      name,
      bio,
      links: {
        portfolio,
      }
    }
  },
 } = props

 const CreationDate = DateTime.fromISO(created_at).toLocaleString();
  return (
    !isModal ? (
      <div ref={endOfListRef} className={styles.Card} onClick={openModal}>
        <Image
          src={urls.small}
          alt={alt_description}
          width={600}
          height={height / (width/600)}
        />
      </div>)
    : (
      <div ref={endOfListRef} className={styles.modal} onClick={openModal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHorizontal}>
          <Image
            src={urls.small}
            alt={alt_description}
            width={600}
            height={height / (width/600)}
          />
          <div className={styles.modalText}>
            <h2>{description? description: alt_description}</h2>
            <ul>
              <li><b> Author: </b> {name}</li>
              <li><b> Author Bio: </b> {bio}</li>
              <li><b> Date Created: </b> {CreationDate}</li>
            </ul>
          </div>
        </div>
        </div>
      </div>)
  )
}
