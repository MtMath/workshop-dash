import { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Collapse,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import { ExpandMore, ExpandLess, Event, Group } from "@mui/icons-material";
import { Workshop } from "../../types";
import { ActionButtons } from "../ActionButtons";
import { WorkshopAttendees } from "./WorkshopAttendees";

interface WorkshopCardProps {
  workshop: Workshop;
  onEdit: (workshop: Workshop, event: React.MouseEvent) => void;
  onDelete: (id: number, event: React.MouseEvent) => void;
  onUpdate: () => void;
}

export const WorkshopCard = ({
  workshop,
  onEdit,
  onDelete,
  onUpdate,
}: WorkshopCardProps) => {
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
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="div" gutterBottom>
              {workshop.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Event fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(workshop.realizationDate)}
                </Typography>
              </Box>
              {workshop.capacity && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Group fontSize="small" color="action" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    Capacidade: {workshop.capacity}
                  </Typography>
                </Box>
              )}
              <Chip
                size="small"
                label={`${workshop.attendees.length} participantes`}
                color="primary"
                variant="outlined"
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ActionButtons
              onEdit={(e) => onEdit(workshop, e)}
              onDelete={(e) => onDelete(workshop.id, e)}
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
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Descrição
              </Typography>
              <Typography variant="body2">
                {workshop.description || "Sem descrição disponível."}
              </Typography>
            </Box>

            <WorkshopAttendees workshop={workshop} onUpdate={onUpdate} />
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};
