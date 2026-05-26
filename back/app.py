from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

from events.connection_events import (register_connection_events)

from events.goalkeeper_events import (register_goalkeeper_events)
from events.shooter_events import (register_shooter_events)


app = Flask(__name__)

CORS(app)

socketio = SocketIO(
    app,
    cors_allowed_origins="*"
)

register_connection_events(socketio)
register_goalkeeper_events(socketio)
register_shooter_events(socketio)


@app.route("/")
def home():

    return {
        "message":
        "FSM Penales Running"
    }


if __name__ == "__main__":

    print("FSM Penales iniciado")
    
    socketio.run(
        app,
        host="0.0.0.0",
        port=5000,
        debug=True
    )
