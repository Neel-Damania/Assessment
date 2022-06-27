const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("Welcome");
});

app.get("/game/start", function (req, res) {
  function solve(a, b) {
    if (a === b) return 0;
    if (a == "rock") {
      if (b === "scissors") return 1;
      else return -1;
    } else if (a === "paper") {
      if (b === "rock") return 1;
      else return -1;
    } else {
      if (b === "paper") return 1;
      else return -1;
    }
  }

  function generateRand() {
    var player = Math.floor(Math.random() * 3);
    if (player === 0) ans = "rock";
    else if (player === 1) ans = "paper";
    else ans = "scissors";
    return ans;
  }

  function genResult(arr) {
    let n = arr.length;
    let array = [];

    for (l = 0; l < n; l++) {
      let count = 0;
      for (k = 0; k < n; k++) {
        solution = solve(arr[l], arr[k]);
        if (solution === 1) count++;
      }
      array.push(count);
    }
    return array;
  }

  results = [];
  lists = [0, 0, 0, 0];
  for (i = 0; i < 50; i++) {
    attempt = [];
    list = [];
    for (j = 0; j < 4; j++) {
      attempt.push(generateRand());
    }
    input = {
      player_1: attempt[0],
      player_2: attempt[1],
      player_3: attempt[2],
      player_4: attempt[3],
    };

    list = genResult(attempt);
    for (q = 0; q < 4; q++) lists[q] = lists[q] + list[q];

    
    output = {
      player_1: lists[0],
      player_2: lists[1],
      player_3: lists[2],
      player_4: lists[3],
    };
    results.push({ input, output });
  }

  res.status(200).send({ results });

  res.send("");
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
