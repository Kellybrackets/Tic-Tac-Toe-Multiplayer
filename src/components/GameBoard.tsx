
interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  disabled: boolean;
  winner: string | null;
}

const GameBoard = ({ board, onCellClick, disabled, winner }: GameBoardProps) => {
  const getCellClass = (index: number) => {
    let baseClass = "w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg flex items-center justify-center text-3xl md:text-4xl font-bold transition-all duration-300 hover:bg-white/30 hover:scale-105 cursor-pointer";
    
    if (disabled || board[index]) {
      baseClass += " cursor-not-allowed";
    }
    
    if (board[index] === 'X') {
      baseClass += " text-blue-400";
    } else if (board[index] === 'O') {
      baseClass += " text-red-400";
    } else {
      baseClass += " text-white";
    }
    
    return baseClass;
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-3 p-6 bg-white/5 rounded-2xl backdrop-blur-lg">
        {board.map((cell, index) => (
          <button
            key={index}
            className={getCellClass(index)}
            onClick={() => onCellClick(index)}
            disabled={disabled || !!cell}
          >
            <span className="animate-scale-in">{cell}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
