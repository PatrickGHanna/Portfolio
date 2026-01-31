import Card from '../Card'
import '../../pages/Resume.css'

function EducationItem({ education }) {
  return (
    <Card className="education-item">
      <h3>{education.degree}</h3>
      <h4>{education.institution}</h4>
      <p className="education-date">{education.graduationDate}</p>
    </Card>
  )
}

export default EducationItem
