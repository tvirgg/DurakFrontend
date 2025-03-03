# Documentation for Game Components

## Overview
This documentation describes the main components used in the implementation of the game, located in the `src/game` directory. It outlines the purpose of each component, its key functionality, and how it interacts with other parts of the system.

## Components

### 1. `Lobby.js`
**Purpose:**
- Manages the lobby where players wait for the game to start.
- Displays the number of connected players and waits until the required number of players join.

**Key Functionality:**
- Uses `connectToSocket.js` to connect to the server and listen for `playerJoined` events.
- Updates the UI with the number of connected players.
- Starts the game when the required number of players has joined.

### 2. `connectToSocket.js`
**Purpose:**
- Handles socket connection logic for the game.

**Key Functionality:**
- Connects a player to the game server.
- Listens for socket events such as `playerJoined` to update the game status.
- Handles reconnections in case of connection drops.

### 3. `GameStart.js`
**Purpose:**
- Manages the transition from the lobby to active gameplay.
- Responsible for initializing the game.

**Key Functionality:**
- Sends a `/start` request to the server when enough players have joined.
- Receives a game start notification and initiates card distribution.
- Updates the state to reflect the game start.

### 4. `api/play.js`
**Purpose:**
- Handles player actions during the game, particularly for attacks and defenses.

**Key Functionality:**
- Sends `/play` requests to the server.
- Processes both attacks and defenses.
  - For attacks: Sends `attackCard` to specify the played card.
  - For defenses: Sends both `attackCard` and `defendCard` to specify the defending card.
- Handles server responses, including errors (e.g., invalid moves).

### 5. `GameTable.js`
**Purpose:**
- Represents the main game interface where players make their moves.

**Key Functionality:**
- Displays the game table and each player's cards.
- Handles player actions such as selecting a card for attack or defense.
- Updates card positions on the table based on the game status (attack or defense).
- Listens for changes from socket events and updates the game state accordingly.

### 6. `GameTimer.js`
**Purpose:**
- Implements a timer to manage turn duration.

**Key Functionality:**
- Starts a timer at the beginning of each turn.
- Resets the timer after each player action (`/play` request).
- Calls `/finish-turn` via `api/finishTurn.js` when the timer runs out to end the turn.

### 7. `api/finishTurn.js`
**Purpose:**
- Handles logic for ending a player's turn.

**Key Functionality:**
- Sends a `/finish-turn` request to the server.
- On success, updates the game state by removing played cards and distributing new ones.

### 8. `CardAnimations.js`
**Purpose:**
- Manages animations for cards during attacks, defenses, and card distribution.

**Key Functionality:**
- Uses functions from `touchevents`, `scriptedCardMoves`, and `animationUtils` to control card movement.
- Handles animations for placing cards on the table, shaking cards for invalid moves, and distributing cards to players.

### 9. `GameContext.js`
**Purpose:**
- Provides a shared context for game state, making it easy to access current game data across various components.

**Key Functionality:**
- Stores information about players, game status, cards in play, and other relevant details.
- Allows components like `GameTable.js`, `GameTimer.js`, and `GameStart.js` to access and modify game state.

### Supporting Animation Files

#### `touchevents.js`
- Contains touch and drag event handlers used for moving cards on mobile devices.

#### `scriptedCardMoves.js`
- Provides scripted card movements such as dealing cards to each player or moving cards from one point to another.

#### `animationUtils.js`
- Contains utilities for various animations, such as shaking a card for invalid moves or smoothly moving cards on the table.

## Recommended Workflow
1. **Lobby Setup (`Lobby.js` and `connectToSocket.js`)**: Implement the lobby where players wait for other players to join, including socket event handling.
2. **Game Start (`GameStart.js`)**: When enough players have joined, use `/start` to initiate the game and deal cards.
3. **Gameplay (`GameTable.js`, `api/play.js`)**: Implement the core game loop with attacks and defenses, using `/play` requests to update the game state.
4. **Turn Management (`GameTimer.js`, `api/finishTurn.js`)**: Ensure turns end correctly when the timer expires, and properly remove and redistribute cards.
5. **Animations (`CardAnimations.js`, supporting files)**: Integrate animations throughout the game to make it feel smooth and responsive for all actions.
