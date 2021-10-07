import React, { useRef, useEffect } from 'react'
import styles from '../styles/ScrollBox.module.css'
import Card from './Card'

export default function ScrollableList(props) {
  const { itemsFromServer, onScroll } = props;

  const ref = useRef();

  useEffect(() => {
    const div = ref.current;
    if (div) {
      div.addEventListener("scroll", onScroll);
    }
  }, [onScroll]);

  return (
    <div className={styles.ScrollBox} ref={ref}>
      {props.images.map((image) => (
              <Card
                key={image.id}
                info={image}
              />
          ))}
    </div>
  );

}