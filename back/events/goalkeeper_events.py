from flask_socketio import emit

from decorators import role_required

from game_manager import GameManager

from ..shared import session_storage


def register_goalkeeper_events(socketio):

    @socketio.on(
        "initialize_goalkeeper"
    )
    @role_required("goalkeeper")
    def initialize_goalkeeper(data):


        positions = data.get(
            "positions",
            []
        )

        if len(positions) != 12:

            emit(
                "goalkeeper_initialized",
                {
                    "success": False
                }
            )

            return

        with session_storage.game_lock:

            session_storage.game = GameManager(
                positions
            )

        emit(
            "goalkeeper_initialized",
            {
                "success": True
            },
            broadcast=True
        )