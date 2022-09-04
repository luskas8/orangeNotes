import { CompletedChallengers } from "@components/CompletedChallengers";
import { Coutdown } from "@components/Countdown";
import { ExperienceBar } from "@components/ExperienceBar";
import { Profile } from "@components/Profile";
import { ChallengersProvider } from "@contexts/challengers";
import { CountdownProvider } from "@contexts/countdown";
import { useNote } from "@hooks";
import { useEffect } from "react";
import styles from '../../styles/pages/Home.module.css';

export const Pomodoro = () => {
    const { unsubscribers } = useNote();

    useEffect(() => {
        if (!!unsubscribers) {
            unsubscribers.forEach(unsubscribe => unsubscribe());
        }
    }, [])

    return (
        <ChallengersProvider
            level={0}
            currentExperience={13}
            challengersCompleted={0}
        >
            <div className={styles.container}>
                <ExperienceBar />

                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallengers />
                            <Coutdown />
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengersProvider>
    )
}
