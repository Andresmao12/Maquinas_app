VALID_ROWS = ["A", "B", "C", "D"]
VALID_COLUMNS = [str(i) for i in range(1, 9)]

MAX_SHOTS = 5

RESPONSES = {
    "SAVE": "200:TAPO",
    "OK": "201:OK",
    "GOAL": "202:GOL",
    "INVALID": "404:INVALIDO",
    "REPEATED": "409:REPETIDO"
}

FSM_STATES = {
    0: "q0",
    1: "q1",
    2: "q2",
    3: "q3",
    4: "q4",
    5: "q5"
}