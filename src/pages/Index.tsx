
import { useState } from 'react';
import GameLobby from '@/components/GameLobby';
import TicTacToe from '@/components/TicTacToe';

export interface GameState {
  id: string;
  board: (string | null)[];
  currentPlayer: 'X' | 'O';
  players: {
    X: { name: string; id: string };
    O: { name: string; id: string } | null;
  };
  winner: string | null;
  status: 'waiting' | 'playing' | 'finished';
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [playerId] = useState(() => Math.random().toString(36).substr(2, 9));

  const handleJoinGame = (game: GameState, name: string) => {
    setGameState(game);
    setPlayerName(name);
  };

  const handleLeaveGame = () => {
    setGameState(null);
    setPlayerName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
            Multiplayer Tic-Tac-Toe
          </h1>
          <p className="text-xl text-purple-100 animate-fade-in">
            Play with friends in real-time!
          </p>
        </div>

        {!gameState ? (
          <GameLobby onJoinGame={handleJoinGame} playerId={playerId} />
        ) : (
          <TicTacToe 
            gameState={gameState} 
            setGameState={setGameState}
            playerName={playerName}
            playerId={playerId}
            onLeaveGame={handleLeaveGame}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
