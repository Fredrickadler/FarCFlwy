import React from 'react'

export default function TaskCard({task, onAction}:{task:any, onAction:(a:'skip'|'follow'|'like')=>void}){
  return (
    <div className="task-card" style={{marginBottom:24}}>
      <img className="task-image" src={task.image} alt={task.name} />
      <div className="gradient-banner">
        <div className="task-title">{task.name}</div>
        <div className="task-sub">{task.bio ?? task.excerpt}</div>
      </div>

      <div className="actions">
        <button className="btn" onClick={()=>onAction(task.type==='follow'?'follow':'like')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden style={{marginRight:6}}><path d={task.type==='follow'?"M16 11c1.657 0 3-1.343 3-3S17.657 5 16 5s-3 1.343-3 3 1.343 3 3 3zM6 20c0-3.314 2.686-6 6-6s6 2.686 6 6":"M12 21l-1-7 6-5-7 12z"} stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {task.type==='follow'?'Follow':'Like'}
        </button>
      </div>

      <div className="coin-box">
        <div style={{fontWeight:800}}>{task.coins} ✨</div>
        <button className="skip" onClick={()=>onAction('skip')}>Skip</button>
      </div>

    </div>
  )
}
