import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './emblaCarousel.css'
import Autoplay from 'embla-carousel-autoplay'
import AdsCard from '../adsCard/AdsCard'

export const EmblaCarousel = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true,direction:'rtl' }, [Autoplay()])
    
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide"><AdsCard /></div>
        <div className="embla__slide"><AdsCard /></div>
        <div className="embla__slide"><AdsCard /></div>
      </div>
    </div>
  )
}
