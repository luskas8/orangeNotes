import { ChallengersContext } from '@contexts/challengers'
import { useAccount } from '@hooks'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { t } = useTranslation('translation');
    const { level } = useContext(ChallengersContext)
    const { currentAccount } = useAccount();
    return (
        <div className={styles.profileContainer}>
            <img src="https://extendedevolutionarysynthesis.com/wp-content/uploads/2018/02/avatar-1577909_960_720.png" alt="Lucas Anjos" />
            <div>
                <strong>{currentAccount.data.username}</strong>
                <p>
                    <img src="assets/icons/level.svg" alt="Level" />
                    {t('level')} {level}
                </p>
            </div>
        </div>
    )
}
