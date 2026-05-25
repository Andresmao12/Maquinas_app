from functools import wraps

from flask import request
from flask_socketio import emit

from shared.session_storage import connected_roles


def role_required(required_role):

    def decorator(func):

        @wraps(func)
        def wrapper(*args, **kwargs):

            sid = request.sid

            if connected_roles.get(required_role) != sid:

                emit("unauthorized", {
                    "message":
                    f"Acceso denegado para {required_role}"
                })

                return

            return func(*args, **kwargs)

        return wrapper

    return decorator