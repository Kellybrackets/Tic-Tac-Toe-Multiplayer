
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RotateCcw, Copy, Check } from 'lucide-react';
import GameBoard from '@/components/GameBoard';
import { GameState } from '@/pages/Index';
import { checkWinner } from '@/utils/gameUtils';
import { useToast } from '@/hooks/use-toast';

interface TicTacToeProps {
  gameState: GameState;
  setGameState: (game: GameState) => void;
  playerName: string;
  playerId: string;
  onLeaveGame: () => void;
}

const TicTacToe = ({ gameState, setGameState, playerName, playerId, onLeaveGame }: TicTacToeProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const playerSymbol = gameState.players.X.id === playerId ? 'X' : 'O';
  const isMyTurn = gameState.currentPlayer === playerSymbol;
  const opponentName = playerSymbol === 'X' ? gameState.players.O?.name : gameState.players.X.name;

  const copyGameCode = async () => {
    try {
      await navigator.clipboard.writeText(gameState.id);
      setCopied(true);
      toast({
        title: "Game code copied!",
        description: "Share this code with your friend to join the game.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Failed to copy game code');
    }
  };

  const makeMove = (index: number) => {
    if (gameState.board[index] || gameState.winner || !isMyTurn) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
    
    const winner = checkWinner(newBoard);
    const isDraw = !winner && newBoard.every(cell => cell !== null);
    
    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner: winner || (isDraw ? 'draw' : null),
      status: winner || isDraw ? 'finished' : 'playing'
    });
  };

  const resetGame = () => {
    setGameState({
      ...gameState,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      status: gameState.players.O ? 'playing' : 'waiting'
    });
  };

  const getGameStatus = () => {
    if (gameState.status === 'waiting') {
      return `Waiting for opponent... Share code: ${gameState.id}`;
    }
    if (gameState.winner === 'draw') {
      return "It's a draw!";
    }
    if (gameState.winner) {
      const winnerName = gameState.winner === 'X' ? gameState.players.X.name : gameState.players.O?.name;
      return `${winnerName} wins!`;
    }
    if (isMyTurn) {
      return "Your turn";
    }
    return `${opponentName}'s turn`;
  };

  const getStatusColor = () => {
    if (gameState.status === 'waiting') return 'bg-yellow-500';
    if (gameState.winner === 'draw') return 'bg-gray-500';
    if (gameState.winner) {
      return gameState.winner === playerSymbol ? 'bg-green-500' : 'bg-red-500';
    }
    return isMyTurn ? 'bg-blue-500' : 'bg-purple-500';
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
              Leave Game
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-white font-mono">#{gameState.id}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyGameCode}
                className="text-white hover:bg-white/20"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
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
            <div className={`p-4 rounded-lg ${playerSymbol === 'X' ? 'bg-blue-500/20 border-2 border-blue-400' : 'bg-white/10'}`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">X</div>
                <div className="text-purple-100">{gameState.players.X.name}</div>
                {playerSymbol === 'X' && <Badge className="mt-1 bg-blue-500">You</Badge>}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${playerSymbol === 'O' ? 'bg-red-500/20 border-2 border-red-400' : 'bg-white/10'}`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">O</div>
                <div className="text-purple-100">
                  {gameState.players.O?.name || 'Waiting...'}
                </div>
                {playerSymbol === 'O' && <Badge className="mt-1 bg-red-500">You</Badge>}
              </div>
            </div>
          </div>

          {/* Game Board */}
          <GameBoard 
            board={gameState.board}
            onCellClick={makeMove}
            disabled={!isMyTurn || gameState.status !== 'playing'}
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
