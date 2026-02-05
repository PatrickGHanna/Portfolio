import ResumeSection from '../ResumeSection'

function SummarySection({ summary }) {
  if (!summary) {
    return null
  }

  return (
    <ResumeSection title="Software Engineering Manager">
      <p>{summary}</p>
    </ResumeSection>
  )
}

export default SummarySection
