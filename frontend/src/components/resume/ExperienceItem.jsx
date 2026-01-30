import '../../pages/Resume.css'

function ExperienceItem({ experience }) {
  return (
    <div className="timeline-item">
      <div className="timeline-content">
        <h3>{experience.position}</h3>
        <h4>{experience.company}</h4>
        <p className="timeline-date">
          {experience.startDate} - {experience.endDate}
        </p>
        <p className="timeline-description">{experience.description}</p>
        {experience.achievements && experience.achievements.length > 0 && (
          <ul className="achievements-list">
            {experience.achievements.map((achievement, achIndex) => (
              <li key={achIndex}>
                {achievement.text || achievement}
                {achievement.subAchievements && achievement.subAchievements.length > 0 && (
                  <ul className="sub-achievements-list">
                    {achievement.subAchievements.map((subAchievement, subIndex) => (
                      <li key={subIndex}>{subAchievement}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ExperienceItem
