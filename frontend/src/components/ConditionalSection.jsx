import ResumeSection from './ResumeSection'

function ConditionalSection({ condition, title, children, className = '' }) {
  if (!condition) {
    return null
  }

  return (
    <ResumeSection title={title} className={className}>
      {children}
    </ResumeSection>
  )
}

export default ConditionalSection
