import { ReactNode, useState, useEffect, useRef } from 'react'

interface DesktopIconProps {
  icon: ReactNode
  label: string
  onClick: () => void
  x?: number
  y?: number
  isSelected?: boolean
  onSelect?: () => void
  onPositionChange?: (x: number, y: number) => void
}

export default function DesktopIcon({ icon, label, onClick, x = 0, y = 0, isSelected: externalSelected, onSelect, onPositionChange }: DesktopIconProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [internalSelected, setInternalSelected] = useState(false)
  const [position, setPosition] = useState({ x, y })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const iconRef = useRef<HTMLDivElement>(null)
  const isSelected = externalSelected !== undefined ? externalSelected : internalSelected

  useEffect(() => {
    setPosition({ x, y })
  }, [x, y])

  useEffect(() => {
    if (externalSelected === false) {
      setInternalSelected(false)
    }
  }, [externalSelected])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x
      let newY = e.clientY - dragOffset.y
      
      // Taskbar height responsive
      const taskbarHeight = window.innerWidth <= 480 ? 50 : 48
      const iconHeight = window.innerWidth <= 480 ? 80 : 100
      
      // Evita che l'icona vada sotto la taskbar
      const maxY = window.innerHeight - taskbarHeight - iconHeight
      if (newY > maxY) {
        newY = maxY
      }
      
      // Evita che l'icona vada sopra lo schermo
      if (newY < 0) {
        newY = 0
      }
      
      // Evita che l'icona vada fuori a sinistra o destra
      let constrainedX = newX
      if (constrainedX < 0) {
        constrainedX = 0
      }
      const iconWidth = window.innerWidth <= 480 ? 65 : 90
      const maxX = window.innerWidth - iconWidth
      if (constrainedX > maxX) {
        constrainedX = maxX
      }
      
      setPosition({ x: constrainedX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      if (onPositionChange && iconRef.current) {
        const rect = iconRef.current.getBoundingClientRect()
        onPositionChange(rect.left, rect.top)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset, onPositionChange])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.detail === 2) return
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  return (
    <div
      ref={iconRef}
      className="desktop-icon"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '90px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: isDragging ? 'grabbing' : 'pointer',
        padding: '4px',
        userSelect: 'none',
        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.3)' : isHovered ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
        borderRadius: '4px',
        zIndex: isDragging ? 1000 : 1,
        transition: isDragging ? 'none' : 'background-color 0.2s',
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        if (isDragging) {
          e.stopPropagation()
          return
        }
        e.stopPropagation()
        if (externalSelected === undefined) {
          setInternalSelected(true)
        }
        if (onSelect) {
          onSelect()
        }
      }}
      onDoubleClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          width: window.innerWidth <= 480 ? '36px' : window.innerWidth <= 768 ? '40px' : '48px',
          height: window.innerWidth <= 480 ? '36px' : window.innerWidth <= 768 ? '40px' : '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '4px',
          padding: '2px',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: '11px',
          textAlign: 'center',
          color: '#000',
          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.9), -1px -1px 2px rgba(255, 255, 255, 0.9), 1px -1px 2px rgba(255, 255, 255, 0.9), -1px 1px 2px rgba(255, 255, 255, 0.9)',
          wordBreak: 'break-word',
          lineHeight: '1.2',
          maxWidth: '90px',
          fontFamily: 'Segoe UI, Tahoma, sans-serif',
          padding: '2px 4px',
          borderRadius: '2px',
          backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
          fontWeight: isSelected ? 'bold' : 'normal',
        }}
      >
        {label}
      </div>
    </div>
  )
}

