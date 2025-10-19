import React from 'react'
import TaskCard from '../components/TaskCard'

type Task = {
  id: string
  type: 'follow'|'like'
  image: string
  name: string
  bio?: string
  excerpt?: string
  coins: number
}

export default function Home(){
  const [task, setTask] = React.useState<Task | null>(null)
  const [loading, setLoading] = React.useState(false)

  const fetchNext = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/next-task')
      if (res.ok){
        const data = await res.json()
        setTask(data.task ?? null)
      }
    } finally { setLoading(false) }
  }

  React.useEffect(()=>{ fetchNext() }, [])

  const handleAction = async (action: 'skip'|'follow'|'like')=>{
    if (!task) return
    const res = await fetch('/api/frame-action', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({ action, taskId: task.id })
    })
    if (res.ok){
      const j = await res.json()
      if (j.success){
        // credit simulated - fetch next
        fetchNext()
      } else {
        alert('Action failed')
      }
    }
  }

  return (
    <div>
      <header className="header">
        <img src="/logo.svg" className="logo" alt="logo" />
        <button className="wallet">Wallet</button>
      </header>

      <main>
        <div style={{maxWidth:640,margin:'0 auto'}}>
          {loading && <p>Loading...</p>}
          {task ? <TaskCard task={task} onAction={handleAction} /> : <p style={{textAlign:'center',opacity:0.7}}>No tasks available — create an order</p>}
        </div>
      </main>
    </div>
  )
}
