
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';
import { GameState } from '@/pages/Index';

interface GameLobbyProps {
  onJoinGame: (game: GameState, playerName: string) => void;
  playerId: string;
}

const GameLobby = ({ onJoinGame, playerId }: GameLobbyProps) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const startLocalGame = () => {
    if (!player1Name.trim() || !player2Name.trim()) return;
    
    const localGame: GameState = {
      id: 'LOCAL',
      board: Array(9).fill(null),
      currentPlayer: 'X',
      players: {
        X: { name: player1Name.trim(), id: 'player-1' },
        O: { name: player2Name.trim(), id: 'player-2' }
      },
      winner: null,
      status: 'playing'
    };
    
    onJoinGame(localGame, player1Name.trim());
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-center flex items-center justify-center gap-2">
            <Users className="w-6 h-6" />
            Local Multiplayer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="player1Name" className="text-purple-100">Player 1 Name (X)</Label>
              <Input
                id="player1Name"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                placeholder="Enter Player 1 name"
                className="bg-white/20 border-white/30 text-white placeholder:text-purple-200"
              />
            </div>
            <div>
              <Label htmlFor="player2Name" className="text-purple-100">Player 2 Name (O)</Label>
              <Input
                id="player2Name"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                placeholder="Enter Player 2 name"
                className="bg-white/20 border-white/30 text-white placeholder:text-purple-200"
              />
            </div>
            <Button 
              onClick={startLocalGame}
              disabled={!player1Name.trim() || !player2Name.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              Start Local Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameLobby;
