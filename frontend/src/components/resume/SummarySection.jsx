import ResumeSection from '../ResumeSection'

function SummarySection({ summary }) {
  if (!summary) {
    return null
  }

  return (
    <ResumeSection title="Summary">
      <p>{summary}</p>
    </ResumeSection>
  )
}

export default SummarySection
