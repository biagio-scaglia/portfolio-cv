import Windows7Spinner from './Windows7Spinner'

export default function LoadingFallback() {
  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      minHeight: '200px'
    }}>
      <Windows7Spinner size={48} />
      <div style={{ fontSize: '14px', color: '#666' }}>Caricamento...</div>
    </div>
  )
}

