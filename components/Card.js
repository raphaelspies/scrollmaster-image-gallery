import Image from 'next/image'

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
    <div ref={endOfListRef}>
      <Image
        src={urls.small}
        alt={alt_description}
        width={width/8}
        height={height/8}
      />
    </div>
  )
}
