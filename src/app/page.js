'use client';
import Navbar from './components/EventHeader'
import Hero from './components/Hero'
import Info from './components/InfoDivs'
import SponsorsMarquee from './components/SponsorsMarquee'
import AnokhaMarquee from './components/AnokhaMarquee'
import Footer from './components/Footer'
import WebGLApp from './bg/WebGLApp'
import Lenis from '@studio-freight/lenis';
import { useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import projects from './info_data'


// Use GSAP ScrollTrigger and Locomotive Scroll

// Navbar. Let it remain thisway untill better one is designed. This is also mobile responsive, so dont touch yet
// Navbar modifcation - If logged in, then his gravatar image on top right. When clicked, dropdown to view profile, logout, else login button.
// Hero section - Anokha logo on bottom left, spline div on right, 3 sections of 2 words each on the bottom right
// Marquee of sponsors (Logos, will be added later)
// Info div, self scrolling like the one in video. Please create supporting components as needed
// Marquee of Anokha Hashtags
// FOoter - Design given



export default function Home() {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  const [webGLColors, setWebGLColors] = useState({ color1: [43 / 255, 30 / 255, 56 / 255], color2: [11 / 255, 38 / 255, 59 / 255], color3: [15 / 255, 21 / 255, 39 / 255] });

  const handleClick = () => {
    const randomColors = {
      color1: getRandomColorValue(),
      color2: getRandomColorValue(),
      color3: getRandomColorValue()
    };

    setWebGLColors(randomColors);
  };

  const getRandomColorValue = () => {
    return [Math.random(), Math.random(), Math.random()];
  };
  useEffect(() => {
  }, [webGLColors]);

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <button
        className="fixed right-4 bottom-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 z-10"
        onClick={handleClick}
      >
        Change Colors
      </button>
      <WebGLApp colors={webGLColors} />

      <Navbar />
      
      <Hero className='z-10' />
      <SponsorsMarquee /> 
      {
        projects.map((project, i) => {
          const targetScale = 1 - ((projects.length - i) * 0.05);
          return <Info key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale} />
        })
      }
      <AnokhaMarquee />
      <Footer current_page="home" /> {/* current_page is a prop that is used to highlight the current page in the footer. Possible values are home, team, contact, privacy policy} */}


    </main>
  )
}