import { motion } from "framer-motion";
import styles from "./FSMVisualizer.module.css";

function FSMVisualizer({ currentState }) {

    const states = ["q0", "q1", "q2", "q3", "q4", "q5"];

    return (

        <div className={styles.fsmContainer}>

            <h2 className={styles.sectionTitle}>
                FINITE STATE MACHINE
            </h2>

            <div className={styles.fsmStates}>

                {states.map((state, index) => {

                    const isActive = currentState === state;
                    const isDefeat = state === "q5";

                    return (

                        <div
                            key={state}
                            className={styles.fsmWrapper}
                        >

                            <motion.div
                                className={[
                                    styles.fsmState,
                                    isActive ? styles.activeState : "",
                                    isDefeat ? styles.defeatState : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}

                                animate={
                                    isActive
                                        ? { scale: [1, 1.1, 1] }
                                        : {}
                                }

                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                }}
                            >
                                {state}
                            </motion.div>

                            {index < states.length - 1 && (
                                <div className={styles.fsmArrow}>→</div>
                            )}

                        </div>
                    );
                })}

            </div>

            <motion.div
                key={currentState}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.fsmCurrentState}
            >
                Estado actual:
                <span>{currentState}</span>
            </motion.div>

        </div>
    );
}

export default FSMVisualizer;