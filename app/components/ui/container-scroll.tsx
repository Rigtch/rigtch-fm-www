'use client'

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useState, useRef, type ReactNode } from 'react'

namespace ContainerScroll {
  export type Props = Readonly<{
    titleComponent: string | ReactNode
    children: ReactNode
  }>
}

function ContainerScroll({ titleComponent, children }: ContainerScroll.Props) {
  const containerReference = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerReference,
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1])

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      className="relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20"
      ref={containerReference}
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{
          perspective: '1000px',
        }}
      >
        <ContainerScrollHeader
          translate={translate}
          titleComponent={titleComponent}
        />
        <ContainerScrollCard
          rotate={rotate}
          translate={translate}
          scale={scale}
        >
          {children}
        </ContainerScrollCard>
      </div>
    </div>
  )
}

namespace ContainerScrollHeader {
  export type Props = Readonly<{
    titleComponent: string | ReactNode
    translate: MotionValue<number>
  }>
}

function ContainerScrollHeader({
  translate,
  titleComponent,
}: ContainerScrollHeader.Props) {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

namespace ContainerScrollCard {
  export type Props = Readonly<{
    rotate: MotionValue<number>
    scale: MotionValue<number>
    translate: MotionValue<number>
    children: ReactNode
  }>
}

function ContainerScrollCard({
  rotate,
  scale,
  children,
}: ContainerScrollCard.Props) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="mx-auto -mt-12 h-fit w-fit max-w-5xl rounded-[16px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:p-2"
    >
      <div className="h-fit w-fit overflow-hidden rounded-[10px] bg-gray-100 dark:bg-zinc-900">
        {children}
      </div>
    </motion.div>
  )
}

export { ContainerScroll, ContainerScrollCard, ContainerScrollHeader }
