import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { homeApi } from '../services/api'
import './Home.css'

function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await homeApi.get()
        setData(response.data)
      } catch (err) {
        setError('Failed to load homepage data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">{data?.title || 'Welcome to My Portfolio'}</h1>
        <h2 className="hero-subtitle">{data?.subtitle || 'Full Stack Developer'}</h2>
        <p className="hero-description">
          {data?.description || 'Building modern web applications with passion and precision.'}
        </p>
        <div className="hero-cta">
          <Link to="/about" className="btn btn-primary">
            About Me
          </Link>
          <a href="https://github.com/PatrickGHanna/Portfolio" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            View on Github
          </a>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>People Leadership</h3>
          <p>A focus on coaching, mentorship, and team building.</p>
        </div>
        <div className="feature-card">
          <h3>Cloud Solutions</h3>
          <p>Azure cloud infrastructure and deployment</p>
        </div>
        <div className="feature-card">
          <h3>Modern Technologies</h3>
          <p>Latest frameworks and best practices</p>
        </div>
      </section>
    </div>
  )
}

export default Home
