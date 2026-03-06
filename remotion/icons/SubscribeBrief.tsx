import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion'

export const SubscribeBrief: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const personScale = spring({ frame, fps, config: { damping: 14 }, durationInFrames: 18 })
  const plusScale = spring({ frame: Math.max(0, frame - 14), fps, config: { damping: 10, mass: 0.8 }, durationInFrames: 15 })
  // Gentle breathing pulse on the plus
  const plusPulse = interpolate(frame % 40, [0, 20, 40], [1, 1.15, 1])

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Person silhouette */}
        <g
          transform={`translate(20, 20) scale(${personScale})`}
          stroke="#e8700a"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <circle cx="30" cy="22" r="14" />
          <path d="M5 80v-7a14 14 0 0 1 14-14h22a14 14 0 0 1 14 14v7" />
        </g>

        {/* Animated plus sign */}
        <g
          transform={`translate(88, 32) scale(${plusScale * plusPulse})`}
        >
          <circle cx="0" cy="0" r="16" fill="#e8700a" opacity="0.15" />
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#e8700a" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#e8700a" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      </svg>
    </AbsoluteFill>
  )
}
