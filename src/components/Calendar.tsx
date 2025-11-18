import { useState, useEffect } from 'react'
import Window from './Window'

interface CalendarProps {
  onClose: () => void
  onMinimize?: () => void
  icon?: React.ReactNode
}

export default function Calendar({ onClose, onMinimize, icon }: CalendarProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ]

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    )
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days: (number | null)[] = []

  // Aggiungi giorni vuoti all'inizio
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // Aggiungi i giorni del mese
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  return (
    <Window
      title="Calendario"
      width={windowWidth <= 480 ? Math.min(350, window.innerWidth - 20) : windowWidth <= 768 ? Math.min(500, window.innerWidth - 40) : 600}
      height={windowWidth <= 480 ? Math.min(450, window.innerHeight - 100) : windowWidth <= 768 ? Math.min(550, window.innerHeight - 80) : 550}
      defaultPosition={{ x: windowWidth <= 480 ? 10 : windowWidth <= 768 ? 20 : 200, y: windowWidth <= 480 ? 10 : windowWidth <= 768 ? 20 : 100 }}
      onClose={onClose}
      onMinimize={onMinimize}
      icon={icon}
    >
      <div style={{ 
        padding: windowWidth <= 480 ? '10px' : '15px', 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        gap: '15px'
      }}>
        {/* Header con navigazione */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '10px',
          borderBottom: '1px solid #ccc'
        }}>
          <button onClick={goToPreviousMonth} style={{ padding: '6px 12px' }}>
            ←
          </button>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: windowWidth <= 480 ? '16px' : '18px'
            }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>
          <button onClick={goToNextMonth} style={{ padding: '6px 12px' }}>
            →
          </button>
        </div>

        {/* Pulsante Oggi */}
        <button onClick={goToToday} style={{ alignSelf: 'center', padding: '6px 16px' }}>
          Oggi
        </button>

        {/* Calendario */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Nomi giorni */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
            marginBottom: '8px'
          }}>
            {dayNames.map((day) => (
              <div
                key={day}
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: windowWidth <= 480 ? '10px' : '11px',
                  color: '#666',
                  padding: '4px'
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Griglia giorni */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
            flex: 1
          }}>
            {days.map((day, index) => (
              <div
                key={index}
                onClick={() => day !== null && handleDateClick(day)}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: day === null 
                    ? 'transparent' 
                    : isSelected(day!)
                      ? '#4a90e2'
                      : isToday(day!)
                        ? '#e8f4f8'
                        : '#f9f9f9',
                  border: day !== null && isToday(day!)
                    ? '2px solid #4a90e2'
                    : day !== null && isSelected(day!)
                      ? '2px solid #357abd'
                      : '1px solid #e0e0e0',
                  borderRadius: '4px',
                  cursor: day !== null ? 'pointer' : 'default',
                  fontSize: windowWidth <= 480 ? '12px' : '14px',
                  fontWeight: isToday(day!) || isSelected(day!) ? 'bold' : 'normal',
                  color: day !== null && isSelected(day!)
                    ? '#fff'
                    : isToday(day!)
                      ? '#4a90e2'
                      : '#333',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (day !== null && !isSelected(day!) && !isToday(day!)) {
                    e.currentTarget.style.background = '#f0f0f0'
                  }
                }}
                onMouseLeave={(e) => {
                  if (day !== null && !isSelected(day!) && !isToday(day!)) {
                    e.currentTarget.style.background = '#f9f9f9'
                  }
                }}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Info data selezionata */}
        {selectedDate && (
          <div style={{
            padding: '10px',
            background: '#f0f0f0',
            borderRadius: '4px',
            fontSize: windowWidth <= 480 ? '11px' : '12px',
            textAlign: 'center'
          }}>
            <strong>Data selezionata:</strong> {selectedDate.toLocaleDateString('it-IT', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        )}
      </div>
    </Window>
  )
}

