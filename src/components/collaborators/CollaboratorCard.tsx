import { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Collapse,
  Divider,
  useTheme,
  alpha,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Person,
  Event,
  Check,
  Clear,
} from "@mui/icons-material";
import { Collaborator } from "../../types";
import { ActionButtons } from "../ActionButtons";

interface CollaboratorCardProps {
  collaborator: Collaborator;
  onEdit: (collaborator: Collaborator, event: React.MouseEvent) => void;
  onDelete: (id: number, event: React.MouseEvent) => void;
}

export const CollaboratorCard = ({
  collaborator,
  onEdit,
  onDelete,
}: CollaboratorCardProps) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("pt-BR");
    } catch {
      return dateString;
    }
  };

  // Count attended workshops
  const attendedWorkshops = collaborator.attendances
    ? collaborator.attendances.filter((record) => record.attended).length
    : 0;

  return (
    <Card
      elevation={2}
      sx={{
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            p: 2,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: expanded
              ? alpha(theme.palette.primary.main, 0.1)
              : "transparent",
          }}
          onClick={handleToggleExpand}
        >
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <Person fontSize="medium" color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h6" component="div">
                {collaborator.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                <Chip
                  size="small"
                  label={`${collaborator.attendances?.length || 0} workshops`}
                  color="primary"
                  variant="outlined"
                  sx={{ mr: 1 }}
                />
                <Chip
                  size="small"
                  label={`${attendedWorkshops} presentes`}
                  color="success"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ActionButtons
              onEdit={(e) => onEdit(collaborator, e)}
              onDelete={(e) => onDelete(collaborator.id, e)}
            />
            <IconButton
              size="small"
              sx={{ ml: 0.5 }}
              color={expanded ? "primary" : "default"}
            >
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
          <Box sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Detalhes do Colaborador
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>ID:</strong> {collaborator.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Nome:</strong> {collaborator.name}
              </Typography>
            </Box>

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Histórico de Workshops
            </Typography>

            {collaborator.attendances && collaborator.attendances.length > 0 ? (
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "background.default" }}>
                      <TableCell>Workshop ID</TableCell>
                      <TableCell>Presença</TableCell>
                      <TableCell>Data de Registro</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {collaborator.attendances.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.workshopId}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            icon={record.attended ? <Check /> : <Clear />}
                            label={record.attended ? "Presente" : "Ausente"}
                            color={record.attended ? "success" : "default"}
                            variant={record.attended ? "filled" : "outlined"}
                          />
                        </TableCell>
                        <TableCell>{formatDate(record.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.default",
                }}
              >
                <Event color="action" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Colaborador não participou de nenhum workshop.
                </Typography>
              </Paper>
            )}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};
