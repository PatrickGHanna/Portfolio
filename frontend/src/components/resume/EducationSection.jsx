import ResumeSection from '../ResumeSection'
import EducationItem from './EducationItem'
import '../../pages/Resume.css'

function EducationSection({ education }) {
  if (!education || education.length === 0) {
    return null
  }

  return (
    <ResumeSection title="Education">
      <div className="education-list">
        {education.map((edu, index) => (
          <EducationItem key={index} education={edu} />
        ))}
      </div>
    </ResumeSection>
  )
}

export default EducationSection
