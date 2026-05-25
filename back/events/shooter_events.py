from flask_socketio import emit

from decorators import role_required

from state.globals import (
    game,
    game_lock
)

def register_shooter_events(socketio):

    @socketio.on("shoot")
    @role_required("shooter")
    def handle_shoot(data):

        global game

        if game is None:

            emit("shot_result", {
                "status": "500:NO_GAME"
            })

            return

        coordinate = data.get(
            "coordinate",
            ""
        )

        with game_lock:

            result = game.process_shot(
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
                game.get_game_data(),

                "game_over":
                game.is_game_over()
            }

        emit(
            "shot_result",
            response,
            broadcast=True
        )