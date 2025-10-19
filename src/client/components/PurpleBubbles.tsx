import React from 'react'

function random(min:number, max:number){ return Math.random()*(max-min)+min }

export default function PurpleBubbles(){
  const bubbles = React.useMemo(()=>{
    const arr = []
    for (let i=0;i<8;i++){
      const size = Math.random()
      arr.push({
        left: Math.floor(random(4,96)),
        delay: +(random(0,6)).toFixed(2),
        duration: +(random(8,18)).toFixed(2),
        size: size>0.66 ? 'large' : size>0.33 ? 'medium' : 'small',
        opacity: +(random(0.06,0.18)).toFixed(3)
      })
    }
    return arr
  },[])
  return (
    <>
      {bubbles.map((b, i)=>(
        <span key={i}
          className={'purple-bubble '+b.size}
          style={{
            left: b.left + '%',
            animationDuration: b.duration + 's',
            animationDelay: b.delay + 's',
            opacity: b.opacity,
            background: 'radial-gradient(circle at 30% 30%, rgba(124,58,237,0.95), rgba(124,58,237,0.6))'
          }} />
      ))}
    </>
  )
}
