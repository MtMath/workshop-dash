// src/mocks/mockData.ts

export const mockCollaborators = [
  { id: 1, nome: "João Silva" },
  { id: 2, nome: "Maria Oliveira" },
  { id: 3, nome: "Carlos Souza" },
  { id: 4, nome: "Fernanda Lima" },
];

export const mockWorkshops = [
  {
    id: 1,
    nome: "Introdução ao React",
    dataRealizacao: "2025-03-20T16:00:00",
    descricao: "Workshop sobre os fundamentos do React.",
    colaboradores: [mockCollaborators[0], mockCollaborators[1]],
  },
  {
    id: 2,
    nome: "Avançado em JavaScript",
    dataRealizacao: "2025-03-27T16:00:00",
    descricao: "Aprofundamento em JavaScript e suas novas funcionalidades.",
    colaboradores: [mockCollaborators[2], mockCollaborators[3]],
  },
  {
    id: 3,
    nome: "Design Patterns em C#",
    dataRealizacao: "2025-04-03T16:00:00",
    descricao: "Como aplicar padrões de design em C#.",
    colaboradores: [mockCollaborators[0], mockCollaborators[2]],
  },
];
