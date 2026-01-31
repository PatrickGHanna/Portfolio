import Card from '../Card'
import '../../pages/Resume.css'

function SkillCategory({ section }) {
  return (
    <Card className="skill-category">
      <h3>{section.name}</h3>
      <div className="skill-tags">
        {section.skills.map((skill, skillIndex) => (
          <span key={skillIndex} className="skill-tag">{skill}</span>
        ))}
      </div>
    </Card>
  )
}

export default SkillCategory
