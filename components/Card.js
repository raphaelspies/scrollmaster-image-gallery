import Image from 'next/image'

export default function Card (props) {
//  const {
//   alt,
//   urls,
//   height,
//   width,

//  } = props.info

  return (
    <div>
       {/* note: using img ILO Image since Image cannot support dynamic assets */}
      <img
        src={props.info.urls.small}
        alt={props.info.alt_description}
        layout="fill"
      />
    </div>
  )
}
