import { useEffect, useState } from 'react'
import { aboutApi } from '../services/api'
import './About.css'

function About() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await aboutApi.get()
        setData(response.data)
      } catch (err) {
        setError('Failed to load about data')
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
    <div className="about">
      <div className="about-header">
        <h1>About Me</h1>
      </div>

      <div className="about-content">
        <div className="about-main">
          <div className="about-header-section">
            {data?.imageUrl && (
              <img 
                src={data.imageUrl} 
                alt={data?.name || 'Profile'} 
                className="profile-picture"
              />
            )}
            <div className="about-name-title">
              <h2>{data?.name || 'Your Name'}</h2>
              <h3 className="about-title">{data?.title || 'Full Stack Developer'}</h3>
            </div>
          </div>
          <p className="about-bio">{data?.bio || 'Bio information goes here.'}</p>

          <div className="about-skills">
            <h3>Skills</h3>
            <div className="skills-grid">
              {data?.skills?.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              )) || (
                <>
                  <span className="skill-tag">.NET Core</span>
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Node.js</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="about-sidebar">
          <div className="contact-info">
            <h3>Contact</h3>
            {data?.location && (
              <p>
                <strong>Location:</strong> {data.location}
              </p>
            )}
            {data?.email && (
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${data.email}`}>{data.email}</a>
              </p>
            )}
            {data?.linkedIn && (
              <p>
                <strong>LinkedIn:</strong>{' '}
                <a href={data.linkedIn} target="_blank" rel="noopener noreferrer">
                  View Profile
                </a>
              </p>
            )}
            {data?.github && (
              <p>
                <strong>GitHub:</strong>{' '}
                <a href={data.github} target="_blank" rel="noopener noreferrer">
                  View Profile
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
