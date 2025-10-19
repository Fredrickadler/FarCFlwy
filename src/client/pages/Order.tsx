import React from 'react'

export default function Order(){
  const [type, setType] = React.useState<'follow'|'like'>('follow')
  const [image, setImage] = React.useState('')
  const [name, setName] = React.useState('')
  const [coins, setCoins] = React.useState(10)

  const submit = async () => {
    const res = await fetch('/api/orders', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ type, image, name, coins })
    })
    if (res.ok) {
      alert('Order created')
      setImage(''); setName('')
    } else {
      alert('Error')
    }
  }

  return (
    <div>
      <header className="header">
        <img src="/logo.svg" className="logo" alt="logo" />
        <button className="wallet">Wallet</button>
      </header>

      <main>
        <h2>Create Order</h2>
        <div style={{display:'grid',gap:10}}>
          <label>
            Type:
            <select value={type} onChange={e=>setType(e.target.value as any)}>
              <option value="follow">Follow</option>
              <option value="like">Like</option>
            </select>
          </label>
          <label>
            Target image URL:
            <input value={image} onChange={e=>setImage(e.target.value)} placeholder="https://..." />
          </label>
          <label>
            Target name:
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="username or post excerpt" />
          </label>
          <label>
            Coins per action:
            <input type="number" value={coins} onChange={e=>setCoins(Number(e.target.value))} />
          </label>

          <button className="btn" onClick={submit}>Create Order</button>
        </div>
      </main>
    </div>
  )
}
