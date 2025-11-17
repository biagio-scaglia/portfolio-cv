import { useState, useEffect } from 'react'

interface WelcomeModalProps {
  onClose: () => void
  userName?: string
}

export default function WelcomeModal({ onClose, userName = 'Guest' }: WelcomeModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Benvenuto nel mio Portfolio',
      content: (
        <>
          <h2 style={{ marginTop: 0, fontSize: 'clamp(16px, 4vw, 18px)', marginBottom: '16px' }}>
            Ciao, {userName}! 👋
          </h2>
          <div style={{ lineHeight: '1.7', fontSize: 'clamp(12px, 3vw, 13px)' }}>
            <p>
              Benvenuto nel mio portfolio interattivo ispirato a Windows 7! 
              Questo sito è stato creato per mostrare le mie competenze e la mia esperienza 
              in modo creativo e coinvolgente.
            </p>
            <p style={{ marginTop: '12px' }}>
              Naviga attraverso le varie sezioni per conoscermi meglio!
            </p>
          </div>
        </>
      )
    },
    {
      title: 'Esplora il Desktop',
      content: (
        <>
          <h2 style={{ marginTop: 0, fontSize: 'clamp(16px, 4vw, 18px)', marginBottom: '16px' }}>Come usare il portfolio</h2>
          <div style={{ lineHeight: '1.7', fontSize: 'clamp(12px, 3vw, 13px)' }}>
            <p>Puoi esplorare il desktop cliccando sulle icone per aprire le varie sezioni:</p>
            <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
              <li><strong>📄 Presentazione</strong> - Chi sono e cosa faccio</li>
              <li><strong>👤 Info Personali</strong> - I miei contatti e dettagli</li>
              <li><strong>💼 Esperienze</strong> - Il mio percorso lavorativo</li>
              <li><strong>⚡ Competenze</strong> - Le mie skills tecniche e soft skills</li>
            </ul>
          </div>
        </>
      )
    },
    {
      title: 'Continua l\'Esplorazione',
      content: (
        <>
          <h2 style={{ marginTop: 0, fontSize: 'clamp(16px, 4vw, 18px)', marginBottom: '16px' }}>Altre sezioni disponibili</h2>
          <div style={{ lineHeight: '1.7', fontSize: 'clamp(12px, 3vw, 13px)' }}>
            <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
              <li><strong>🎓 Formazione</strong> - Il mio background educativo</li>
              <li><strong>🏆 Certificazioni</strong> - Le mie certificazioni</li>
              <li><strong>📝 Note</strong> - Form contatti per scrivermi</li>
            </ul>
            <p style={{ marginTop: '16px', fontStyle: 'italic', color: '#666' }}>
              Clicca su "Inizia" per iniziare l'esplorazione del portfolio!
            </p>
          </div>
        </>
      )
    }
  ]

  useEffect(() => {
    // Mostra il modale con una piccola animazione
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div
      role="dialog"
      aria-labelledby="welcome-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
      onClick={handleClose}
    >
      <div
        className="window active"
        style={{
          width: 'min(600px, 95vw)',
          maxHeight: '90vh',
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          transition: 'transform 0.3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title-bar active">
          <div className="title-bar-text" id="welcome-title">{steps[currentStep].title}</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={handleClose} />
          </div>
        </div>
        <div className="window-body has-space" style={{ padding: 'clamp(15px, 3vw, 20px)', overflow: 'auto', maxHeight: 'calc(90vh - 50px)' }}>
          {steps[currentStep].content}
          
          {/* Progress indicator */}
          <div style={{ marginTop: '20px', marginBottom: '16px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {steps.map((_, index) => (
              <div
                key={index}
                style={{
                  width: 'clamp(6px, 1.5vw, 8px)',
                  height: 'clamp(6px, 1.5vw, 8px)',
                  borderRadius: '50%',
                  backgroundColor: index === currentStep ? '#4a9eff' : '#c0c0c0',
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={handlePrevious}
              disabled={currentStep === 0}
              style={{ flex: '1 1 auto', minWidth: '100px' }}
            >
              ← Indietro
            </button>
            <button 
              onClick={currentStep === steps.length - 1 ? handleClose : handleNext}
              style={{ flex: '1 1 auto', minWidth: '100px' }}
            >
              {currentStep === steps.length - 1 ? 'Inizia' : 'Avanti →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

