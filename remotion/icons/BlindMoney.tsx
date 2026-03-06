import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion'

export const BlindMoney: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const dollarScale = spring({ frame, fps, config: { damping: 14 }, durationInFrames: 20 })
  const eyeSlash = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 10 }, durationInFrames: 15 })
  // Coins falling animation
  const coin1Y = interpolate(frame % 50, [0, 50], [0, 20])
  const coin1Opacity = interpolate(frame % 50, [0, 35, 50], [0.6, 0.3, 0])

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Falling coin particles */}
        <circle cx="30" cy={25 + coin1Y} r="3" fill="#e8700a" opacity={coin1Opacity} />
        <circle cx="90" cy={35 + coin1Y * 0.8} r="2.5" fill="#e8700a" opacity={coin1Opacity * 0.7} />

        {/* Dollar sign */}
        <g
          transform={`translate(60, 60) scale(${dollarScale})`}
          stroke="#e8700a"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <line x1="0" y1="-35" x2="0" y2="35" />
          <path d="M15 -20H-8a10 10 0 0 0 0 20h16a10 10 0 0 1 0 20H-15" />
        </g>

        {/* Red eye-slash overlay */}
        <line
          x1="20"
          y1="20"
          x2={interpolate(eyeSlash, [0, 1], [20, 100])}
          y2={interpolate(eyeSlash, [0, 1], [20, 100])}
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </AbsoluteFill>
  )
}
