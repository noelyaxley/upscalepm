import { Composition, registerRoot } from 'remotion'
import { RadioSilence } from './icons/RadioSilence'
import { ConfusedDoc } from './icons/ConfusedDoc'
import { BlindMoney } from './icons/BlindMoney'
import { Mismatch } from './icons/Mismatch'
import { SubscribeBrief } from './icons/SubscribeBrief'
import { ManageBuild } from './icons/ManageBuild'
import { StayControl } from './icons/StayControl'

const SIZE = 120
const FPS = 30
const DURATION = 60 // 2 seconds

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Pain point icons */}
      <Composition
        id="RadioSilence"
        component={RadioSilence}
        width={SIZE}
        height={SIZE}
        fps={FPS}
        durationInFrames={DURATION}
      />
      <Composition
        id="ConfusedDoc"
        component={ConfusedDoc}
        width={SIZE}
        height={SIZE}
        fps={FPS}
        durationInFrames={DURATION}
      />
      <Composition
        id="BlindMoney"
        component={BlindMoney}
        width={SIZE}
        height={SIZE}
        fps={FPS}
        durationInFrames={DURATION}
      />
      <Composition
        id="Mismatch"
        component={Mismatch}
        width={SIZE}
        height={SIZE}
        fps={FPS}
        durationInFrames={DURATION}
      />
      {/* How it works icons */}
      <Composition
        id="SubscribeBrief"
        component={SubscribeBrief}
        width={SIZE}
        height={SIZE}
        fps={FPS}
        durationInFrames={DURATION}
      />
      <Composition
        id="ManageBuild"
        component={ManageBuild}
        width={SIZE}
        height={SIZE}
        fps={FPS}
        durationInFrames={DURATION}
      />
      <Composition
        id="StayControl"
        component={StayControl}
        width={SIZE}
        height={SIZE}
        fps={FPS}
        durationInFrames={DURATION}
      />
    </>
  )
}

registerRoot(RemotionRoot)
