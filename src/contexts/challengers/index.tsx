// eslint-disable-next-line no-use-before-define
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { LevelUpModal } from '@components/LevelUpModal'
import { useAccount } from '@hooks'
import updateAccount from '@services/firebase/account/update'
import { Account } from '@contexts/firebase'

interface ChallengersProviderProps {
    children: ReactNode
    level: number
    currentExperience: number
    challengersCompleted: number
}

interface Challenger {
    type: string
    description: string
    amount: number
}

interface ChallengersContextData {
    level: number
    currentExperience: number
    challengersCompleted: number
    experiencePreviousLevel: number;
    experienceToNextLevel: number
    activeChallenger: Challenger
    isLevelUpModalOpen: boolean
    levelUp: () => void
    startNewChallenger: () => void
    resetChallenger: () => void
    completeChallenger: () => void
    closeLevelUpModal: () => void
}

export const ChallengersContext = createContext({} as ChallengersContextData)

export function ChallengersProvider({ children, ...rest }: ChallengersProviderProps) {
    const { currentAccount } = useAccount();
    const [level, setLevel] = useState(currentAccount.data.level)
    const [currentExperience, setCurrentExperience] = useState(currentAccount.data.xp)
    const [challengersCompleted, setChallengersCompleted] = useState(currentAccount.data.challengers)

    const [activeChallenger, setActiveChallenger] = useState<Challenger>({ type: "challenger", description: "new challenger", amount: 18 })
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experiencePreviousLevel = Math.pow(level * 4, 2)
    let experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengersCompleted', String(challengersCompleted))
        if (
            level !== currentAccount.data.level ||
            currentExperience !== currentAccount.data.xp ||
            challengersCompleted !== currentAccount.data.challengers
        ) {
            const data: Account = {
                level,
                xp: currentExperience,
                challengers: challengersCompleted,
                id: currentAccount.data.id,
                username: currentAccount.data.username,
            };

            updateAccount(data);
        }
    }, [level, currentExperience, challengersCompleted])

    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function startNewChallenger() {
        const challenger: Challenger = { type: "challenger", description: "new challenger", amount: 29 }

        setActiveChallenger(challenger)

        new Audio('../assets/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenger.amount} xp!`
            })
        }
    }

    function resetChallenger() {
        setActiveChallenger({ type: "challenger", description: "new challenger", amount: 25 })
    }

    function completeChallenger() {
        if (!activeChallenger) {
            return null
        }

        // xp ganha por esse desafio
        const { amount } = activeChallenger

        // xp somada ao que já se tem
        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience -= experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenger({ type: "challenger", description: "new challenger", amount: 32 })
        setChallengersCompleted(challengersCompleted + 1)
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }

    return (
        <ChallengersContext.Provider
            value={{
                level,
                currentExperience,
                challengersCompleted,
                activeChallenger,
                experiencePreviousLevel,
                experienceToNextLevel,
                isLevelUpModalOpen,
                levelUp,
                startNewChallenger,
                resetChallenger,
                completeChallenger,
                closeLevelUpModal
            }}
        >
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengersContext.Provider>
    )
}
