export default function Skills() {
  return (
    <div>
      <fieldset>
        <legend>Hard Skills</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
          {['HTML', 'CSS', 'Bootstrap', 'Java', 'Figma', 'JavaScript', 'React Native', 'Python', 'React', 'TypeScript', 'MySQL', 'PHP', 'JSON', 'Git', 'Laravel', 'Angular', 'Vue', 'Express', 'Canva'].map((skill) => (
            <button
              key={skill}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                margin: 0,
              }}
            >
              {skill}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset style={{ marginTop: '20px' }}>
        <legend>Soft Skills</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
          {['Comunicazione efficace', 'Gestione del tempo', 'Teamwork', 'Organizzazione', 'Problem solving', 'Adattabilità', 'Flessibilità'].map((skill) => (
            <button
              key={skill}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                margin: 0,
              }}
            >
              {skill}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

