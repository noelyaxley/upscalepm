import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion'

export const ConfusedDoc: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const docScale = spring({ frame, fps, config: { damping: 15 }, durationInFrames: 18 })
  const questionProgress = spring({ frame: Math.max(0, frame - 14), fps, config: { damping: 12 }, durationInFrames: 20 })
  // Gentle wobble on the question mark
  const wobble = interpolate(frame % 40, [0, 10, 20, 30, 40], [0, -3, 0, 3, 0])

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Document body */}
        <g
          transform={`translate(25, 10) scale(${docScale})`}
          stroke="#e8700a"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M45 5H15a7 7 0 0 0-7 7v76a7 7 0 0 0 7 7h40a7 7 0 0 0 7-7V22L45 5z" />
          <path d="M45 5v17h17" />
          {/* Lines on document */}
          <line x1="20" y1="45" x2="50" y2="45" strokeWidth="2.5" opacity="0.3" />
          <line x1="20" y1="55" x2="45" y2="55" strokeWidth="2.5" opacity="0.3" />
        </g>
        {/* Question mark */}
        <g
          transform={`translate(${wobble}, 0)`}
          opacity={questionProgress}
        >
          <circle cx="85" cy="30" r="18" fill="#e8700a" opacity="0.15" />
          <text
            x="85"
            y="37"
            textAnchor="middle"
            fill="#e8700a"
            fontSize="28"
            fontWeight="bold"
            fontFamily="system-ui"
          >
            ?
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  )
}
