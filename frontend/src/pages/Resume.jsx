import { useEffect, useState } from 'react'
import { resumeApi } from '../services/api'
import ResumeSection from '../components/ResumeSection'
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

      {data?.contact && (
        <ResumeSection className="contact-info">
          <div className="contact-details">
            {data.contact.phone && <span>{data.contact.phone}</span>}
            {data.contact.email && (
              <span>
                <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
              </span>
            )}
            {data.contact.linkedIn && <span>{data.contact.linkedIn}</span>}
          </div>
        </ResumeSection>
      )}

      {data?.summary && (
        <ResumeSection title="Summary">
          <p>{data.summary}</p>
        </ResumeSection>
      )}

      {data?.coreCompetencies && data.coreCompetencies.length > 0 && (
        <ResumeSection title="Core Competencies">
          <div className="competencies-grid">
            {data.coreCompetencies.map((comp, index) => (
              <div key={index} className="competency-item">
                <h3>{comp.category}</h3>
                <ul className="competency-list">
                  {comp.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {data?.technicalSkills && data.technicalSkills.sections && data.technicalSkills.sections.length > 0 && (
        <ResumeSection title="Technical Skills">
          <div className="technical-skills">
            {data.technicalSkills.sections.map((section, index) => (
              <div key={index} className="skill-category">
                <h3>{section.name}</h3>
                <div className="skill-tags">
                  {section.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {data?.experience && data.experience.length > 0 && (
        <ResumeSection title="Professional Experience">
          <div className="timeline">
            {data.experience.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-content">
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                  <p className="timeline-date">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="timeline-description">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="achievements-list">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>
                          {achievement.text || achievement}
                          {achievement.subAchievements && achievement.subAchievements.length > 0 && (
                            <ul className="sub-achievements-list">
                              {achievement.subAchievements.map((subAchievement, subIndex) => (
                                <li key={subIndex}>{subAchievement}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {data?.education && data.education.length > 0 && (
        <ResumeSection title="Education">
          <div className="education-list">
            {data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.degree}</h3>
                <h4>{edu.institution}</h4>
                <p className="education-date">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {data?.certifications && data.certifications.length > 0 && (
        <ResumeSection title="Certifications">
          <ul className="certifications-list">
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </ResumeSection>
      )}
    </div>
  )
}

export default Resume
