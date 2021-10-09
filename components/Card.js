import Image from 'next/image'
import styles from '../styles/Card.module.css'

export default function Card (props) {
 const {
  endOfListRef,
  info: {
    urls,
    alt_description,
    width,
    height
  },
 } = props

  return (
    <div ref={endOfListRef} className={styles.Card}>
      <Image
        src={urls.small}
        alt={alt_description}
        width={600}
        height={height / (width/600)}
      />
    </div>
  )
}
