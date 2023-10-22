import { useRef, useState } from 'react';
import GameLoop from './scripts/GameLoop';
import { screenInit } from './scripts/Utils';

function MainApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<GameLoop | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [debugInfo, setDebugInfo] = useState('');

  const startGame = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      screenInit(canvasRef);
      gameLoopRef.current = new GameLoop(
        canvas,
        ctx,
        setDebugInfo,
      );
      gameLoopRef.current.Init.init();
      gameLoopRef.current.animate();
      setTimeout(() => {
        setIsGameStarted(true);
      }, 100);
    }
  };

  return (
    <div>
      <div className="canvas-container" id="canvas-container">
        <canvas ref={canvasRef} id="canvas"></canvas>
      </div>

      {!isGameStarted && (
        <div className="startScreen">
          <button className="startButton btn" onClick={startGame}>
            <span className="triangle-right"></span>
          </button>
        </div>
      )}
      <div className="debug" id="debug">
        {debugInfo}
      </div>
    </div>
  );
}

export default MainApp;
