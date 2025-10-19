import React from 'react'

export default function FloatingNav({route, setRoute, hidden}:{route:'home'|'order', setRoute: (r:'home'|'order')=>void, hidden?: boolean}) {
  return (
    <div className={"floating-nav " + (hidden ? 'hidden' : '')} role="navigation" aria-label="Main">
      <button aria-pressed={route==='home'} onClick={()=>setRoute('home')} className="nav-btn" title="Home">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      <button aria-pressed={route==='order'} onClick={()=>setRoute('order')} className="nav-btn" title="Order">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 7h18M7 11h10M9 15h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  )
}
