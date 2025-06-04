
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Users } from 'lucide-react';
import { GameState } from '@/pages/Index';
import { generateGameCode } from '@/utils/gameUtils';

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
    
    setIsCreating(true);
    const newGameCode = generateGameCode();
    
    const newGame: GameState = {
      id: newGameCode,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      players: {
        X: { name: playerName.trim(), id: playerId },
        O: null
      },
      winner: null,
      status: 'waiting'
    };
    
    setTimeout(() => {
      setIsCreating(false);
      onJoinGame(newGame, playerName.trim());
    }, 1000);
  };

  const joinGame = () => {
    if (!playerName.trim() || !gameCode.trim()) return;
    
    // For demo purposes, create a game where the user joins as player O
    const existingGame: GameState = {
      id: gameCode.toUpperCase(),
      board: Array(9).fill(null),
      currentPlayer: 'X',
      players: {
        X: { name: 'Player 1', id: 'demo-player-1' },
        O: { name: playerName.trim(), id: playerId }
      },
      winner: null,
      status: 'playing'
    };
    
    onJoinGame(existingGame, playerName.trim());
  };

  const startSinglePlayer = () => {
    if (!playerName.trim()) return;
    
    // Create a single player game where user is X and can play both sides
    const singlePlayerGame: GameState = {
      id: 'SINGLE',
      board: Array(9).fill(null),
      currentPlayer: 'X',
      players: {
        X: { name: playerName.trim(), id: playerId },
        O: { name: 'Player 2', id: 'player-2' }
      },
      winner: null,
      status: 'playing'
    };
    
    onJoinGame(singlePlayerGame, playerName.trim());
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-center">Enter Your Name</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="playerName" className="text-purple-100">Player Name</Label>
              <Input
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                className="bg-white/20 border-white/30 text-white placeholder:text-purple-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Game
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={createGame}
              disabled={!playerName.trim() || isCreating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              {isCreating ? 'Creating...' : 'Create Game'}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Join Existing Game
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="gameCode" className="text-purple-100">Game Code</Label>
                <Input
                  id="gameCode"
                  value={gameCode}
                  onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                  placeholder="Enter game code"
                  className="bg-white/20 border-white/30 text-white placeholder:text-purple-200"
                />
              </div>
              <Button 
                onClick={joinGame}
                disabled={!playerName.trim() || !gameCode.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Join Game
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Practice Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={startSinglePlayer}
              disabled={!playerName.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              Start Practice Game
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameLobby;
