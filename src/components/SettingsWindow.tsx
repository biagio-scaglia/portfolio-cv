import { useState, useEffect } from 'react'
import Window from './Window'

interface AccessibilitySettings {
  highContrast: boolean
  fontSize: 'small' | 'medium' | 'large'
  showAnimations: boolean
  screenReader: boolean
  iconSize: 'small' | 'medium' | 'large'
  focusVisible: boolean
}

interface SettingsWindowProps {
  onClose: () => void
  onMinimize?: () => void
  settings: AccessibilitySettings
  onSettingsChange: (settings: AccessibilitySettings) => void
  icon?: React.ReactNode
}

export default function SettingsWindow({ onClose, onMinimize, settings, onSettingsChange, icon }: SettingsWindowProps) {
  const [localSettings, setLocalSettings] = useState<AccessibilitySettings>(settings)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    onSettingsChange(localSettings)
  }, [localSettings, onSettingsChange])

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Window
      title="Impostazioni - Accessibilità"
      width={650}
      height={600}
      defaultPosition={{ x: 200, y: 100 }}
      onClose={onClose}
      onMinimize={onMinimize}
      icon={icon}
    >
      <div style={{ padding: windowWidth <= 480 ? '15px' : '20px' }}>
        <h2 style={{ marginTop: 0, fontSize: windowWidth <= 480 ? '16px' : '18px', marginBottom: windowWidth <= 480 ? '15px' : '20px' }}>
          <i className="fas fa-cog" style={{ marginRight: '8px' }}></i>
          Opzioni di Accessibilità
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Alto Contrasto */}
          <fieldset style={{ border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '4px', padding: '15px' }}>
            <legend style={{ padding: '0 8px', fontSize: '14px', fontWeight: 'bold' }}>
              <i className="fas fa-adjust" style={{ marginRight: '6px' }}></i>
              Contrasto e Colori
            </legend>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '10px' }}>
              <input
                type="checkbox"
                checked={localSettings.highContrast}
                onChange={(e) => updateSetting('highContrast', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span>Alto contrasto</span>
            </label>
            <p style={{ margin: '8px 0 0 28px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Aumenta il contrasto tra testo e sfondo per una migliore leggibilità
            </p>
          </fieldset>

          {/* Dimensione Testo */}
          <fieldset style={{ border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '4px', padding: '15px' }}>
            <legend style={{ padding: '0 8px', fontSize: '14px', fontWeight: 'bold' }}>
              <i className="fas fa-text-height" style={{ marginRight: '6px' }}></i>
              Dimensione Testo
            </legend>
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px', flexWrap: 'wrap' }}>
              {(['small', 'medium', 'large'] as const).map((size) => (
                <label
                  key={size}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    backgroundColor: localSettings.fontSize === size ? 'rgba(100, 150, 255, 0.3)' : 'transparent',
                    border: localSettings.fontSize === size ? '1px solid rgba(100, 150, 255, 0.5)' : '1px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <input
                    type="radio"
                    name="fontSize"
                    value={size}
                    checked={localSettings.fontSize === size}
                    onChange={() => updateSetting('fontSize', size)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span style={{ textTransform: 'capitalize' }}>
                    {size === 'small' ? 'Piccolo' : size === 'medium' ? 'Medio' : 'Grande'}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Dimensione Icone */}
          <fieldset style={{ border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '4px', padding: '15px' }}>
            <legend style={{ padding: '0 8px', fontSize: '14px', fontWeight: 'bold' }}>
              <i className="fas fa-icons" style={{ marginRight: '6px' }}></i>
              Dimensione Icone Desktop
            </legend>
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px', flexWrap: 'wrap' }}>
              {(['small', 'medium', 'large'] as const).map((size) => (
                <label
                  key={size}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    backgroundColor: localSettings.iconSize === size ? 'rgba(100, 150, 255, 0.3)' : 'transparent',
                    border: localSettings.iconSize === size ? '1px solid rgba(100, 150, 255, 0.5)' : '1px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <input
                    type="radio"
                    name="iconSize"
                    value={size}
                    checked={localSettings.iconSize === size}
                    onChange={() => updateSetting('iconSize', size)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span style={{ textTransform: 'capitalize' }}>
                    {size === 'small' ? 'Piccolo' : size === 'medium' ? 'Medio' : 'Grande'}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Animazioni */}
          <fieldset style={{ border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '4px', padding: '15px' }}>
            <legend style={{ padding: '0 8px', fontSize: '14px', fontWeight: 'bold' }}>
              <i className="fas fa-magic" style={{ marginRight: '6px' }}></i>
              Animazioni e Transizioni
            </legend>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '10px' }}>
              <input
                type="checkbox"
                checked={localSettings.showAnimations}
                onChange={(e) => updateSetting('showAnimations', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span>Mostra animazioni</span>
            </label>
            <p style={{ margin: '8px 0 0 28px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Disattiva per ridurre le animazioni e migliorare le prestazioni
            </p>
          </fieldset>

          {/* Focus Visibile */}
          <fieldset style={{ border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '4px', padding: '15px' }}>
            <legend style={{ padding: '0 8px', fontSize: '14px', fontWeight: 'bold' }}>
              <i className="fas fa-mouse-pointer" style={{ marginRight: '6px' }}></i>
              Navigazione da Tastiera
            </legend>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '10px' }}>
              <input
                type="checkbox"
                checked={localSettings.focusVisible}
                onChange={(e) => updateSetting('focusVisible', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span>Evidenzia elemento in focus</span>
            </label>
            <p style={{ margin: '8px 0 0 28px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Mostra un bordo visibile attorno agli elementi quando navigati con la tastiera
            </p>
          </fieldset>

          {/* Screen Reader */}
          <fieldset style={{ border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '4px', padding: '15px' }}>
            <legend style={{ padding: '0 8px', fontSize: '14px', fontWeight: 'bold' }}>
              <i className="fas fa-headphones" style={{ marginRight: '6px' }}></i>
              Screen Reader
            </legend>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '10px' }}>
              <input
                type="checkbox"
                checked={localSettings.screenReader}
                onChange={(e) => updateSetting('screenReader', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span>Abilita supporto screen reader</span>
            </label>
            <p style={{ margin: '8px 0 0 28px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Aggiunge attributi ARIA per migliorare la compatibilità con screen reader
            </p>
          </fieldset>
        </div>

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: 'rgba(100, 150, 255, 0.1)', borderRadius: '4px', border: '1px solid rgba(100, 150, 255, 0.3)' }}>
          <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
            <i className="fas fa-info-circle" style={{ marginRight: '6px' }}></i>
            <strong>Nota:</strong> Le modifiche vengono applicate immediatamente. Puoi vedere i cambiamenti in tempo reale mentre modifichi le impostazioni.
          </p>
        </div>
      </div>
    </Window>
  )
}

