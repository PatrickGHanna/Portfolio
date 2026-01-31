import './ResumeSection.css'

function ResumeSection({ title, children, className = '' }) {
  return (
    <section className={`resume-section ${className}`.trim()}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  )
}

export default ResumeSection
