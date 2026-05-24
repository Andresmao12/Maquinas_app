import styles from "./ShotHistory.module.css";

function ShotHistory({ shots }) {

    return (

        <div className={styles.shotHistory}>

            <h2 className={styles.sectionTitle}>
                Historial
            </h2>

            {shots.map((shot, index) => (

                <div
                    key={index}
                    className={styles.historyItem}
                >

                    <span>{index + 1}.</span>

                    <span>{shot.coordinate}</span>

                    <span>{shot.status}</span>

                </div>
            ))}

        </div>
    );
}

export default ShotHistory;