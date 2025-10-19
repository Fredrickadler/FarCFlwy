import { Hono } from 'hono'
import { cors } from 'hono/cors'
import fs from 'fs'
import path from 'path'

const app = new Hono()
app.use('*', cors())

// simple JSON store file
const DB_FILE = path.join(process.cwd(), 'server', 'db.json')
function readDB(){
  try {
    const s = fs.readFileSync(DB_FILE, 'utf-8')
    return JSON.parse(s)
  } catch {
    return { orders: [], tasks: [], users: {} }
  }
}
function writeDB(db:any){
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8')
}

// seed with a sample task if empty
const db = readDB()
if (db.tasks.length === 0){
  db.tasks.push({
    id: 'task-1',
    type: 'follow',
    image: 'https://picsum.photos/600/400?random=1',
    name: 'alice.farcaster',
    bio: 'Creator & builder',
    coins: 5
  })
  db.tasks.push({
    id: 'task-2',
    type: 'like',
    image: 'https://picsum.photos/600/400?random=2',
    name: 'Post excerpt: Amazing sunset',
    excerpt: 'Amazing sunset at the bay',
    coins: 3
  })
  writeDB(db)
}

app.get('/api/next-task', async (c) => {
  const db = readDB()
  // return first task
  const task = db.tasks.shift() ?? null
  writeDB(db)
  return c.json({ task })
})

app.post('/api/frame-action', async (c) => {
  const body = await c.req.json()
  // body: { action: 'follow'|'like'|'skip', taskId }
  const { action, taskId } = body
  const db = readDB()
  // simple processing: credit coins to a demo user
  if (action === 'skip') {
    return c.json({ success: true })
  }
  // find order or task by id (not strict here)
  // in real app verify via Farcaster trustedData
  const awarded = 5
  db.users['demo'] = db.users['demo'] || { coins: 0 }
  db.users['demo'].coins += awarded
  writeDB(db)
  return c.json({ success: true, awarded })
})

app.post('/api/orders', async (c) => {
  const body = await c.req.json()
  const { type, image, name, coins } = body
  const db = readDB()
  const order = { id: 'order-' + (db.orders.length+1), type, image, name, coins, createdAt: Date.now() }
  db.orders.push(order)
  // also add tasks based on order for demo
  db.tasks.push({ id: 'task-' + (Math.random()*100000|0), type, image: image || 'https://picsum.photos/600/400', name, coins })
  writeDB(db)
  return c.json({ ok: true, order })
})

app.get('/api/orders', async (c) => {
  const db = readDB()
  return c.json({ orders: db.orders })
})

app.get('/', (c) => c.text('Farcaster Frame API - MVP'))

app.fire()
