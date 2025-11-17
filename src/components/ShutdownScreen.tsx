import { useState, useEffect } from 'react'

interface ShutdownScreenProps {
  onRestart: () => void
  onCancel: () => void
}

export default function ShutdownScreen({ onRestart, onCancel }: ShutdownScreenProps) {
  const [isShuttingDown, setIsShuttingDown] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleRestart = () => {
    setIsShuttingDown(true)
    // Simula il processo di spegnimento
    setTimeout(() => {
      onRestart()
    }, 1500)
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #000000 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20000,
        fontFamily: 'Segoe UI, Tahoma, sans-serif',
        color: '#fff',
      }}
    >
      {!isShuttingDown ? (
        <>
          {/* Icona */}
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <div style={{ marginBottom: '20px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
              <i className="fab fa-windows" style={{ fontSize: windowWidth <= 480 ? '48px' : '64px', color: '#ffffff' }}></i>
            </div>
            <div style={{ fontSize: windowWidth <= 480 ? '18px' : '24px', fontWeight: 'bold', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.8)', padding: '0 20px' }}>
              Portfolio OS
            </div>
          </div>

          {/* Opzioni */}
          <div style={{ 
            background: 'linear-gradient(to bottom, rgba(40, 60, 100, 0.9) 0%, rgba(25, 45, 85, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            padding: windowWidth <= 480 ? '20px' : '30px 40px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            minWidth: windowWidth <= 480 ? '90vw' : '350px',
            maxWidth: windowWidth <= 480 ? '90vw' : '400px',
            textAlign: 'center',
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '24px', fontSize: windowWidth <= 480 ? '16px' : '20px', fontWeight: 'bold' }}>
              Cosa vuoi fare?
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <button
                onClick={handleRestart}
                style={{
                  padding: windowWidth <= 480 ? '12px 20px' : '14px 24px',
                  fontSize: windowWidth <= 480 ? '13px' : '15px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(to bottom, #e8e8e8 0%, #d0d0d0 50%, #b8b8b8 100%)',
                  color: '#000000',
                  border: '1px outset #e0e0e0',
                  borderRadius: '0',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)',
                  transition: 'all 0.15s',
                  fontFamily: 'Segoe UI, Tahoma, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to bottom, #f0f0f0 0%, #d8d8d8 50%, #c0c0c0 100%)'
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to bottom, #e8e8e8 0%, #d0d0d0 50%, #b8b8b8 100%)'
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to bottom, #b8b8b8 0%, #d0d0d0 50%, #e8e8e8 100%)'
                  e.currentTarget.style.border = '1px inset #c0c0c0'
                  e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.3)'
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to bottom, #e8e8e8 0%, #d0d0d0 50%, #b8b8b8 100%)'
                  e.currentTarget.style.border = '1px outset #e0e0e0'
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)'
                }}
              >
                <i className="fas fa-redo" style={{ fontSize: '16px' }}></i>
                <span>Riavvia</span>
              </button>

              <button
                onClick={onCancel}
                style={{
                  padding: windowWidth <= 480 ? '12px 20px' : '14px 24px',
                  fontSize: windowWidth <= 480 ? '13px' : '15px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(to bottom, #e8e8e8 0%, #d0d0d0 50%, #b8b8b8 100%)',
                  color: '#000000',
                  border: '1px outset #e0e0e0',
                  borderRadius: '0',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)',
                  transition: 'all 0.15s',
                  fontFamily: 'Segoe UI, Tahoma, sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to bottom, #f0f0f0 0%, #d8d8d8 50%, #c0c0c0 100%)'
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to bottom, #e8e8e8 0%, #d0d0d0 50%, #b8b8b8 100%)'
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to bottom, #b8b8b8 0%, #d0d0d0 50%, #e8e8e8 100%)'
                  e.currentTarget.style.border = '1px inset #c0c0c0'
                  e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.3)'
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to bottom, #e8e8e8 0%, #d0d0d0 50%, #b8b8b8 100%)'
                  e.currentTarget.style.border = '1px outset #e0e0e0'
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)'
                }}
              >
                Annulla
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Schermata di spegnimento */}
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <div style={{ marginBottom: '20px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
              <i className="fab fa-windows" style={{ fontSize: windowWidth <= 480 ? '48px' : '64px', color: '#ffffff' }}></i>
            </div>
            <div style={{ fontSize: windowWidth <= 480 ? '18px' : '24px', fontWeight: 'bold', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.8)', marginBottom: '12px', padding: '0 20px' }}>
              Portfolio OS
            </div>
            <div style={{ fontSize: windowWidth <= 480 ? '14px' : '16px', color: '#c0c0c0', padding: '0 20px' }}>
              Riavvio in corso...
            </div>
          </div>

          {/* Spinner */}
          <div style={{ marginBottom: '30px' }}>
            <div className="spinner animate" aria-label="Riavvio sistema..." style={{ width: '32px', height: '32px' }} />
          </div>

          {/* Progress Bar */}
          <div style={{ width: 'min(400px, 90vw)', padding: '0 20px' }}>
            <div role="progressbar" className="animate" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{ width: '100%' }}>
              <div style={{ width: '100%', height: '24px' }} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

