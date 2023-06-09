import { useState } from "react";
import GameForm from "./GameForm";
import Scores from "./Scores";
import api from "../../utils/api-client";
// import { useEffect } from "react";

function NewGame() {
  const [players, setPlayers] = useState(() => {
    const storedPlayers = JSON.parse(window.localStorage.getItem("players"));
    if (storedPlayers === null) {
      return [];
    } else {
      let players = storedPlayers.map(p => {
        return p.username;
      })  
      return players;
    }
  });
  const [gameState, setGameState] = useState(() => {
    const status = JSON.parse(window.localStorage.getItem("status"));
    if (status === "finished") {
      return "finished";
    } else if (status === "in progress") {
      return "in progress";
    } else {
      return "idle";
    }
  });

  // useEffect(() => {
  //   console.log("Players en el estado de NewGame")
  //   console.log(players);
  // }, [players, gameState]);

  function handleStartGame() {
    const table = window.localStorage.getItem("table");
    if (table) {
      window.localStorage.removeItem("table");
    }
    const playersForBackend = players.map((p) => {
      return { username: p, score: 0, bid: 0, bidsLost: 0 };
    });
    api.createGame(playersForBackend).then((res) => {
      console.log(res.data);
      window.localStorage.setItem(
        "cardsPerRound",
        JSON.stringify(res.data.cardsPerRound)
      );
      window.localStorage.setItem("gameId", res.data.id);
      window.localStorage.setItem("round", res.data.round);
      window.localStorage.setItem("status", JSON.stringify(res.data.status));
      const players = window.localStorage.getItem("players");
      if (players) {
        window.localStorage.removeItem("players");
      }
      window.localStorage.setItem("players", JSON.stringify(res.data.players));
      setGameState("in progress");
    });
  }

  function finishGame() {
    const gameId = window.localStorage.getItem("gameId");
    const user = window.localStorage.getItem("user");
    const table = JSON.parse(window.localStorage.getItem("table"))
    const players = JSON.parse(window.localStorage.getItem("players"))
    const winner = table[0].username;

    api
      .finishGame(players, gameId, user, winner)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function playAgain() {
    finishGame()
    setGameState("finished");
    handleStartGame();
  }

  function backToForm() {
    finishGame()
    setGameState("finished");
  }

  return gameState === "idle" || gameState === "finished" ? (
    <GameForm
      players={players}
      setPlayers={setPlayers}
      gameState={gameState}
      setGameState={setGameState}
      handleStartGame={handleStartGame}
    />
  ) : (
    <Scores
      setGameState={setGameState}
      playAgain={playAgain}
      backToForm={backToForm}
    />
  );
}

export default NewGame;
