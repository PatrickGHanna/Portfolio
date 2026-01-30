import ResumeSection from '../ResumeSection'
import CompetencyItem from './CompetencyItem'
import '../../pages/Resume.css'

function CoreCompetenciesSection({ coreCompetencies }) {
  if (!coreCompetencies || coreCompetencies.length === 0) {
    return null
  }

  return (
    <ResumeSection title="Core Competencies">
      <div className="competencies-grid">
        {coreCompetencies.map((comp, index) => (
          <CompetencyItem key={index} competency={comp} />
        ))}
      </div>
    </ResumeSection>
  )
}

export default CoreCompetenciesSection
