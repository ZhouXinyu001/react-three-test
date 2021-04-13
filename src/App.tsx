import React, { useRef } from 'react'
import { range } from 'lodash'
import { Canvas, useFrame, useResource } from 'react-three-fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import {
  DoubleSide,
  Group,
  PerspectiveCamera as PerspectiveCameraType,
} from 'three'
import { useControls } from 'leva'

type BoxRowProps = {
  z?: number
}

function BoxRow({ z = 0 }: BoxRowProps) {
  return (
    <>
      {range(8).map((val) => {
        return (
          <mesh key={val} position={[-8 + val * 2, -1.49, z]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={0x00ff00} />
          </mesh>
        )
      })}
    </>
  )
}

function Board() {
  const { speed } = useControls({ speed: 0.01 })

  const group = useRef<Group>()
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += speed
    }
  })

  return (
    <>
      <group ref={group}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color={0xff0000} side={DoubleSide} />
        </mesh>
      </group>
      <pointLight position={[0, 10, 0]} />
      <pointLight position={[10, 10, 0]} />
      <pointLight position={[10, 10, 10]} />
    </>
  )
}

export default function App() {
  const camera = useResource<PerspectiveCameraType>()

  return (
    <div className="w-screen h-screen">
      <h1 className="text-xl fixed top-4 left-4 font-medium">React THREE</h1>
      <Canvas>
        <Board />
        <PerspectiveCamera ref={camera} position={[0, 10, 15]} makeDefault />
        <OrbitControls camera={camera.current} />
      </Canvas>
    </div>
  )
}
