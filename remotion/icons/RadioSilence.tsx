import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion'

export const RadioSilence: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const phoneProgress = spring({ frame, fps, config: { damping: 15 }, durationInFrames: 20 })
  const slashProgress = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12 }, durationInFrames: 15 })
  const pulseOpacity = interpolate(frame % 30, [0, 15, 30], [0.3, 0, 0.3])

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Pulse rings */}
        <circle
          cx="50"
          cy="55"
          r={interpolate(frame % 30, [0, 30], [20, 40])}
          stroke="#e8700a"
          strokeWidth="1.5"
          opacity={pulseOpacity}
          fill="none"
        />
        {/* Phone icon */}
        <g
          transform={`translate(25, 25) scale(${phoneProgress})`}
          stroke="#e8700a"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M55 42.3v7.5a5 5 0 0 1-5.45 5A49.5 49.5 0 0 1 28 47.1a48.7 48.7 0 0 1-15-15A49.5 49.5 0 0 1 5.3 10.3 5 5 0 0 1 10.3 5h7.5a5 5 0 0 1 5 4.3 32 32 0 0 0 1.75 7a5 5 0 0 1-1.12 5.28L20.2 24.8a40 40 0 0 0 15 15l2.78-2.78" />
        </g>
        {/* Strike-through slash */}
        <line
          x1="25"
          y1="25"
          x2={interpolate(slashProgress, [0, 1], [25, 95])}
          y2={interpolate(slashProgress, [0, 1], [25, 95])}
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </AbsoluteFill>
  )
}
