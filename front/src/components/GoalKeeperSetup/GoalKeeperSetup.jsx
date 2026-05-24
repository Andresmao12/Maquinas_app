import { useState } from "react";
import { motion } from "framer-motion";

import { getSocket } from "../../services/socket";
import styles from "./GoalKeeperSetup.module.css";

function GoalkeeperSetup() {

    // ========================================
    // ESTADOS
    // ========================================

    const [selectedPositions, setSelectedPositions]
        = useState([]);

    const [initialized, setInitialized]
        = useState(false);

    const rows = ["A", "B", "C", "D"];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8];

    // ========================================
    // SELECCIONAR CELDA
    // ========================================

    const togglePosition = (coordinate) => {

        if (initialized) return;

        // Deseleccionar
        if (selectedPositions.includes(coordinate)) {

            setSelectedPositions((prev) =>
                prev.filter((pos) => pos !== coordinate)
            );

            return;
        }

        // Máximo 12
        if (selectedPositions.length >= 12) return;

        setSelectedPositions((prev) => [
            ...prev,
            coordinate,
        ]);
    };

    // ========================================
    // INICIALIZAR PORTERO
    // ========================================

    const initializeGoalkeeper = () => {

        if (selectedPositions.length !== 12) {

            alert("Debes seleccionar exactamente 12 posiciones");

            return;
        }

        const socket = getSocket();

        if (!socket) {

            alert("No hay conexión con el servidor");

            return;
        }

        socket.emit("initialize_goalkeeper", {
            positions: selectedPositions,
        });

        setInitialized(true);
    };

    return (

        <div className={styles.goalkeeperSetup}>

            <h2 className={styles.sectionTitle}>
                CONFIGURAR PORTERO
            </h2>

            <p className={styles.setupInfo}>
                Selecciona 12 posiciones para proteger
            </p>

            {/* CONTADOR */}

            <div className={styles.selectionCounter}>
                {selectedPositions.length}/12
            </div>

            {/* GRID */}

            <div className={styles.setupGrid}>

                {rows.map((row) =>

                    cols.map((col) => {

                        const coordinate = `${row}${col}`;

                        const selected =
                            selectedPositions.includes(coordinate);

                        return (

                            <motion.div
                                key={coordinate}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                className={`${styles.setupCell} ${selected ? styles.selectedCell : ""}`}
                                onClick={() => togglePosition(coordinate)}
                            >
                                {selected ? "🧤" : coordinate}
                            </motion.div>
                        );
                    })
                )}

            </div>

            {/* BOTÓN */}

            <button
                className={styles.initializeButton}
                onClick={initializeGoalkeeper}
                disabled={
                    initialized ||
                    selectedPositions.length !== 12
                }
            >
                {initialized
                    ? "Portero Inicializado"
                    : "Iniciar Defensa"}
            </button>

        </div>
    );
}

export default GoalkeeperSetup;