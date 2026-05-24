from shared.constants import VALID_ROWS, VALID_COLUMNS


def validate_coordinate(coordinate: str) -> bool:
   
    # Normalizamos mayusculas y espacios
    coordinate = coordinate.strip().upper()

    # Longitud mínima
    if len(coordinate) < 2: return False

    row = coordinate[0]
    column = coordinate[1:]

    # Validamos fila
    if row not in VALID_ROWS: return False

    # Validamos columna
    if column not in VALID_COLUMNS: return False

    return True