import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          color: 'white',
          fontSize: 18,
          fontWeight: 900,
          fontFamily: 'sans-serif',
          letterSpacing: '-1px',
        }}
      >
        ✦
      </div>
    ),
    { ...size },
  )
}
