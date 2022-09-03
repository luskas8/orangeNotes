// eslint-disable-next-line no-use-before-define
import { ChallengersContext } from '@contexts/challengers'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
// import { ChallengersContext } from '../challengers'

interface CountdownProviderProps {
  children: ReactNode
}

interface CountdownContextData {
  minutes: number
  seconts: number
  hasFinished: boolean
  isActive: boolean
  startCountdown: () => void
  resetCountdown: () => void
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider ({ children }: CountdownProviderProps) {
  const { startNewChallenger } = useContext(ChallengersContext)

  const [time, setTime] = useState(3)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconts = time % 60

  function startCountdown () {
    setIsActive(true)
  }

  function resetCountdown () {
    clearInterval(countdownTimeout)
    setIsActive(false)
    setTime(25 * 60)
    setHasFinished(false)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenger()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconts,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
