import { useEffect, useState } from 'react'
import { resumeApi } from '../services/api'
import ContactInfo from '../components/resume/ContactInfo'
import SummarySection from '../components/resume/SummarySection'
import CoreCompetenciesSection from '../components/resume/CoreCompetenciesSection'
import TechnicalSkillsSection from '../components/resume/TechnicalSkillsSection'
import ProfessionalExperienceSection from '../components/resume/ProfessionalExperienceSection'
import EducationSection from '../components/resume/EducationSection'
import CertificationsSection from '../components/resume/CertificationsSection'
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

      <ContactInfo contact={data?.contact} />

      <SummarySection summary={data?.summary} />

      <CoreCompetenciesSection coreCompetencies={data?.coreCompetencies} />

      <TechnicalSkillsSection technicalSkills={data?.technicalSkills} />

      <ProfessionalExperienceSection experience={data?.experience} />

      <EducationSection education={data?.education} />

      <CertificationsSection certifications={data?.certifications} />
    </div>
  )
}

export default Resume
