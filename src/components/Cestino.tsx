import { useState, useEffect } from 'react'
import Window from './Window'

interface CestinoProps {
  onClose: () => void
  onMinimize?: () => void
  icon?: React.ReactNode
}

interface FileItem {
  id: number
  name: string
  type: 'file' | 'folder'
  size: string
  deletedDate: string
  icon: string
}

export default function Cestino({ onClose, onMinimize, icon }: CestinoProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [files, setFiles] = useState<FileItem[]>([])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Genera file casuali
    const fileTypes = ['txt', 'doc', 'pdf', 'jpg', 'png', 'mp3', 'mp4', 'zip', 'exe', 'xls']
    const fileNames = [
      'Documento_Importante',
      'Foto_Vacanze',
      'Presentazione_Progetto',
      'Budget_2024',
      'Lista_Spesa',
      'Appunti_Riunione',
      'Video_Tutorial',
      'Musica_Playlist',
      'Backup_Dati',
      'Configurazione',
      'Report_Mensile',
      'Contratto_Lavoro',
      'Screenshot_Schermo',
      'Dati_Cliente',
      'Proposta_Commerciale'
    ]
    const folderNames = [
      'Vecchi_File',
      'Backup',
      'Temporanei',
      'Scaricati',
      'Eliminati',
      'Archivio'
    ]

    const generateFiles = (): FileItem[] => {
      const items: FileItem[] = []
      const numFiles = Math.floor(Math.random() * 8) + 5 // 5-12 file
      
      for (let i = 0; i < numFiles; i++) {
        const isFolder = Math.random() > 0.7
        const name = isFolder 
          ? folderNames[Math.floor(Math.random() * folderNames.length)]
          : `${fileNames[Math.floor(Math.random() * fileNames.length)]}.${fileTypes[Math.floor(Math.random() * fileTypes.length)]}`
        
        const daysAgo = Math.floor(Math.random() * 30) + 1
        const deletedDate = new Date()
        deletedDate.setDate(deletedDate.getDate() - daysAgo)
        
        const size = isFolder 
          ? '--'
          : `${(Math.random() * 5000 + 100).toFixed(0)} KB`
        
        const icons = {
          txt: '📄',
          doc: '📝',
          pdf: '📕',
          jpg: '🖼️',
          png: '🖼️',
          mp3: '🎵',
          mp4: '🎬',
          zip: '📦',
          exe: '⚙️',
          xls: '📊',
          folder: '📁'
        }
        
        const fileExt = name.split('.').pop()?.toLowerCase() || 'txt'
        const fileIcon = isFolder ? icons.folder : (icons[fileExt as keyof typeof icons] || '📄')
        
        items.push({
          id: i,
          name,
          type: isFolder ? 'folder' : 'file',
          size,
          deletedDate: deletedDate.toLocaleDateString('it-IT'),
          icon: fileIcon
        })
      }
      
      return items.sort((a, b) => new Date(b.deletedDate).getTime() - new Date(a.deletedDate).getTime())
    }

    setFiles(generateFiles())
  }, [])

  const handleEmptyTrash = () => {
    if (confirm('Vuoi svuotare il cestino? Tutti i file verranno eliminati definitivamente.')) {
      setFiles([])
    }
  }

  const handleRestore = (fileId: number) => {
    setFiles(files.filter(f => f.id !== fileId))
  }

  const totalSize = files.reduce((sum, file) => {
    if (file.size !== '--') {
      const sizeNum = parseFloat(file.size)
      return sum + (isNaN(sizeNum) ? 0 : sizeNum)
    }
    return sum
  }, 0)

  return (
    <Window
      title="Cestino"
      width={windowWidth <= 480 ? Math.min(400, window.innerWidth - 20) : windowWidth <= 768 ? Math.min(600, window.innerWidth - 40) : 700}
      height={windowWidth <= 480 ? Math.min(500, window.innerHeight - 100) : windowWidth <= 768 ? Math.min(600, window.innerHeight - 80) : 600}
      defaultPosition={{ x: windowWidth <= 480 ? 10 : windowWidth <= 768 ? 20 : 150, y: windowWidth <= 480 ? 10 : windowWidth <= 768 ? 20 : 100 }}
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
        {/* Header con info e pulsanti */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '10px',
          borderBottom: '1px solid #ccc'
        }}>
          <div>
            <h2 style={{ 
              marginTop: 0, 
              marginBottom: '5px',
              fontSize: windowWidth <= 480 ? '16px' : '18px'
            }}>
              Cestino
            </h2>
            <p style={{ 
              margin: 0,
              fontSize: windowWidth <= 480 ? '11px' : '12px',
              color: '#666'
            }}>
              {files.length} {files.length === 1 ? 'oggetto' : 'oggetti'} • {(totalSize / 1024).toFixed(2)} MB
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleEmptyTrash} disabled={files.length === 0}>
              Svuota Cestino
            </button>
          </div>
        </div>

        {/* Lista file */}
        {files.length === 0 ? (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: '#999',
            fontSize: windowWidth <= 480 ? '14px' : '16px'
          }}>
            <div style={{ fontSize: windowWidth <= 480 ? '48px' : '64px', marginBottom: '10px' }}>
              🗑️
            </div>
            <p>Il cestino è vuoto</p>
          </div>
        ) : (
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {files.map((file) => (
              <div
                key={file.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  background: '#f9f9f9',
                  border: '1px solid #e0e0e0',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  fontSize: windowWidth <= 480 ? '12px' : '13px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f0f0f0'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f9f9f9'
                }}
              >
                <div style={{
                  fontSize: windowWidth <= 480 ? '20px' : '24px',
                  marginRight: '10px',
                  width: '30px',
                  textAlign: 'center'
                }}>
                  {file.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 'bold',
                    marginBottom: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {file.name}
                  </div>
                  <div style={{
                    fontSize: windowWidth <= 480 ? '10px' : '11px',
                    color: '#666'
                  }}>
                    Eliminato il {file.deletedDate} • {file.size}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRestore(file.id)
                  }}
                  style={{
                    padding: '4px 8px',
                    fontSize: windowWidth <= 480 ? '10px' : '11px',
                    marginLeft: '8px'
                  }}
                >
                  Ripristina
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Window>
  )
}

