from flask import request
from flask_socketio import emit

from ..shared.session_storage import connected_roles


def register_connection_events(socketio):

    @socketio.on("connect")
    def handle_connect(auth):

        role = auth.get("role")

        if role not in [
            "goalkeeper",
            "shooter"
        ]:

            return False

        if connected_roles[role] is not None:

            return False

        connected_roles[role] = request.sid

        print(
            f"{role} conectado"
        )

        emit("server_message", {
            "message":
            f"Conectado como {role}"
        })


    @socketio.on("disconnect")
    def handle_disconnect():

        sid = request.sid

        for role in connected_roles:

            if connected_roles[role] == sid:

                connected_roles[role] = None

                print(
                    f"{role} desconectado"
                )