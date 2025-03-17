import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  useTheme,
  alpha,
  Skeleton,
} from "@mui/material";
import {
  Event as EventIcon,
  People as PeopleIcon,
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon,
  DateRange as DateRangeIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { workshopsService } from "../services/workshopsService";
import { collaboratorsService } from "../services/collaboratorsService";
import { Workshop, Collaborator } from "../types";
import { DashboardCard } from "../components/dashboard/DashboardCard";

export default function Dashboard() {
  const theme = useTheme();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [workshopsResponse, collaboratorsResponse] = await Promise.all([
          workshopsService.getAll(),
          collaboratorsService.getAll(),
        ]);

        setWorkshops(workshopsResponse.data);
        setCollaborators(collaboratorsResponse.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Erro ao carregar dados do dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalWorkshops = workshops.length;
  const totalCollaborators = collaborators.length;

  const upcomingWorkshops = workshops.filter((workshop) => {
    const workshopDate = new Date(workshop.realizationDate);
    const today = new Date();
    return workshopDate > today;
  });

  const recentWorkshops = [...workshops]
    .sort(
      (a, b) =>
        new Date(b.realizationDate).getTime() -
        new Date(a.realizationDate).getTime()
    )
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("pt-BR");
    } catch {
      return dateString;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Visão geral de workshops e colaboradores
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Skeleton
                  variant="rectangular"
                  height={100}
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
            ))}
          </Grid>

          <Skeleton
            variant="rectangular"
            height={300}
            sx={{ borderRadius: 1, mb: 4 }}
          />
          <Skeleton
            variant="rectangular"
            height={100}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Por favor, tente novamente mais tarde.
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        width: "100%",
        maxWidth: "100% !important",
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box sx={{ py: 4, width: "100%" }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Visão geral de workshops e colaboradores
        </Typography>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                title="Total de Workshops"
                value={totalWorkshops}
                color="primary"
                icon={<EventIcon />}
                linkTo="/workshops"
              ></DashboardCard>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                title="Total de Colaboradores"
                value={totalCollaborators}
                color="success"
                icon={<PeopleIcon />}
                linkTo="/collaborators"
              ></DashboardCard>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                title="Workshops Futuros"
                value={upcomingWorkshops.length}
                color="info"
                icon={<DateRangeIcon />}
                linkTo="/workshops"
              ></DashboardCard>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={2}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    borderRadius: 2,
                    border: `1px dashed ${theme.palette.divider}`,
                    bgcolor: "background.default",
                  }}
                >
                  <Box
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                        borderRadius: "50%",
                        mb: 2,
                      }}
                    >
                      <AddIcon color="primary" fontSize="large" />
                    </Box>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                    >
                      Criar Novo Workshop
                    </Typography>
                    <Button
                      component={Link}
                      to="/workshops"
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      sx={{ mt: 2 }}
                    >
                      Criar Agora
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        {/* Recent Workshops */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Paper
            elevation={2}
            sx={{ p: 0, mb: 4, borderRadius: 2, overflow: "hidden" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                py: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EventIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Workshops Recentes
                </Typography>
              </Box>
              <Button
                endIcon={<ArrowForwardIcon />}
                component={Link}
                to="/workshops"
                color="primary"
              >
                Ver Todos
              </Button>
            </Box>
            <Divider />

            {recentWorkshops.length > 0 ? (
              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  {recentWorkshops.map((workshop) => (
                    <Grid item xs={12} md={4} key={workshop.id}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: 3,
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <CardContent sx={{ flex: "1 0 auto", pb: 1 }}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ fontWeight: "medium" }}
                          >
                            {workshop.name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <DateRangeIcon
                              fontSize="small"
                              color="action"
                              sx={{ mr: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(workshop.realizationDate)}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <GroupIcon
                              fontSize="small"
                              color="action"
                              sx={{ mr: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {workshop.attendees.length} participantes
                              {workshop.capacity
                                ? ` / ${workshop.capacity}`
                                : ""}
                            </Typography>
                          </Box>

                          {workshop.description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                mt: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {workshop.description}
                            </Typography>
                          )}
                        </CardContent>
                        <CardActions sx={{ px: 2, pb: 2, mt: "auto" }}>
                          <Button
                            size="small"
                            component={Link}
                            to={`/workshops?id=${workshop.id}`}
                            color="primary"
                          >
                            Ver Detalhes
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="body1" color="text.secondary">
                  Nenhum workshop encontrado.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  component={Link}
                  to="/workshops"
                  sx={{ mt: 2 }}
                >
                  Criar Workshop
                </Button>
              </Box>
            )}
          </Paper>
        </motion.div>

        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Paper
            elevation={2}
            sx={{ p: 0, borderRadius: 2, overflow: "hidden" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                px: 3,
                py: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Ações Rápidas
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<EventIcon />}
                    component={Link}
                    to="/workshops"
                    sx={{ p: 1.5, height: "100%", borderRadius: 2 }}
                  >
                    Gerenciar Workshops
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<PeopleIcon />}
                    component={Link}
                    to="/collaborators"
                    sx={{ p: 1.5, height: "100%", borderRadius: 2 }}
                    color="success"
                  >
                    Gerenciar Colaboradores
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/workshops"
                    sx={{ p: 1.5, height: "100%", borderRadius: 2 }}
                    color="info"
                  >
                    Novo Workshop
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/collaborators"
                    sx={{ p: 1.5, height: "100%", borderRadius: 2 }}
                    color="warning"
                  >
                    Novo Colaborador
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
}
