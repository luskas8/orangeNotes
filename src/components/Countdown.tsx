// eslint-disable-next-line no-use-before-define
import { ChallengersContext } from '@contexts'
import { CountdownContext } from '@contexts/countdown'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../styles/components/Countdown.module.css'

export function Coutdown() {
    const { t } = useTranslation('translation');

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
                            {t('end_time')}
                        </button>
                    )
                    : (
                        <>
                            {
                                !isActive
                                    ? (
                                        <button type="button" className={`${styles.countdownButton} ${styles.newCyclo}`} onClick={startCountdown}>
                                            {t('start_counter')}
                                        </button>
                                    )
                                    : (
                                        <button type="button" className={`${styles.countdownButton} ${styles.quitCyclo}`} onClick={resetCountdown}>
                                             {t('abandon_counter')}
                                        </button>
                                    )
                            }
                        </>
                    )
            }
        </div>
    )
}
