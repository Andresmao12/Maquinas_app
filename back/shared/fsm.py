from shared.constants import FSM_STATES


class GoalkeeperFSM:

    def __init__(self):
        """
        Estado inicial: q0 - no se han realizado disparos
        """

        self.current_state = FSM_STATES[0]
        self.goals_conceded = 0

    def shot_fired(self, result: bool):
        """
        Cambiamos estado dependiendo del resultado del tiro
        """

        # Luego de la primera jugada cambia el estado a q1 (ya se realizó un disparo)
        if self.current_state==FSM_STATES[0]: self.current_state = FSM_STATES[1]

        # Si el resultado es gol, incrementamos
        if result:
            self.goals_conceded += 1

            new_state = min(self.goals_conceded + 1, 5)
            self.current_state = FSM_STATES[new_state]

        return self.current_state

    def is_defeated(self):
        """
        Verifica si el portero perdió.
        """

        return self.current_state == FSM_STATES[5]