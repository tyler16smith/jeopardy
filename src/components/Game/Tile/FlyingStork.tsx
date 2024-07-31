import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const FlyingStork = () => {
  const [position, setPosition] = useState(0)
  const [top, setTop] = useState(50)

  useEffect(() => {
    const animate = () => {
      setPosition((prevPosition) => {
        if (prevPosition > window.innerWidth) {
          setTop(Math.random() * (window.innerHeight - 200)) // Random height between 0 and window height minus image height
          return -200
        }
        return prevPosition + 5
      })
    }
    const interval = setInterval(animate, 20)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='absolute' style={{ left: position, top }}>
      <Image
        src='/data/stork.png'
        alt='Flying Stork'
        width={200}
        height={200}
      />
    </div>
  )
}

export default FlyingStork
