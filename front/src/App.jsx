import { useState } from "react";

import "./styles/global.css";

import {
  createSocketConnection,
  getSocket
} from "./services/socket";

import ConnectionPanel from "./components/ConnectionPanel/ConnectionPanel";
import FSMVisualizer from "./components/FSMVisualizer/FSMVisualizer";
import GameOverModal from "./components/GameOverModal/GameOverModal";
import GoalGrid from "./components/GoalGrid/GoalGrid";
import GoalkeeperSetup from "./components/GoalkeeperSetup/GoalkeeperSetup";
import RoleSelector from "./components/RoleSelector/RoleSelector";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import ShotHistory from "./components/ShotHistory/ShotHistory";

function App() {

  const [connected, setConnected] = useState(false);
  const [role, setRole] = useState(null);
  const [shots, setShots] = useState([]);
  const [lastResult, setLastResult] = useState("");
  const [currentState, setCurrentState] = useState("q0");
  const [transition, setTransition] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameData, setGameData] = useState({
    goals: 0,
    saves: 0,
    shots: 0
  });


  const connectToServer = (ip) => {

    if (!role) {
      alert("Selecciona un rol");
      return;
    }

    const socket = createSocketConnection(ip, role);

    socket.on("connect", () => { setConnected(true) });

    socket.on("disconnect", () => { setConnected(false) });

    socket.off("shot_result");
    socket.on("shot_result", (data) => {

      setLastResult(data.status);
      setCurrentState(data.state);
      setTransition(data.transition); //! REVISAR QUE CONTENIA TRANSITION
      setGameData(data.game_data);

      setShots((prev) => [
        ...prev,
        {
          coordinate:
            data.coordinate,
          status:
            data.status
        }
      ]);

      if (data.game_over) setGameOver(true)

    }
    );

    socket.on("unauthorized", (data) => alert(data.message));

    socket.on("server_message", (data) => console.log(data.message));

  };

  const shoot = (coordinate) => {

    const socket = getSocket();

    if (!socket) return;

    socket.emit("shoot", { coordinate });

  };

  const restartGame = () => { window.location.reload(); };

  return (

    <div className="app">

      <h1 className="title">FSM PENALES</h1>

      <RoleSelector onSelect={setRole} />

      <ConnectionPanel
        connected={connected}
        onConnect={connectToServer}
      />

      <FSMVisualizer
        currentState={currentState}
        transition={transition}
      />

      <ScoreBoard
        goals={gameData.goals}
        saves={gameData.saves}
        shots={gameData.shots}
        lastResult={lastResult}
      />

      {role === "goalkeeper" && <GoalkeeperSetup />}

      {role === "shooter" && <GoalGrid shots={shots} onShoot={shoot} />}

      <ShotHistory shots={shots} />

      <GameOverModal
        visible={gameOver}
        goals={gameData.goals}
        saves={gameData.saves}
        onRestart={restartGame}
      />

    </div>
  );
}

export default App;