import ResumeSection from '../ResumeSection'
import SkillCategory from './SkillCategory'
import '../../pages/Resume.css'

function TechnicalSkillsSection({ technicalSkills }) {
  if (!technicalSkills?.sections || technicalSkills.sections.length === 0) {
    return null
  }

  return (
    <ResumeSection title="Technical Skills">
      <div className="technical-skills">
        {technicalSkills.sections.map((section, index) => (
          <SkillCategory key={index} section={section} />
        ))}
      </div>
    </ResumeSection>
  )
}

export default TechnicalSkillsSection
