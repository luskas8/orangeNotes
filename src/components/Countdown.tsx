// eslint-disable-next-line no-use-before-define
import { ChallengersContext } from '@contexts'
import { CountdownContext } from '@contexts/countdown'
import { useContext } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function Coutdown() {
    const { minutes, seconts, hasFinished, isActive, resetCountdown, startCountdown } = useContext(CountdownContext)
    const { completeChallenger } = useContext(ChallengersContext);

    const [minLeft, minRight] = String(minutes).padStart(2, '0').split('')
    const [secLeft, secRight] = String(seconts).padStart(2, '0').split('')

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minLeft}</span>
                    <span>{minRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secLeft}</span>
                    <span>{secRight}</span>
                </div>
            </div>

            {
                hasFinished
                    ? (
                        <button type="button" className={`${styles.countdownButton}`} onClick={() => completeChallenger()}>
                            Ciclo encerado
                        </button>
                    )
                    : (
                        <>
                            {
                                !isActive
                                    ? (
                                        <button type="button" className={`${styles.countdownButton} ${styles.newCyclo}`} onClick={startCountdown}>
                                            Iniciar novo ciclo
                                        </button>
                                    )
                                    : (
                                        <button type="button" className={`${styles.countdownButton} ${styles.quitCyclo}`} onClick={resetCountdown}>
                                            Abandonar ciclo
                                        </button>
                                    )
                            }
                        </>
                    )
            }
        </div>
    )
}
