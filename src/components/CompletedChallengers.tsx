// eslint-disable-next-line no-use-before-define
import { ChallengersContext } from '@contexts/challengers'
import { useContext } from 'react'
import styles from '../styles/components/CompletedChallengers.module.css'

export function CompletedChallengers() {
    const { challengersCompleted } = useContext(ChallengersContext)
    return (
        <div className={styles.completedChallengersContainer}>
            <span>Desafios completos</span>
            <span>{challengersCompleted}</span>
        </div>
    )
}
