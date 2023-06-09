import { useState, useEffect } from "react";
import api from "../../utils/api-client.js";
import { Box } from "@mui/material";
import PlayerCard from "../../components/playerCard/index.jsx";

function Players() {
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    api
      .getPlayers()
      .then((response) => {
        const sortedPlayers = response.data.sort((a, b) => b.gamesPlayed - a.gamesPlayed) 
        setPlayers(sortedPlayers);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dfknsvqer/image/upload/v1686776538/mike-perez-aslf3jEpDBI-unsplash_zee7cp.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: "20px",
        }}
      >
        {players
          ? players.map((p) => {
              return (
                <PlayerCard
                  key={p.username}
                  image={p.image}
                  username={p.username}
                  winned={p.gamesWon}
                  stats={[
                    { label: "Jugadas", value: p.gamesPlayed },
                    { label: "PPP", value: (p.totalScore / p.gamesPlayed).toFixed(1) },
                  ]}
                  width="30%"
                  margin="10px"
                />
              );
            })
          : null}
      </Box>
    </div>
  );
}

export default Players;
