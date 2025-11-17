export default function Certifications() {
  const certifications = [
    { name: 'Cybersecurity Essential', issuer: 'Cisco', date: '06/01/2022' },
    { name: 'Wordpress Development', issuer: 'Programming Hub', date: '18/12/2023' },
    { name: 'SEO', issuer: 'Programming Hub', date: '23/11/2023' },
    { name: 'JavaScript', issuer: 'Programming Hub', date: '26/11/2023' },
    { name: 'HTML', issuer: 'Programming Hub', date: '21/11/2023' },
    { name: 'CSS', issuer: 'Programming Hub', date: '21/11/2023' },
    { name: 'Web Development Professional Certification', issuer: 'Institute of Management, Technology & Finance', date: '06/02/2024' },
    { name: 'Python Development Professional Certification', issuer: 'Institute of Management, Technology & Finance', date: '30/01/2024' },
  ]

  return (
    <div>
      <fieldset>
        <legend>Certificazioni</legend>
        {certifications.map((cert, index) => (
          <div key={index} style={{ marginBottom: index < certifications.length - 1 ? '16px' : '0', paddingBottom: index < certifications.length - 1 ? '16px' : '0', borderBottom: index < certifications.length - 1 ? '1px solid #c0c0c0' : 'none' }}>
            <p style={{ margin: '6px 0', fontWeight: 'bold', fontSize: '13px' }}>{cert.name}</p>
            <p style={{ margin: '4px 0', fontSize: '12px', color: '#666' }}>{cert.issuer}</p>
            <p style={{ margin: '4px 0', fontSize: '12px', color: '#666' }}>{cert.date}</p>
          </div>
        ))}
      </fieldset>
      <fieldset style={{ marginTop: '20px' }}>
        <legend>Patente di guida</legend>
        <p style={{ margin: '6px 0', fontSize: '13px' }}>
          Categoria B (19/02/2024 – 19/11/2034)
        </p>
      </fieldset>
    </div>
  )
}

