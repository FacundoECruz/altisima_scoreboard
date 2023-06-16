/* eslint-disable react/prop-types */
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

function PlayerCard({ image, username, stats }) {
  return (
    <Card sx={{ maxWidth: "150px", width: "30%", margin: "10px", bgcolor: "blue" }}>
      <CardMedia image={image} title={username} sx={{ height: "150px;" }} />
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          {username}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", }}>
          {stats.map((stat, index) => (
            <Typography key={index} variant="body2" sx={{ fontWeight: "bold" }}>
              {stat.label}: {stat.value}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
export default PlayerCard;
