import { useState, useRef, useEffect } from 'react'

interface SocialShareProps {
  url?: string
  title?: string
}

export default function SocialShare({ url = window.location.href, title = 'Portfolio' }: SocialShareProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    github: 'https://github.com'
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (platform === 'github') {
      window.open(shareLinks.github, '_blank')
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400')
    }
    setIsDropdownOpen(false)
  }

  return (
    <div 
      ref={dropdownRef} 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => !isDropdownOpen && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-describedby="share-tooltip"
        style={{
          padding: '6px 12px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          height: '100%',
          minHeight: '32px',
        }}
      >
        <span>Condividi</span>
        <span style={{ fontSize: '10px' }}>▼</span>
      </button>

      {/* Tooltip */}
      {showTooltip && !isDropdownOpen && (
        <div
          role="tooltip"
          id="share-tooltip"
          className="is-top is-right"
          style={{
            position: 'absolute',
            bottom: '100%',
            right: '0',
            marginBottom: '8px',
            whiteSpace: 'nowrap',
            zIndex: 1001,
          }}
        >
          Clicca per condividere
        </div>
      )}

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <ul
          role="menu"
          className="can-hover"
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            marginTop: '4px',
            zIndex: 1000,
            minWidth: '180px',
          }}
        >
          <li role="menuitem" tabIndex={0} onClick={() => handleShare('twitter')} onKeyDown={(e) => e.key === 'Enter' && handleShare('twitter')}>
            <span style={{ marginRight: '8px', fontSize: '16px' }}>🐦</span>
            X (Twitter)
          </li>
          <li role="menuitem" tabIndex={0} onClick={() => handleShare('facebook')} onKeyDown={(e) => e.key === 'Enter' && handleShare('facebook')}>
            <span style={{ marginRight: '8px', fontSize: '16px' }}>📘</span>
            Facebook
          </li>
          <li role="menuitem" tabIndex={0} onClick={() => handleShare('linkedin')} onKeyDown={(e) => e.key === 'Enter' && handleShare('linkedin')}>
            <span style={{ marginRight: '8px', fontSize: '16px' }}>💼</span>
            LinkedIn
          </li>
          <li role="menuitem" tabIndex={0} onClick={() => handleShare('github')} onKeyDown={(e) => e.key === 'Enter' && handleShare('github')}>
            <span style={{ marginRight: '8px', fontSize: '16px' }}>🔧</span>
            GitHub
          </li>
        </ul>
      )}
    </div>
  )
}

