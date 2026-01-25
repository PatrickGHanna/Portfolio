import { useEffect, useState } from 'react'
import { resumeApi } from '../services/api'
import './Resume.css'

function Resume() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await resumeApi.get()
        setData(response.data)
      } catch (err) {
        setError('Failed to load resume data')
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
    <div className="resume">
      <div className="resume-header">
        <h1>Resume</h1>
        <a href="/resume.pdf" className="btn-download" download>
          Download PDF
        </a>
      </div>

      {data?.summary && (
        <section className="resume-section">
          <h2>Summary</h2>
          <p>{data.summary}</p>
        </section>
      )}

      {data?.experience && data.experience.length > 0 && (
        <section className="resume-section">
          <h2>Experience</h2>
          <div className="timeline">
            {data.experience.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-content">
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                  <p className="timeline-date">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data?.education && data.education.length > 0 && (
        <section className="resume-section">
          <h2>Education</h2>
          <div className="education-list">
            {data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.degree}</h3>
                <h4>{edu.institution}</h4>
                <p className="education-date">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data?.certifications && data.certifications.length > 0 && (
        <section className="resume-section">
          <h2>Certifications</h2>
          <ul className="certifications-list">
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default Resume
