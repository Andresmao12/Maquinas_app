import { useState } from "react";
import styles from "./ConnectionPanel.module.css";

function ConnectionPanel({ connected, onConnect }) {

    const [serverIp, setServerIp] = useState("localhost");

    const handleConnect = () => {
        onConnect(serverIp);
    };

    return (

        <div className={styles.connectionPanel}>

            <h2>Conexión al Servidor</h2>

            <div className={styles.connectionForm}>

                <input
                    type="text"
                    placeholder="IP del servidor"
                    value={serverIp}
                    onChange={(e) => setServerIp(e.target.value)}
                />

                <button
                    onClick={handleConnect}
                    disabled={connected}
                >
                    {connected ? "Conectado" : "Conectar"}
                </button>

            </div>

            <div className={styles.connectionStatus}>

                <span
                    className={
                        connected
                            ? styles.statusOnline
                            : styles.statusOffline
                    }
                />

                <p>
                    {connected ? "Servidor conectado" : "Sin conexión"}
                </p>

            </div>

        </div>
    );
}

export default ConnectionPanel;