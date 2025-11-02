import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Rewards.css'
import logoSrc from '../assets/focus-flow-logo.svg'

const baseRewards = [
  {
    id: 1,
    title: 'Power Walk',
    desc: 'Take a refreshing 30min walk outside',
    price: 100,
    icon: '🚶'
  },
  {
    id: 2,
    title: 'Netflix Episode',
    desc: 'Enjoy one episode of your favorite show',
    price: 50,
    icon: '🎬'
  },
  {
    id: 3,
    title: 'Snack Break',
    desc: 'Take a 15min break with your favorite snack',
    price: 50,
    icon: '🍿'
  },
  {
    id: 4,
    title: 'Doomscroll',
    desc: '30min of guilt-free social media browsing',
    price: 69,
    icon: '📱'
  },
  {
    id: 5,
    title: 'Coffee Break',
    desc: 'Recharge with a 15min coffee break',
    price: 50,
    icon: '☕'
  },
  {
    id: 6,
    title: 'Catch Up',
    desc: '1hr to call or hangout with a friend',
    price: 50,
    icon: '💬'
  }
]

// Repeat rewards to fill the grid
const rewardsData = [...Array(5)].flatMap(() => 
  baseRewards.map((reward, index) => ({
    ...reward,
    id: reward.id + (index * baseRewards.length)
  }))
).slice(0, 15) // Keep 15 items for 5x3 grid

export default function Rewards() {
  const [points, setPoints] = useState(0)
  const [loadingPoints, setLoadingPoints] = useState(true)

  useEffect(() => {
    // Try to load token from localStorage (returned by auth on login/register)
    const token = localStorage.getItem('token') || localStorage.getItem('authToken')

    if (!token) {
      // no token - user is anonymous, default points = 0
      setPoints(0)
      setLoadingPoints(false)
      return
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/v1/user', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const userPoints = res?.data?.user?.points ?? 0
        setPoints(userPoints)
      } catch (err) {
        // If fetch fails (unauthenticated, network), keep points at 0
        console.warn('Failed to load user points:', err?.message || err)
        setPoints(0)
      } finally {
        setLoadingPoints(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="rf-layout">
      <aside className="rf-sidebar">
        <div className="rf-logo">
          <img src={logoSrc} alt="Focus Flow" className="logo-img" />
        </div>
        <nav className="rf-nav">
          <a className="nav-item">Dashboard</a>
          <a className="nav-item">Tasks</a>
          <a className="nav-item active">Rewards</a>
        </nav>
        <div className="rf-spacer" />
        <div className="rf-footer-nav">
          <a className="nav-item">Settings</a>
          <a className="nav-item">Logout</a>
        </div>
      </aside>

      <main className="rf-main">
        <div className="rf-topbar">
          <h1>Rewards</h1>
          <div className="rf-points-pill">Available Points: <span>{loadingPoints ? '...' : points}</span></div>
        </div>

        <div className="rf-content">
          <section className="rf-grid">
            {rewardsData.map(r => (
              <article key={r.id} className="rf-card">
                <div className="card-top">
                  <div className="card-icon">{r.icon}</div>
                  <div className="card-title">{r.title}</div>
                </div>
                <div className="card-desc">{r.desc}</div>
                <div className="card-footer">
                  <div className="price">{r.price}</div>
                  <div className="points-icon">✨</div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}
