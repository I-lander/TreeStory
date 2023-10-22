export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function screenInit(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const canvas = canvasRef.current;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const  canvasWidth = screenWidth;
  const canvasHeight = screenHeight;

  if (canvas) {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }
}
