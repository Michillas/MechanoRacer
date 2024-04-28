const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
require('dotenv').config();

const { nanoid } = require("nanoid");

const expressServer = http.createServer(app);
const io = socketio(expressServer, {
  cors: {
    origin: "https://mechanoracer.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true
  },
});

const Game = require("./models/game");
const quotesAPI = require("./api/quotesAPI");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("SUCCESS >> Connected to database");
  })
  .catch((error) => {
    console.error("ERROR >> Failed to connect to database:", error);
  });

io.on("connect", (socket) => {
  socket.on("userInput", async ({ userInput, gameID }) => {
    try {
      let game = await Game.findById(gameID);
      if (!game.isOpen && !game.isOver) {
        let player = game.players.find(
          (player) => player.socketID === socket.id
        );
        let word = game.words[player.currentWordIndex];
        if (word === userInput) {
          player.currentWordIndex++;
          if (player.currentWordIndex !== game.words.length) {
            game = await game.save();
            io.to(gameID).emit("updateGame", game);
          } else {
            let endTime = new Date().getTime();
            let { startTime } = game;
            player.WPM = calculateWPM(endTime, startTime, player);
            game = await game.save();
            socket.emit("done");
            io.to(gameID).emit("updateGame", game);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("timer", async ({ gameID, playerID }) => {
    let countDown = 5;
    let game = await Game.findById(gameID);
    let player = game.players.id(playerID);
    if (player.isPartyLeader) {
      let timerID = setInterval(async () => {
        if (countDown >= 0) {
          io.to(gameID).emit("timer", { countDown, msg: "Empezando Partida" });
          countDown--;
        } else {
          game.isOpen = false;
          game = await game.save();
          io.to(gameID).emit("updateGame", game);
          startGameClock(gameID);
          clearInterval(timerID);
        }
      }, 1000);
    }
  });

  socket.on("join-game", async ({ gameID: gameCode, nickName }) => {
    try {
      let game = await Game.findOne({ gameCode: gameCode });
      if (game.isOpen) {
        const gameID = game._id.toString();
        socket.join(gameID);
        let player = {
          socketID: socket.id,
          nickName,
        };
        game.players.push(player);
        game = await game.save();
        io.to(gameID).emit("updateGame", game);
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("create-game", async (nickName) => {
    try {
      const quotableData = await quotesAPI();
      let game = new Game();
      game.words = quotableData.content.split(" ");
      let player = {
        socketID: socket.id,
        isPartyLeader: true,
        nickName,
      };
      game.players.push(player);
      game.gameCode = nanoid(6);
      game = await game.save();
      const gameID = game._id.toString();
      socket.join(gameID);
      io.to(gameID).emit("updateGame", game);
    } catch (err) {
      console.log(err);
    }
  });
});

const startGameClock = async (gameID) => {
  let game = await Game.findById(gameID);
  game.startTime = new Date().getTime();
  game = await game.save();
  let time = 60;
  let timerID = setInterval(
    (function gameIntervalFunc() {
      if (time >= 0) {
        const formatTime = calculateTime(time);
        io.to(gameID).emit("timer", {
          countDown: formatTime,
          msg: "Tiempo Restante",
        });
        time--;
      } else {
        (async () => {
          let endTime = new Date().getTime();
          let game = await Game.findById(gameID);
          let { startTime } = game;
          game.isOver = true;
          game.players.forEach((player, index) => {
            if (player.WPM === -1)
              game.players[index].WPM = calculateWPM(
                endTime,
                startTime,
                player
              );
          });
          game = await game.save();
          io.to(gameID).emit("updateGame", game);
          clearInterval(timerID);
          io.to(gameID).emit("endgame", game);
        })();
      }
      return gameIntervalFunc;
    })(),
    1000
  );
};

const calculateTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const calculateWPM = (endTime, startTime, player) => {
  let numOfWords = player.currentWordIndex;
  const timeInSeconds = (endTime - startTime) / 1000;
  const timeInMinutes = timeInSeconds / 60;
  const WPM = Math.floor(numOfWords / timeInMinutes);
  return WPM;
};