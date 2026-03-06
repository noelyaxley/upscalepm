import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion'

export const StayControl: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const shieldScale = spring({ frame, fps, config: { damping: 14 }, durationInFrames: 22 })
  const checkProgress = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 10 }, durationInFrames: 15 })
  // Shield glow pulse
  const glowOpacity = interpolate(frame % 45, [0, 22, 45], [0.05, 0.15, 0.05])

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Glow behind shield */}
        <ellipse
          cx="60"
          cy="60"
          rx="45"
          ry="50"
          fill="#e8700a"
          opacity={glowOpacity}
        />

        {/* Shield */}
        <g
          transform={`translate(60, 58) scale(${shieldScale})`}
          stroke="#e8700a"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M0 -42s-30 10-30 18v24c0 22 30 38 30 38s30-16 30-38V-24C30-32 0-42 0-42z" />
        </g>

        {/* Checkmark */}
        <g opacity={checkProgress}>
          <path
            d="M47 60l8 10 18-22"
            stroke="#e8700a"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </AbsoluteFill>
  )
}
