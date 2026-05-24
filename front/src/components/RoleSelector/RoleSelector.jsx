import styles from "./RoleSelector.module.css";

function RoleSelector({ onSelect }) {

    return (

        <div className={styles.roleSelector}>

            <h2 className={styles.sectionTitle}>
                Selecciona tu Rol
            </h2>

            <div className={styles.roleButtons}>

                <button onClick={() => onSelect("goalkeeper")}>
                    🧤 Portero
                </button>

                <button onClick={() => onSelect("shooter")}>
                    ⚽ Pateador
                </button>

            </div>

        </div>
    );
}

export default RoleSelector;