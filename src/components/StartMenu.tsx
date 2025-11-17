import { useEffect, useRef, useState } from 'react'

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenWindow: (window: string) => void
  onShutdown: () => void
}

export default function StartMenu({ isOpen, onClose, onOpenWindow, onShutdown }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const menuItems = [
    { icon: 'fas fa-file-alt', label: 'Presentazione', window: 'about' },
    { icon: 'fas fa-user', label: 'Info Personali', window: 'personalInfo' },
    { icon: 'fas fa-briefcase', label: 'Esperienze', window: 'workExperience' },
    { icon: 'fas fa-bolt', label: 'Competenze', window: 'skills' },
    { icon: 'fas fa-graduation-cap', label: 'Formazione', window: 'education' },
    { icon: 'fas fa-trophy', label: 'Certificazioni', window: 'certifications' },
    { icon: 'fas fa-sticky-note', label: 'Note', window: 'note' },
  ]

  const quickAccessItems = [
    { icon: 'fas fa-laptop', label: 'Computer', window: 'computer' },
    { icon: 'fas fa-folder', label: 'Documenti', window: 'documents' },
    { icon: 'fas fa-image', label: 'Immagini', window: 'images' },
    { icon: 'fas fa-music', label: 'Musica', window: 'music' },
  ]

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        bottom: windowWidth <= 480 ? '50px' : '40px',
        left: '0',
        width: windowWidth <= 480 ? '100vw' : windowWidth <= 768 ? '280px' : '300px',
        maxHeight: windowWidth <= 480 ? 'calc(100vh - 50px)' : 'calc(100vh - 40px)',
        background: 'linear-gradient(to bottom, rgba(30, 50, 90, 0.85) 0%, rgba(20, 40, 80, 0.9) 100%)',
        backdropFilter: 'blur(35px)',
        WebkitBackdropFilter: 'blur(35px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.4)',
        borderRight: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Segoe UI, Tahoma, sans-serif',
        color: '#fff',
      }}
    >
      {/* Sezione sinistra - Programmi */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 0', minHeight: 0 }}>
        <div style={{ padding: '8px 16px', fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px' }}>
          PROGRAMMI
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0', minHeight: 0 }}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                onOpenWindow(item.window)
                onClose()
              }}
              style={{
                padding: windowWidth <= 480 ? '12px 16px' : '10px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: windowWidth <= 480 ? '10px' : '12px',
                fontSize: windowWidth <= 480 ? '14px' : '13px',
                transition: 'all 0.15s',
                background: 'transparent',
                borderRadius: '0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)'
                e.currentTarget.style.backdropFilter = 'blur(20px)'
                e.currentTarget.style.WebkitBackdropFilter = 'blur(20px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.backdropFilter = 'none'
                e.currentTarget.style.WebkitBackdropFilter = 'none'
              }}
            >
              <i className={item.icon} style={{ fontSize: windowWidth <= 480 ? '20px' : '18px', width: windowWidth <= 480 ? '30px' : '28px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i>
              <span style={{ fontWeight: '400' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Separatore */}
      <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.2)', margin: '4px 0' }} />

      {/* Sezione destra - Accesso rapido */}
      <div style={{ width: '100%', padding: '8px 0' }}>
        <div style={{ padding: '8px 16px', fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px' }}>
          ACCESSO RAPIDO
        </div>
        {quickAccessItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              if (item.window) {
                onOpenWindow(item.window)
                onClose()
              }
            }}
            style={{
              padding: '10px 16px',
              cursor: item.window ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '13px',
              transition: 'all 0.15s',
              background: 'transparent',
              borderRadius: '0',
            }}
            onMouseEnter={(e) => {
              if (item.window) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <i className={item.icon} style={{ fontSize: '18px', width: '28px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></i>
            <span style={{ fontWeight: '400' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Footer con pulsante spegnimento */}
      <div style={{
        padding: '8px 16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <button
          onClick={() => {
            onShutdown()
            onClose()
          }}
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#fff',
            cursor: 'pointer',
            borderRadius: '2px',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
          }}
        >
          <i className="fas fa-power-off" style={{ fontSize: '14px' }}></i>
          <span>Spegni</span>
        </button>
      </div>
    </div>
  )
}

