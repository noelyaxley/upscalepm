import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion'

export const ManageBuild: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const helmetScale = spring({ frame, fps, config: { damping: 14 }, durationInFrames: 20 })
  const lensScale = spring({ frame: Math.max(0, frame - 16), fps, config: { damping: 12 }, durationInFrames: 18 })
  // Scanning motion for magnifying glass
  const scanX = interpolate(frame % 50, [0, 25, 50], [0, 6, 0])

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Hard hat */}
        <g
          transform={`translate(15, 15) scale(${helmetScale})`}
          stroke="#e8700a"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M5 60h80" />
          <path d="M12 60V48a33 33 0 0 1 66 0v12" />
          <path d="M12 60v8h66v-8" />
        </g>

        {/* Magnifying glass */}
        <g
          transform={`translate(${60 + scanX}, 72) scale(${lensScale})`}
          stroke="#e8700a"
          strokeWidth="3"
          fill="none"
        >
          <circle cx="0" cy="0" r="14" />
          <line x1="10" y1="10" x2="20" y2="20" strokeWidth="3.5" />
          {/* Checkmark inside lens */}
          <path d="M-5 0l3 4 8-8" strokeWidth="2.5" />
        </g>
      </svg>
    </AbsoluteFill>
  )
}
