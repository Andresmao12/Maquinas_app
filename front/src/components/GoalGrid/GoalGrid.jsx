import { motion } from "framer-motion";
import styles from "./GoalGrid.module.css";

function GoalGrid({ shots, onShoot }) {

    const rows = ["A", "B", "C", "D"];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8];

    const getShotData = (coordinate) => {
        return shots.find( (shot) => shot.coordinate === coordinate);
    };

    const handleShoot = (coordinate, wasShot) => {
        // Evitamos disparos repetidos
        if (wasShot) return;
        onShoot(coordinate);
    };

    return (

        <div className={styles.goalGridContainer}>

            <h2 className={styles.sectionTitle}>PORTERÍA</h2>

            <div className={styles.goalGrid}>

                {rows.map((row) =>
                    cols.map((col) => {

                        const coordinate = `${row}${col}`;
                        const shotData = getShotData(coordinate);
                        const wasShot = !!shotData;
                        const isGoal = shotData?.status === "202:GOL";
                        const isSave = shotData?.status === "200:TAPO";

                        return (
                            <motion.div
                                key={coordinate}
                                whileHover={
                                    !wasShot
                                        ? { scale: 1.08 }
                                        : {}
                                }

                                whileTap={
                                    !wasShot
                                        ? { scale: 0.95 }
                                        : {}
                                }

                                className={[
                                    styles.goalCell,

                                    isGoal
                                        ? styles.goal
                                        : "",

                                    isSave
                                        ? styles.save
                                        : "",

                                    wasShot
                                        ? styles.disabledCell
                                        : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}

                                onClick={() =>
                                    handleShoot(
                                        coordinate,
                                        wasShot
                                    )
                                }
                            >

                                <span className={styles.coordinate}>
                                    {coordinate}
                                </span>

                                {wasShot && (

                                    <div className={styles.result}>
                                        {isGoal ? "⚽" : "🧤"}
                                    </div>

                                )}

                            </motion.div>
                        );
                    })
                )}

            </div>

        </div>
    );
}

export default GoalGrid;