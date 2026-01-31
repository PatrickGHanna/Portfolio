import Card from '../Card'
import '../../pages/Resume.css'

function CompetencyItem({ competency }) {
  return (
    <Card className="competency-item">
      <h3>{competency.category}</h3>
      <ul className="competency-list">
        {competency.items.map((item, itemIndex) => (
          <li key={itemIndex}>{item}</li>
        ))}
      </ul>
    </Card>
  )
}

export default CompetencyItem
