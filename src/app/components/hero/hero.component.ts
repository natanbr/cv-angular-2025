import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';

// Game classes
class Ball {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;

  constructor(x: number, y: number, radius: number, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
  }
}

class Paddle {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
  }
}

class Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  visible = true;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.visible) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = 'rgba(0,0,0,0.9)';
      ctx.fill();
      ctx.closePath();
    }
  }
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pongCanvas', { static: true }) pongCanvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private balls: Ball[] = [];
  private paddles: Paddle[] = [];
  private bricks: Brick[] = [];
  private animationFrameId!: number;
  private animationStartTime!: number;
  private readonly animationDuration = 8000; // 8 seconds
  private readonly fadeOutDuration = 1000; // 1 second

  ngAfterViewInit(): void {
    const canvas = this.pongCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.initGame();
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    this.animationStartTime = Date.now();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
  }

  resizeCanvas(): void {
    const canvas = this.pongCanvas.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.initBricks();
  }

  initGame(): void {
    this.initBricks();
    this.initPaddles();
    this.initBalls();
  }

  initBricks(): void {
    this.bricks = [];
    const brickRowCount = 15;
    const brickColumnCount = 25;
    const canvas = this.pongCanvas.nativeElement;
    if (!canvas.width || !canvas.height) return;
    const brickWidth = canvas.width / brickColumnCount;
    const brickHeight = canvas.height / brickRowCount;

    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (c > 4 && r > 2 && c < brickColumnCount - 4 && r < brickRowCount - 2)
          this.bricks.push(new Brick(c * brickWidth, r * brickHeight, brickWidth, brickHeight));
          // continue; // create a hollow center
      }
    }
  }

  initPaddles(): void {
    this.paddles = [];
    const canvas = this.pongCanvas.nativeElement;
    const paddleWidth = 100;
    const paddleHeight = 10;

    // Top and bottom paddles
    this.paddles.push(new Paddle(canvas.width / 2 - paddleWidth / 2, 0, paddleWidth, paddleHeight));
    this.paddles.push(new Paddle(canvas.width / 2 - paddleWidth / 2, canvas.height - paddleHeight, paddleWidth, paddleHeight));

    // Left and right paddles
    this.paddles.push(new Paddle(0, canvas.height / 2 - paddleWidth / 2, paddleHeight, paddleWidth));
    this.paddles.push(new Paddle(canvas.width - paddleHeight, canvas.height / 2 - paddleWidth / 2, paddleHeight, paddleWidth));
  }

  initBalls(): void {
    this.balls = [];
    const canvas = this.pongCanvas.nativeElement;
    // Increased speed for a more dynamic animation that clears in ~5s
    const speed = 9;
    const initialPositions = [
      { x: canvas.width * 0.1, y: canvas.height * 0.3, dx: speed, dy: speed },
      { x: canvas.width * 0.9, y: canvas.height * 0.3, dx: -speed, dy: speed },
      { x: canvas.width * 0.1, y: canvas.height * 0.7, dx: speed, dy: -speed },
      { x: canvas.width * 0.9, y: canvas.height * 0.7, dx: -speed, dy: -speed },
      { x: canvas.width * 0.0, y: canvas.height * 0.0, dx: speed, dy: speed },
      { x: canvas.width * 0.9, y: canvas.height * 0.9, dx: -speed, dy: -speed },
      { x: canvas.width * 0.3, y: canvas.height * 0.5, dx: speed, dy: speed },
      { x: canvas.width * 0.5, y: canvas.height * 0.3, dx: speed, dy: speed },
      { x: canvas.width * 0.7, y: canvas.height * 0.5, dx: -speed, dy: -speed },
    ];

    initialPositions.forEach(pos => {
      this.balls.push(new Ball(pos.x, pos.y, 5, pos.dx, pos.dy));
    });
  }

  animate(): void {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    const elapsedTime = Date.now() - this.animationStartTime;

    const allBricksCleared = this.bricks.every(brick => !brick.visible);

    if (elapsedTime > this.animationDuration || allBricksCleared) {
      this.endAnimation();
      return;
    }

    if (elapsedTime > (this.animationDuration - this.fadeOutDuration)) {
      const canvas = this.pongCanvas.nativeElement;
      this.fadeOutCanvas(canvas, this.fadeOutDuration);
    }

    this.ctx.clearRect(0, 0, this.pongCanvas.nativeElement.width, this.pongCanvas.nativeElement.height);

    this.bricks.forEach(brick => brick.draw(this.ctx));
    this.balls.forEach(ball => {
      ball.draw(this.ctx);
      this.updateBallPosition(ball);
      this.brickCollision(ball);
    });
    this.paddles.forEach(paddle => paddle.draw(this.ctx));
    this.updatePaddles();
  }

  endAnimation(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.ctx.clearRect(0, 0, this.pongCanvas.nativeElement.width, this.pongCanvas.nativeElement.height);
    const canvas = this.pongCanvas.nativeElement;
    if (canvas) {
      canvas.style.display = 'none';
    }
  }

  fadeOutCanvas(canvas: HTMLCanvasElement, duration: number): void {
    let opacity = 1;
    const step = 16 / duration;
    const fade = () => {
      opacity -= step;
      if (opacity <= 0) {
        canvas.style.opacity = '0';
        canvas.style.display = 'none';
      } else {
        canvas.style.opacity = opacity.toString();
        requestAnimationFrame(fade);
      }
    };
    fade();
  }

  updateBallPosition(ball: Ball): void {
    const canvas = this.pongCanvas.nativeElement;
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.dx *= -1;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.dy *= -1;
    }

    // Paddle collision
    this.paddles.forEach(paddle => {
      if (
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width &&
        ball.y > paddle.y &&
        ball.y < paddle.y + paddle.height
      ) {
        if(paddle.width > paddle.height) { // horizontal paddles
             ball.dy *= -1;
        } else { // vertical paddles
            ball.dx *= -1;
        }
      }
    });
  }

  updatePaddles(): void {
    // Scripted paddle movement
    this.paddles.forEach((paddle, index) => {
      // Find the closest ball to each paddle
      let closestBall: Ball | null = null;
      let minDistance = Infinity;

      this.balls.forEach(ball => {
        let distance: number;
        if (index < 2) { // Top and bottom paddles
          distance = Math.abs(ball.y - (paddle.y + paddle.height/2));
        } else { // Left and right paddles
          distance = Math.abs(ball.x - (paddle.x + paddle.width/2));
        }

        if (distance < minDistance) {
          minDistance = distance;
          closestBall = ball;
        }
      });

      if (closestBall) {
        if (index < 2) { // Top and bottom paddles
          paddle.x = (closestBall as Ball).x - paddle.width / 2;
        } else { // Left and right paddles
          paddle.y = (closestBall as Ball).y - paddle.height / 2;
        }
      }
    });
  }

  brickCollision(ball: Ball): void {
    for (const brick of this.bricks) {
      if (brick.visible) {
        if (
          ball.x > brick.x &&
          ball.x < brick.x + brick.width &&
          ball.y > brick.y &&
          ball.y < brick.y + brick.height
        ) {
          brick.visible = false;
          ball.dy *= -1;
          // To prevent multiple collisions in the same frame
          break;
        }
      }
    }
  }

  scrollToAbout(): void {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
