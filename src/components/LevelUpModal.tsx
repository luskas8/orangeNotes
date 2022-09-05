// eslint-disable-next-line no-use-before-define
import { useContext } from 'react'
import { ChallengersContext } from '@contexts/challengers'
import styles from '../styles/components/LevelUpModal.module.css'
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'

export function LevelUpModal() {
    const { level, closeLevelUpModal } = useContext(ChallengersContext)

    return (
        <Modal isOpen={true} onClose={() => { }}>
            <ModalOverlay />
            <ModalContent>
                <div className={styles.container}>
                    <header>{level}</header>

                    <strong>Parabéns</strong>
                    <p>Você alcansou um novo level.</p>

                    <button type="button" onClick={closeLevelUpModal}>
                        <img src="assets/icons/close.svg" alt="Fechar modal" />
                    </button>
                </div>

            </ModalContent>
        </Modal>
    )
}
