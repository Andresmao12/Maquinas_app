from threading import Lock

# Variable global donde almacenaremos el juego actual
game = None
game_lock = Lock() # Lock para sincronizar acceso a la variable global del juego

connected_roles = {
    "goalkeeper": None,
    "shooter": None
}
roles_lock = Lock()