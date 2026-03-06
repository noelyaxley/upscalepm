import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion'

export const Mismatch: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const clipboardScale = spring({ frame, fps, config: { damping: 15 }, durationInFrames: 18 })
  const xProgress = spring({ frame: Math.max(0, frame - 16), fps, config: { damping: 10 }, durationInFrames: 12 })
  // Shake on X appearance
  const shake = frame > 28 && frame < 38
    ? interpolate(frame - 28, [0, 2, 4, 6, 8, 10], [0, -3, 3, -2, 1, 0])
    : 0

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <g transform={`translate(${shake}, 0)`}>
          {/* Clipboard body */}
          <g
            transform={`translate(22, 10) scale(${clipboardScale})`}
            stroke="#e8700a"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <path d="M52 12h7a7 7 0 0 1 7 7v62a7 7 0 0 1-7 7H17a7 7 0 0 1-7-7V19a7 7 0 0 1 7-7h7" />
            <rect x="24" y="5" width="28" height="14" rx="4" />
            {/* Check lines (will be X'd) */}
            <line x1="22" y1="45" x2="54" y2="45" strokeWidth="2.5" opacity="0.3" />
            <line x1="22" y1="57" x2="48" y2="57" strokeWidth="2.5" opacity="0.3" />
            <line x1="22" y1="69" x2="50" y2="69" strokeWidth="2.5" opacity="0.3" />
          </g>

          {/* Big red X */}
          <g opacity={xProgress}>
            <line x1="45" y1="55" x2="80" y2="90" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
            <line x1="80" y1="55" x2="45" y2="90" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  )
}
