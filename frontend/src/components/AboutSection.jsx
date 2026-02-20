import './AboutSection.css'

function AboutSection({ title, imageUrl, content, imageOnRight = false }) {
  const paragraphs = content
    ? content.split('\n').filter(p => p.trim()).map(p => p.trim())
    : []

  return (
    <section className={`about-section ${imageOnRight ? 'about-section--image-right' : ''}`}>
      <div className="about-section-content">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="about-section-image"
          />
        )}
        <div className="about-section-text">
          <h2>{title}</h2>
          {paragraphs.length > 0
            ? paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            : content && <p>{content}</p>}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
