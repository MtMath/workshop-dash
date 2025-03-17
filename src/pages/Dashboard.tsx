import { Container, Box } from "@mui/material";
import Header from "../components/Header";
import { Routes, Route } from "react-router-dom";
import Collaborators from "./Collaborators";
import Workshops from "./Workshops";

export default function Dashboard() {
  return (
    <Box>
      <Header />
      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route path="/collaborators" element={<Collaborators />} />
          <Route path="/workshops" element={<Workshops />} />
        </Routes>
      </Container>
    </Box>
  );
}
