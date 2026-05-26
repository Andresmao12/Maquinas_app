from flask_socketio import emit

from events.decorators import role_required

from shared import session_storage


def register_shooter_events(socketio):

    @socketio.on("shoot")
    @role_required("shooter")
    def handle_shoot(data):

        if session_storage.game is None:

            emit("shot_result", {
                "status": "500:NO_GAME"
            })

            return

        print (f"Disparo recibido: {data}")
        coordinate = data.get(
            "coordinate",
            ""
        )

        with session_storage.game_lock:

            result = session_storage.game.process_shot(
                coordinate
            )

            response = {
                "coordinate":
                coordinate,

                "status":
                result["status"],

                "state":
                result["state"],

                "game_data":
                session_storage.game.get_game_data(),

                "game_over":
                session_storage.game.is_game_over()
            }

        emit(
            "shot_result",
            response,
            broadcast=True
        )