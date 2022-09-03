import { CompletedChallengers } from "@components/CompletedChallengers";
import { Coutdown } from "@components/Countdown";
import { ExperienceBar } from "@components/ExperienceBar";
import { Profile } from "@components/Profile";
import { ChallengersProvider } from "@contexts/challengers";
import { CountdownProvider } from "@contexts/countdown";
import styles from '../../styles/pages/Home.module.css';

export const Pomodoro = () => {

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
