import ResumeSection from '../ResumeSection'
import '../../pages/Resume.css'

function ContactInfo({ contact }) {
  if (!contact) {
    return null
  }

  return (
    <ResumeSection className="contact-info">
      <div className="contact-details">
        {contact.phone && <span>{contact.phone}</span>}
        {contact.email && (
          <span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </span>
        )}
        {contact.linkedIn && (
          <span>
            <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </span>
        )}
      </div>
    </ResumeSection>
  )
}

export default ContactInfo
