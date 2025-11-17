import { useState, useEffect } from 'react'

export default function About() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ padding: windowWidth <= 480 ? '15px' : '20px' }}>
      <h2 style={{ marginTop: 0, fontSize: windowWidth <= 480 ? '16px' : '18px' }}>Presentazione</h2>
      <div style={{ lineHeight: '1.7', textAlign: 'justify', fontSize: windowWidth <= 480 ? '12px' : '13px' }}>
        <p>
          Ragazzo che ha cominciato da autodidatta con una solida esperienza nello sviluppo web e nella programmazione. 
          Attualmente studente presso ITS Academy APULIA DIGITAL, alla ricerca di esperienza lavorativa.
        </p>
        <p>
          La mia passione per l'innovazione digitale mi ha spinto a esplorare costantemente nuove sfide nel campo tecnologico, 
          e sono sempre alla ricerca di opportunità che mi consentano di ampliare le mie conoscenze e competenze.
        </p>
      </div>
      <fieldset style={{ marginTop: windowWidth <= 480 ? '15px' : '20px' }}>
        <legend style={{ fontSize: windowWidth <= 480 ? '12px' : '14px' }}>Informazioni</legend>
        <p style={{ margin: '10px 0', fontSize: windowWidth <= 480 ? '12px' : '13px' }}>
          <strong>Lingue:</strong> Italiano (madrelingua), Inglese (B2)
        </p>
      </fieldset>
    </div>
  )
}

