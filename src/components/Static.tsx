interface StaticProps {
}

export const Static: React.FC<StaticProps> = (props) => {
  return (
    <svg
      className="w-96 h-96"
      viewBox="0 0 200 200"
      xmlns='http://www.w3.org/2000/svg'>

      <filter id='noiseFilter'>
        <feTurbulence 
          type='fractalNoise' 
          baseFrequency='0.65' 
          numOctaves='3' 
          stitchTiles='stitch' />
      </filter>

      <rect
        width='100%' 
        height='100%' 
        filter='url(#noiseFilter)' />
    </svg>
  )
}
