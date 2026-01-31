import ResumeSection from '../ResumeSection'
import '../../pages/Resume.css'

function CertificationsSection({ certifications }) {
  if (!certifications || certifications.length === 0) {
    return null
  }

  return (
    <ResumeSection title="Certifications">
      <ul className="certifications-list">
        {certifications.map((cert, index) => (
          <li key={index}>{cert}</li>
        ))}
      </ul>
    </ResumeSection>
  )
}

export default CertificationsSection
