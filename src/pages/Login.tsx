// File: pages/Login.tsx
import { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LoginPayload } from "../types";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const credentials: LoginPayload = { email, password };
      await login(credentials);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError("Email ou senha inválidos. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
      }}
    >
      <Container maxWidth="xs" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
              Bem-vindo!
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Faça login para acessar o painel de workshops.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error && !email}
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error && !password}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Entrar"}
              </Button>
            </motion.div>

            <Typography variant="body2" color="text.secondary" mt={2}>
              Não tem conta?{" "}
              <Typography
                component="span"
                color="primary"
                sx={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => navigate("/register")}
              >
                Cadastre-se
              </Typography>
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
