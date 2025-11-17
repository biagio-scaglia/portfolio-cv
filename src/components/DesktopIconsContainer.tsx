import { ReactNode } from 'react'

interface DesktopIconsContainerProps {
  children: ReactNode
}

export default function DesktopIconsContainer({ children }: DesktopIconsContainerProps) {
  return (
    <div
      className="desktop-icons-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100% - 40px)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        gap: '20px',
      }}
    >
      {children}
    </div>
  )
}

