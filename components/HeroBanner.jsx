import React from 'react'
import Link from 'next/link'

import Image from 'next/image'
import { urlFor } from '../lib/client'

const HeroBanner = ({heroBanner: {smallText, midText, largeText1, image, product, buttonText, desc}}) => {
  return (
    <div className="hero-banner-container">
      <div>
         <p className="beats-solo">{smallText}</p>
         <h1>{midText}</h1>
         <h3>{largeText1}</h3>
         
      {/* <Image src={urlFor(image)} alt="headphones" className="hero-banner-image" /> */}
         <img src={urlFor(image)} alt="headphones" className="hero-banner-image" />
      </div>
      <div>
         <Link href={`/product/${product}`} passHref>
            <button type="button">{buttonText}</button>
         </Link>
         <div className="desc">
         <h5>Description</h5>
         <p>{desc}</p>
         </div>
      </div>
    </div>
  )
}

export default HeroBanner
