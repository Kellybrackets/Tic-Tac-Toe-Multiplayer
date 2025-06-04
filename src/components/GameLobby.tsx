
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Plus, LogIn } from 'lucide-react';
import { GameState } from '@/pages/Index';

interface GameLobbyProps {
  onJoinGame: (game: GameState, playerName: string) => void;
  playerId: string;
}

const GameLobby = ({ onJoinGame, playerId }: GameLobbyProps) => {
  const [playerName, setPlayerName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const createGame = () => {
    if (!playerName.trim()) return;
    
    const newGameId = Math.random().toString(36).substr(2, 6).toUpperCase();
    const newGame: GameState = {
      id: newGameId,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      players: {
        X: { name: playerName, id: playerId },
        O: null
      },
      winner: null,
      status: 'waiting'
    };
    
    onJoinGame(newGame, playerName);
  };

  const joinGame = () => {
    if (!playerName.trim() || !gameCode.trim()) return;
    
    // In a real app, this would fetch the game from the server
    // For demo purposes, we'll create a game where player joins as O
    const game: GameState = {
      id: gameCode,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      players: {
        X: { name: 'Player 1', id: 'player1' },
        O: { name: playerName, id: playerId }
      },
      winner: null,
      status: 'playing'
    };
    
    onJoinGame(game, playerName);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Create Game Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 animate-scale-in">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Create Game</CardTitle>
            <p className="text-purple-100">Start a new game and invite friends</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder-purple-200"
              />
            </div>
            <Button 
              onClick={createGame}
              disabled={!playerName.trim() || isCreating}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Game
            </Button>
          </CardContent>
        </Card>

        {/* Join Game Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 animate-scale-in">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Join Game</CardTitle>
            <p className="text-purple-100">Enter a game code to join</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder-purple-200"
              />
            </div>
            <div>
              <Input
                placeholder="Enter game code"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                className="bg-white/20 border-white/30 text-white placeholder-purple-200"
              />
            </div>
            <Button 
              onClick={joinGame}
              disabled={!playerName.trim() || !gameCode.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
            >
              <Users className="w-4 h-4 mr-2" />
              Join Game
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Game Rules */}
      <Card className="mt-8 bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-xl text-white text-center">How to Play</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-purple-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">1</span>
              </div>
              <p>Create a game or join with a code</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">2</span>
              </div>
              <p>Take turns placing X's and O's</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">3</span>
              </div>
              <p>Get three in a row to win!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameLobby;
