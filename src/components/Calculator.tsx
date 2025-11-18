import { useState, useEffect } from 'react'
import Window from './Window'

interface CalculatorProps {
  onClose: () => void
  onMinimize?: () => void
  icon?: React.ReactNode
}

export default function Calculator({ onClose, onMinimize, icon }: CalculatorProps) {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(op)
    setWaitingForNewValue(true)
  }

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '*':
        return prev * current
      case '/':
        return current !== 0 ? prev / current : 0
      default:
        return current
    }
  }

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const currentValue = parseFloat(display)
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }


  return (
    <Window
      title="Calcolatrice"
      width={windowWidth <= 480 ? Math.min(300, window.innerWidth - 20) : windowWidth <= 768 ? Math.min(400, window.innerWidth - 40) : 350}
      height={windowWidth <= 480 ? Math.min(450, window.innerHeight - 100) : windowWidth <= 768 ? Math.min(500, window.innerHeight - 80) : 450}
      defaultPosition={{ x: windowWidth <= 480 ? 10 : windowWidth <= 768 ? 20 : 200, y: windowWidth <= 480 ? 10 : windowWidth <= 768 ? 20 : 150 }}
      onClose={onClose}
      onMinimize={onMinimize}
      icon={icon}
    >
      <div style={{ 
        padding: windowWidth <= 480 ? '10px' : '15px', 
        display: 'flex', 
        flexDirection: 'column',
        gap: '15px',
        height: '100%'
      }}>
        {/* Display */}
        <div className="field-row">
          <input
            type="text"
            value={display}
            readOnly
            style={{
              width: '100%',
              fontSize: windowWidth <= 480 ? '24px' : windowWidth <= 768 ? '28px' : '32px',
              fontFamily: 'Segoe UI, Tahoma, sans-serif',
              textAlign: 'right',
              minHeight: windowWidth <= 480 ? '50px' : '60px',
              padding: '15px',
              fontWeight: 'bold',
            }}
          />
        </div>

        {/* Tastierino */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '8px',
          flex: 1
        }}>
          {/* Prima riga */}
          <button onClick={handleClear} style={{ gridColumn: 'span 1' }}>
            C
          </button>
          <button onClick={handleBackspace} style={{ gridColumn: 'span 1' }}>
            ⌫
          </button>
          <button onClick={() => handleOperation('/')} style={{ gridColumn: 'span 1' }}>
            ÷
          </button>
          <button onClick={() => handleOperation('*')} style={{ gridColumn: 'span 1' }}>
            ×
          </button>

          {/* Seconda riga */}
          <button onClick={() => handleNumber('7')} style={{ gridColumn: 'span 1' }}>
            7
          </button>
          <button onClick={() => handleNumber('8')} style={{ gridColumn: 'span 1' }}>
            8
          </button>
          <button onClick={() => handleNumber('9')} style={{ gridColumn: 'span 1' }}>
            9
          </button>
          <button onClick={() => handleOperation('-')} style={{ gridColumn: 'span 1' }}>
            −
          </button>

          {/* Terza riga */}
          <button onClick={() => handleNumber('4')} style={{ gridColumn: 'span 1' }}>
            4
          </button>
          <button onClick={() => handleNumber('5')} style={{ gridColumn: 'span 1' }}>
            5
          </button>
          <button onClick={() => handleNumber('6')} style={{ gridColumn: 'span 1' }}>
            6
          </button>
          <button onClick={() => handleOperation('+')} style={{ gridColumn: 'span 1' }}>
            +
          </button>

          {/* Quarta riga */}
          <button onClick={() => handleNumber('1')} style={{ gridColumn: 'span 1' }}>
            1
          </button>
          <button onClick={() => handleNumber('2')} style={{ gridColumn: 'span 1' }}>
            2
          </button>
          <button onClick={() => handleNumber('3')} style={{ gridColumn: 'span 1' }}>
            3
          </button>
          <button onClick={handleEquals} style={{ gridRow: 'span 2', gridColumn: 'span 1' }}>
            =
          </button>

          {/* Quinta riga */}
          <button onClick={() => handleNumber('0')} style={{ gridColumn: 'span 2' }}>
            0
          </button>
          <button onClick={handleDecimal} style={{ gridColumn: 'span 1' }}>
            .
          </button>
        </div>
      </div>
    </Window>
  )
}

