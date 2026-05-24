import { motion } from "framer-motion";
import styles from "./GameOverModal.module.css";

function GameOverModal({ visible, goals, saves, onRestart }) {

    if (!visible) return null;

    const playerWon = goals >= 4;

    return (

        <div className={styles.modalOverlay}>

            <motion.div
                className={styles.gameoverModal}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1,   opacity: 1 }}
                transition={{ duration: 0.4 }}
            >

                <h1
                    className={
                        playerWon
                            ? styles.victoryText
                            : styles.defeatText
                    }
                >
                    {playerWon ? "⚽ ¡GOLEADA!" : "🧤 PORTERO IMPARABLE"}
                </h1>

                <div className={styles.finalStats}>

                    <div className={styles.finalCard}>
                        <h3>⚽ Goles</h3>
                        <p>{goals}</p>
                    </div>

                    <div className={styles.finalCard}>
                        <h3>🧤 Tapadas</h3>
                        <p>{saves}</p>
                    </div>

                </div>

                <p className={styles.gameoverMessage}>
                    {playerWon
                        ? "El portero alcanzó el estado q5"
                        : "La defensa resistió los ataques"}
                </p>

                <button
                    className={styles.restartButton}
                    onClick={onRestart}
                >
                    🔄 Reiniciar Partida
                </button>

            </motion.div>

        </div>
    );
}

export default GameOverModal;