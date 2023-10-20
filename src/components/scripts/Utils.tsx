export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function screenInit(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const canvas = canvasRef.current;

  // const desiredRatio = 15 / 8;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const  canvasWidth = screenWidth;
  const canvasHeight = screenHeight;
  // const screenRatio = screenWidth / screenHeight;

  // let canvasWidth, canvasHeight;

  // if (screenRatio > desiredRatio) {
  //   canvasHeight = screenHeight;
  //   canvasWidth = canvasHeight * desiredRatio;
  // } else {
  //   canvasWidth = screenWidth;
  //   canvasHeight = canvasWidth / desiredRatio;
  // }

  // if (canvas) {
  //   const ctx = canvas.getContext('2d');
  //   if (ctx) {
  //     ctx.imageSmoothingEnabled = true;
  //     ctx.imageSmoothingQuality = 'high';
  //   }

  //   const pixelRatio = window.devicePixelRatio || 1;
  if (canvas) {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }
  //   canvas.style.width = canvasWidth + 'px';
  //   canvas.style.height = canvasHeight + 'px';

    // document.documentElement.style.setProperty(
    //   '--tile-size',
    //   `calc(${canvasHeight} / 8 * 1px)`,
    // );
  // }
}
