import Image from 'next/image'

export function Logo() {
  return (
    <div className="relative w-12 h-12 mr-1">
      <Image
        src="/logo.svg"
        alt="PropFinds Logo"
        width={48}
        height={48}
        className="w-full h-full drop-shadow-[0_0_3px_rgba(0,180,216,0.5)]"
        priority
        style={{ 
          filter: 'drop-shadow(0 0 2px rgba(0,180,216,0.3))',
          background: 'transparent' 
        }}
      />
    </div>
  )
} 