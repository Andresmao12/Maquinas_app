from shared.validators import validate_coordinate
from shared.constants import RESPONSES, MAX_SHOTS
from shared.fsm import GoalkeeperFSM


class GameManager:

    def __init__(self, goalkeeper_positions):

        """
        Inicializa el juego del portero
        """

        # FSM principal
        self.fsm = GoalkeeperFSM()

        # Posiciones protegidas por el portero
        self.goalkeeper_positions = set()

        # Tiros realizados
        self.shots_received = set()

        # Estadísticas
        self.goals = 0
        self.saves = 0

        # Procesar posiciones iniciales
        for position in goalkeeper_positions:
            self.goalkeeper_positions.add(
                position.strip().upper()
            )


    def process_shot(self, coordinate):

        """
        Procesa un disparo recibido desde el cliente
        """

        coordinate = coordinate.strip().upper()

        if not validate_coordinate(coordinate):
            return {
                "status": RESPONSES["INVALID"],
                "state": self.fsm.current_state
            }

        # Validamos si no esta repetido
        if coordinate in self.shots_received:
            return {
                "status": RESPONSES["REPEATED"],
                "state": self.fsm.current_state
            }

        # Registramos el tiro
        self.shots_received.add(coordinate)

        # Verificamos si fue tapo
        if coordinate in self.goalkeeper_positions:
            self.saves += 1

            return {
                "status": RESPONSES["SAVE"],
                "state": self.fsm.current_state
            }

        # Si no fue tapo, es gol
        self.goals += 1

        # Actualizamos FSM
        new_state = self.fsm.transition(result=True)

        return {
            "status": RESPONSES["GOAL"],
            "state": new_state
        }


    def is_game_over(self):

        """
        Verifica si el partido terminó
        """

        return (
            len(self.shots_received) >= MAX_SHOTS
            or self.fsm.is_defeated()
        )


    def get_game_data(self):

        """
        Retorna información general del estado actual del juego
        """

        return {
            "state": self.fsm.current_state,
            "goals": self.goals,
            "saves": self.saves,
            "shots": len(self.shots_received)
        }