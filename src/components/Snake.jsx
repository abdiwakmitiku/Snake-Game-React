import React, { useEffect, useRef } from "react";

function Snake() {
  const canvasRef = useRef(null);
  const scoreValRef = useRef(null);
  const gameOverBoxRef = useRef(null);
  const gameOverScoreRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const scoreVal = scoreValRef.current;
    const gameOverBox = gameOverBoxRef.current;
    const gameOverScore = gameOverScoreRef.current;

    const scale = 10;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;
    let score = 0;

    let snake = [];
    snake[0] = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    };

    const generateFood = (snake, columns, rows, scale) => {
      let food;
      while (true) {
        food = {
          x: Math.floor(Math.random() * columns) * scale,
          y: Math.floor(Math.random() * rows) * scale,
        };

        let foodOnSnake = false;
        for (let segment of snake) {
          if (segment.x === food.x && segment.y === food.y) {
            foodOnSnake = true;
            break;
          }
        }

        if (!foodOnSnake) break;
      }
      return food;
    };

    let food = generateFood(snake, columns, rows, scale);
    let d = "right";

    const direction = (event) => {
      let key = event.keyCode;
      if (key == 37 && d != "right") {
        d = "left";
      } else if (key == 38 && d != "down") {
        d = "up";
      } else if (key == 39 && d != "left") {
        d = "right";
      } else if (key == 40 && d != "up") {
        d = "down";
      }
    };

    document.addEventListener("keydown", direction);

    const eatSelf = (head, array) => {
      for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
          return true;
        }
      }
      return false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw snake
      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#39c3f2";
        ctx.strokeStyle = "#39c3f2";
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
        ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
      }

      // Draw food
      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, scale, scale);

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;
      if (d == "left") snakeX -= scale;
      if (d == "right") snakeX += scale;
      if (d == "up") snakeY -= scale;
      if (d == "down") snakeY += scale;

      if (snakeX > canvas.width) {
        snakeX = 0;
      }
      if (snakeY > canvas.height) {
        snakeY = 0;
      }
      if (snakeX < 0) {
        snakeX = canvas.width;
      }
      if (snakeY < 0) {
        snakeY = canvas.height;
      }

      if (snakeX == food.x && snakeY == food.y) {
        score++;
        scoreVal.textContent = score;
        food = generateFood(snake, columns, rows, scale);
      } else {
        snake.pop();
      }

      let newHead = {
        x: snakeX,
        y: snakeY,
      };

      if (eatSelf(newHead, snake)) {
        clearInterval(playGame);
        gameOverBox.style.display = "block";
        gameOverScore.textContent = score;
        return;
      }
      snake.unshift(newHead);
    };

    const playGame = setInterval(draw, 90);

    return () => {
      clearInterval(playGame);
      document.removeEventListener("keydown", direction);
    };
  }, []);

  return (
    <>
      <div className="wrapper">
        <div>
          <h1 className="title">Snake Game</h1>
        </div>
        <div className="score">
          <span>
            Score:{" "}
            <span ref={scoreValRef} className="score-val">
              0
            </span>
          </span>
        </div>
        <canvas
          ref={canvasRef}
          className="canvas"
          width="400"
          height="400"
        ></canvas>
        <div className="gob">
          <div ref={gameOverBoxRef} className="game-over-box">
            <h2>Game Over</h2>
            <p>
              Your Score is{" "}
              <span ref={gameOverScoreRef} className="game-over-score">
                0
              </span>
            </p>
          </div>
        </div>
      </div>
      <h4>Developed By: Abdiwak Mitiku</h4>
    </>
  );
}

export default Snake;
