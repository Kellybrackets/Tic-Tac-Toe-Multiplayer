
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import GameBoard from '@/components/GameBoard';
import { GameState } from '@/pages/Index';
import { checkWinner } from '@/utils/gameUtils';

interface TicTacToeProps {
  gameState: GameState;
  setGameState: (game: GameState) => void;
  playerName: string;
  playerId: string;
  onLeaveGame: () => void;
}

const TicTacToe = ({ gameState, setGameState, onLeaveGame }: TicTacToeProps) => {
  const isLocalGame = gameState.id === 'LOCAL';
  const currentPlayerName = gameState.currentPlayer === 'X' ? gameState.players.X.name : gameState.players.O?.name;

  const makeMove = (index: number) => {
    console.log('Making move at index:', index);
    console.log('Current game state:', gameState);
    console.log('Cell value:', gameState.board[index]);
    
    // Check if the move is valid
    if (gameState.board[index] || gameState.winner || gameState.status !== 'playing') {
      console.log('Invalid move: cell occupied or game finished');
      return;
    }

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
    
    const winner = checkWinner(newBoard);
    const isDraw = !winner && newBoard.every(cell => cell !== null);
    
    const newGameState = {
      ...gameState,
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner: winner || (isDraw ? 'draw' : null),
      status: winner || isDraw ? 'finished' : 'playing'
    } as GameState;

    console.log('New game state:', newGameState);
    setGameState(newGameState);
  };

  const resetGame = () => {
    setGameState({
      ...gameState,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      status: 'playing'
    });
  };

  const getGameStatus = () => {
    if (gameState.winner === 'draw') {
      return "It's a draw!";
    }
    if (gameState.winner) {
      const winnerName = gameState.winner === 'X' ? gameState.players.X.name : gameState.players.O?.name;
      return `${winnerName} wins!`;
    }
    return `${currentPlayerName}'s turn`;
  };

  const getStatusColor = () => {
    if (gameState.winner === 'draw') return 'bg-gray-500';
    if (gameState.winner) return 'bg-green-500';
    return gameState.currentPlayer === 'X' ? 'bg-blue-500' : 'bg-red-500';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onLeaveGame}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Game
            </Button>
            <div className="text-white font-semibold">Local Game</div>
          </div>
          
          <div className="text-center">
            <Badge className={`${getStatusColor()} text-white text-lg px-4 py-2`}>
              {getGameStatus()}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Players Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${gameState.currentPlayer === 'X' ? 'bg-blue-500/20 border-2 border-blue-400' : 'bg-white/10'}`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">X</div>
                <div className="text-purple-100">{gameState.players.X.name}</div>
                {gameState.currentPlayer === 'X' && gameState.status === 'playing' && (
                  <Badge className="mt-1 bg-blue-500">Current Turn</Badge>
                )}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${gameState.currentPlayer === 'O' ? 'bg-red-500/20 border-2 border-red-400' : 'bg-white/10'}`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">O</div>
                <div className="text-purple-100">{gameState.players.O?.name}</div>
                {gameState.currentPlayer === 'O' && gameState.status === 'playing' && (
                  <Badge className="mt-1 bg-red-500">Current Turn</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Game Board */}
          <GameBoard 
            board={gameState.board}
            onCellClick={makeMove}
            disabled={gameState.status !== 'playing'}
            winner={gameState.winner}
          />

          {/* Game Controls */}
          {gameState.status === 'finished' && (
            <div className="flex justify-center">
              <Button 
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TicTacToe;
