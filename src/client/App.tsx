import React from 'react'
import Home from './pages/Home'
import Order from './pages/Order'
import FloatingNav from './components/FloatingNav'
import PurpleBubbles from './components/PurpleBubbles'

export default function App() {
  const [route, setRoute] = React.useState<'home'|'order'>('home')
  const [hiddenNav, setHiddenNav] = React.useState(false)
  React.useEffect(()=>{
    let last = window.scrollY
    function onScroll(){
      const cur = window.scrollY
      if (cur > last && cur > 50) setHiddenNav(true)
      else setHiddenNav(false)
      last = cur
    }
    window.addEventListener('scroll', onScroll, {passive:true})
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])
  return (
    <div className='app'>
      <PurpleBubbles />
      {route === 'home' ? <Home /> : <Order />}
      <FloatingNav route={route} setRoute={setRoute} hidden={hiddenNav} />
    </div>
  )
}
