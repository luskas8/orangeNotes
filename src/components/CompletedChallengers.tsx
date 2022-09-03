// eslint-disable-next-line no-use-before-define
import { ChallengersContext } from '@contexts/challengers'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import styles from '../styles/components/CompletedChallengers.module.css'

export function CompletedChallengers() {
    const { t } = useTranslation('translation');
    const { challengersCompleted } = useContext(ChallengersContext)
    return (
        <div className={styles.completedChallengersContainer}>
            <span>{t('completed_challengers')}</span>
            <span>{challengersCompleted}</span>
        </div>
    )
}
