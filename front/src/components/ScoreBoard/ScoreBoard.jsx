import { motion } from "framer-motion";
import styles from "./ScoreBoard.module.css";

function ScoreBoard({ goals, saves, shots, lastResult }) {

    // ========================================
    // FORMATEAR RESULTADO
    // ========================================

    const getResultText = () => {

        switch (lastResult) {

            case "202:GOL": return "⚽ GOL";
            case "200:TAPO": return "🧤 TAPÓ";
            case "404:INVALIDO": return "❌ INVÁLIDO";
            case "409:REPETIDO": return "🔁 REPETIDO";
            default: return "Esperando disparo...";
        }
    };

    // ========================================
    // CLASE VISUAL RESULTADO
    // ========================================

    const getResultClass = () => {

        switch (lastResult) {

            case "202:GOL": return styles.goalText;
            case "200:TAPO": return styles.saveText;
            case "404:INVALIDO": return styles.invalidText;
            case "409:REPETIDO": return styles.repeatText;
            default: return "";
        }
    };

    return (

        <motion.div
            className={styles.scoreboard}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >

            <h2 className={styles.sectionTitle}>
                MARCADOR
            </h2>

            <div className={styles.scoreboardGrid}>

                <div className={styles.scoreCard}>
                    <h3>⚽ Goles</h3>
                    <p>{goals}</p>
                </div>

                <div className={styles.scoreCard}>
                    <h3>🧤 Tapadas</h3>
                    <p>{saves}</p>
                </div>

                <div className={styles.scoreCard}>
                    <h3>🎯 Tiros</h3>
                    <p>{shots}/5</p>
                </div>

            </div>

            <motion.div
                key={lastResult}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={[
                    styles.lastResult,
                    getResultClass(),
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {getResultText()}
            </motion.div>

        </motion.div>
    );
}

export default ScoreBoard;