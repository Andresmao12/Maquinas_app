# FSM Penales — Documentación Técnica y Guía de Implementación


# 1. Descripción General

## ¿Qué es FSM Penales?

**FSM Penales** es una aplicación cliente-servidor desarrollada para simular una tanda de penales utilizando el modelo de una **Máquina de Estados Finitos (Finite State Machine - FSM)**.

El sistema permite la interacción en tiempo real entre dos roles:

- **Pateador (Shooter)** → realiza disparos a diferentes coordenadas de la portería.
- **Portero (Goalkeeper)** → configura las zonas que serán bloqueadas.

La comunicación entre frontend y backend se realiza mediante **WebSockets** usando **Socket.IO**, permitiendo actualizaciones instantáneas del estado del juego sin necesidad de recargar la interfaz.



## Propósito Académico

El proyecto fue desarrollado con fines académicos para aplicar conceptos de:

- Matemáticas discretas
- Máquinas de estados finitos
- Arquitectura cliente-servidor
- Comunicación en tiempo real
- Programación reactiva
- Desarrollo Full Stack



# 2. Objetivos del Proyecto

## 2.1 Objetivo General

Implementar una simulación interactiva de una tanda de penales basada en una Máquina de Estados Finitos utilizando tecnologías web modernas.



## 2.2 Objetivos Específicos

- Modelar el flujo del juego mediante estados y transiciones.
- Implementar comunicación bidireccional en tiempo real.
- Representar visualmente el comportamiento de la FSM.
- Gestionar múltiples roles conectados al servidor.
- Aplicar arquitectura frontend/backend desacoplada.



# 3. Arquitectura del Sistema

## 3.1 Arquitectura General

```text
┌─────────────────────┐
│      Frontend       │
│       React         │
│   Socket.IO Client  │
└─────────┬───────────┘
          │ WebSocket
          │
┌─────────▼───────────┐
│       Backend       │
│       Flask         │
│   Flask-SocketIO    │
│      Eventlet       │
└─────────────────────┘
```



## 3.2 Flujo de Comunicación

1. El usuario selecciona un rol.
2. El frontend establece conexión con el backend mediante Socket.IO.
3. El usuario realiza acciones (disparos o configuración de portería).
4. El backend procesa la lógica FSM.
5. El servidor emite eventos en tiempo real al frontend.
6. La interfaz actualiza estados, marcador e historial.



# 4. Tecnologías Utilizadas

## 4.1 Frontend

| Tecnología | Uso |
|--|---|
| React | Construcción de interfaz |
| Vite | Entorno de desarrollo |
| Socket.IO Client | Comunicación en tiempo real |
| Framer Motion | Animaciones |
| CSS Modules | Estilos encapsulados |



## 4.2 Backend

| Tecnología | Uso |
|---|---|
| Python | Lenguaje principal |
| Flask | Framework backend |
| Flask-SocketIO | WebSockets |
| Eventlet | Servidor asíncrono |



# 5. Conceptos Fundamentales

## 5.1 Máquina de Estados Finitos (FSM)

Una **Máquina de Estados Finitos** es un modelo matemático utilizado para representar sistemas que cambian entre diferentes estados en respuesta a eventos o entradas.

Una FSM está compuesta por:

- Conjunto de estados
- Estado inicial
- Transiciones
- Eventos de entrada
- Estados finales



## 5.2 ¿Por qué este proyecto es una FSM?

El sistema cumple las características de una FSM porque el comportamiento del juego depende completamente del estado actual y del resultado de cada disparo.



## 5.3 Estados del Sistema

```text
q0 → Estado inicial
q1 → 1 gol recibido
q2 → 2 goles recibidos
q3 → 3 goles recibidos
q4 → 4 goles recibidos
q5 → Estado final (derrota del portero)
```



## 5.4 Transiciones

Las transiciones ocurren dependiendo del resultado del disparo:

| Evento | Acción |
|--|---|
| Gol | Avanza al siguiente estado |
| Tapada | Permanece en el estado actual |



## 5.5 Estado Final

El estado `q5` representa el final de la partida.



# 6. Estructura del Proyecto

## 6.1 Frontend

```text
front/
│
├── src/
│   ├── components/
│   │   ├── ConnectionPanel/
│   │   ├── FSMVisualizer/
│   │   ├── GameOverModal/
│   │   ├── GoalGrid/
│   │   ├── GoalkeeperSetup/
│   │   ├── RoleSelector/
│   │   ├── ScoreBoard/
│   │   └── ShotHistory/
│   │
│   ├── services/
│   │   └── socket.js
│   │
│   ├── styles/
│   │   └── global.css
|   |   └── variables.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```



## 6.2 Backend

```text
back/
│
├── events/
│   ├── connection_events.py
│   ├── decorators.py
│   ├── goalkeeper_events.py
│   └── shooter_events.py
│
├── shared/
│   ├── constants.py
│   ├── fsm.py
│   ├── session_storage.py
│   └── validators.py
│
├── venv/
│
├── .gitignore
├── app.py
├── game_manager.py
└── requirements.txt
```



# 7. Requisitos del Sistema

## 7.1 Software Requerido

| Software | Versión Recomendada |
|---|---|
| Python | 3.11 |
| Node.js | 20+ |
| npm | 10+ |
| Git | Última versión |



# 8. Instalación del Proyecto

## 8.1 Clonar el Repositorio

```bash
git clone https://github.com/USUARIO/REPOSITORIO.git
```



## 8.2 Entrar al Proyecto

```bash
cd REPOSITORIO
```



# 9. Configuración del Backend

## 9.1 Entrar a la carpeta backend

```bash
cd back
```



## 9.2 Crear entorno virtual

### Windows

```bash
python -m venv venv
```

### Linux / Mac

```bash
python3 -m venv venv
```



## 9.3 Activar entorno virtual

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```



## 9.4 Instalar dependencias

```bash
pip install -r requirements.txt
```



## 9.5 Dependencias principales

```txt
flask
flask-socketio
eventlet
```


## 9.6 Ejecutar servidor

```bash
python app.py
```


## 9.7 Resultado esperado

```text
FSM Penales iniciado
(2400) wsgi starting up on http://0.0.0.0:5000
```



# 10. Configuración del Frontend

## 10.1 Entrar a la carpeta frontend

```bash
cd front
```



## 10.2 Instalar dependencias

```bash
npm install
```



## 10.3 Dependencias principales

```txt
react
vite
socket.io-client
framer-motion
```



## 10.4 Ejecutar frontend

```bash
npm run dev
```



## 10.5 Resultado esperado

```text
Local: http://localhost:5173/
```


# 11. Flujo de Ejecución

## Paso 1

Iniciar el backend.


## Paso 2

Iniciar el frontend.


## Paso 3

Abrir el navegador en:

```text
http://localhost:5173
```


## Paso 4

Seleccionar un rol:

- Portero
- Pateador


## Paso 5

Conectarse al servidor utilizando:

```text
localhost
```


## Paso 6

Interactuar con la portería.


# 12. Comunicación Cliente-Servidor

## 12.1 Evento de Conexión

```javascript
socket.on("connect")
```

Se ejecuta cuando el cliente establece conexión con el servidor.


## 12.2 Evento `shoot`

```javascript
socket.emit("shoot", {
    coordinate
});
```

Envía una coordenada al backend.



## 12.3 Evento `shot_result`

```javascript
socket.on("shot_result")
```

Retorna:

- Estado actual
- Resultado del disparo
- Goles
- Tapadas
- Transición FSM



# 13. Lógica de Estados

## 13.1 Ejemplo de Transición

```text
Estado actual: q2
Evento: Gol
Nuevo estado: q3
```



## 13.2 Tabla de Estados

| Estado | Significado |
|---|---|
| q0 | Inicio |
| q1 | 1 gol |
| q2 | 2 goles |
| q3 | 3 goles |
| q4 | 4 goles |
| q5 | Fin del juego |



# 14. Componentes Principales

## 14.1 RoleSelector

Permite seleccionar el rol del usuario.



## 14.2 GoalGrid

Renderiza la portería interactiva.



## 14.3 ScoreBoard

Muestra:

- Goles
- Tapadas
- Tiros realizados



## 14.4 FSMVisualizer

Representa visualmente la Máquina de Estados.



## 14.5 ShotHistory

Muestra el historial de disparos realizados.



## 14.6 GameOverModal

Pantalla final del juego.



# 15. Manejo de Errores

## 15.1 Error `ERR_ADDRESS_INVALID`

### Causa

Uso incorrecto de:

```text
0.0.0.0
```

como dirección de conexión desde el frontend.



### Solución

Conectarse usando:

```text
localhost
```

o:

```text
127.0.0.1
```



## 15.2 Error `Cannot read properties of undefined`

### Causa

Acceso a propiedades de objetos no inicializados.



### Solución

Inicializar correctamente el estado:

```javascript
const [gameData, setGameData] = useState({
    goals: 0,
    saves: 0,
    shots: 0
});
```



# 16. Ejemplo de Conexión Socket.IO

## 16.1 Cliente

```javascript
socket = io("http://localhost:5000", {
    auth: { role }
});
```



## 16.2 Servidor

```python
@socketio.on("connect")
def handle_connect(auth):
    print("Cliente conectado")
```



# 17. Características Implementadas

## Funcionalidades

- Comunicación en tiempo real
- Visualización FSM
- Historial de tiros
- Sistema de roles
- Animaciones
- Modal de fin de partida
- Marcador dinámico
- Validación de disparos
- Gestión de estados



# 18. Posibles Mejoras Futuras

## 18.1 Escalabilidad

- Base de datos
- Sistema de usuarios
- Ranking
- Multiplayer real
- Persistencia de partidas



## 18.2 Mejoras Técnicas

- Docker
- Tests automatizados
- Redux / Zustand
- JWT Authentication
- Deployment cloud



# 19. Conclusiones

FSM Penales demuestra la aplicación práctica de las Máquinas de Estados Finitos dentro del desarrollo de software interactivo.

El proyecto integra:

- Modelado matemático
- Programación reactiva
- Arquitectura distribuida
- Comunicación en tiempo real
- Interfaces modernas

Además, permite comprender cómo una FSM puede representar de forma clara y controlada el comportamiento de un sistema dinámico basado en eventos.



# 20. Créditos

Proyecto desarrollado con:

- React
- Flask
- Flask-SocketIO
- Eventlet
- Socket.IO
- Framer Motion



# 21. Licencia

Proyecto de uso académico y educativo.