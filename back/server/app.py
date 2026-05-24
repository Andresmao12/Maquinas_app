from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

from game_manager import GameManager


app = Flask(__name__)

CORS(app)

socketio = SocketIO(
    app,
    cors_allowed_origins="*"
)

# Variable global donde almacenaremos el juego actual
game = None


# EVENTO: Cliente conectado
@socketio.on("connect")
def handle_connect():

    print("El cliente se conecto correctamente")

    emit("server_message", {
        "message": "Conectado al servidor FSM"
    })


# EVENTO: Inicializamos al portero
@socketio.on("initialize_goalkeeper")
def initialize_goalkeeper(data):

    global game

    # Obtenemos posiciones
    positions = data.get("positions", [])

    # Creamos nueva partida
    game = GameManager(positions)

    print("Portero inicializado correctamente")
    print("Posiciones:", positions)

    emit("goalkeeper_initialized", {
        "success": True,
        "positions": positions
    }, broadcast=True)


# EVENTO: Recibimos un disparo
@socketio.on("shoot")
def handle_shoot(data):

    global game

    # Verificamos que exista una partida
    if game is None:
        emit("shot_result", {
            "status": "500:NO_GAME",
            "state": "q0"
        })
        return

    coordinate = data.get("coordinate", "")
    print(f"Disparo recibido: {coordinate}")

    # Procesamos disparo
    result = game.process_shot(coordinate)

    # Información adicional
    response = {
        "coordinate": coordinate,
        "status": result["status"],
        "state": result["state"],
        "game_data": game.get_game_data(),
        "game_over": game.is_game_over()
    }

    print("Respuesta enviada:", response)

    # Enviamos resultado al cliente
    emit("shot_result", response, broadcast=True)


# RUTA BASE
@app.route("/")
def home():
    return {"message": "FSM Penales Backend Running"}


# INICIALIZAMOS SERVIDOR
if __name__ == "__main__":

    print("FSM Penales iniciado")

    socketio.run(
        app,
        host="0.0.0.0",
        port=5000,
        debug=True
    )