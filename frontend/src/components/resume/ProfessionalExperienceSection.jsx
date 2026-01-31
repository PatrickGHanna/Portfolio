import ResumeSection from '../ResumeSection'
import ExperienceItem from './ExperienceItem'
import '../../pages/Resume.css'

function ProfessionalExperienceSection({ experience }) {
  if (!experience || experience.length === 0) {
    return null
  }

  return (
    <ResumeSection title="Professional Experience">
      <div className="timeline">
        {experience.map((exp, index) => (
          <ExperienceItem key={index} experience={exp} />
        ))}
      </div>
    </ResumeSection>
  )
}

export default ProfessionalExperienceSection
