'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { Container } from '../ui/Container'; // <-- KHÔNG CẦN IMPORT NỮA
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const banners = [
  { id: 1, imageUrl: '/banner-chinh.png', alt: 'Sale lớn', link: '/sale', },
  { id: 2, imageUrl: '/banner-mien-phi-vc.jpg', alt: 'Miễn phí vận chuyển', link: '/shipping', },
  { id: 3, imageUrl: '/banner-green-credit.png', alt: 'Green Credit', link: '/rewards', },
];

export default function HeroBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index) => { emblaApi && emblaApi.scrollTo(index); }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect); emblaApi.on('reInit', onSelect);
    return () => { emblaApi.off('select', onSelect); emblaApi.off('reInit', onSelect); };
  }, [emblaApi]);

  return (
    // Bỏ Container, để section chiếm full width
    <section className="w-full bg-white mb-4 shadow-sm">
      {/* Bỏ thẻ <Container> ở đây */}
        <div className="py-4"> {/* Giữ lại padding-top/bottom nếu muốn */}
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {banners.map((banner) => (
                <div className="embla__slide" key={banner.id}>
                  <Link href={banner.link} className="block aspect-[3/1]">
                    <Image src={banner.imageUrl} alt={banner.alt} fill style={{ objectFit: 'cover' }} priority={banner.id === 1} />
                  </Link>
                </div>
              ))}
            </div>
            <div className="embla__dots">
              {banners.map((_, index) => ( <button key={index} className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`} onClick={() => scrollTo(index)} /> ))}
            </div>
          </div>
        </div>
      {/* Bỏ thẻ đóng </Container> */}
    </section>
  );
}