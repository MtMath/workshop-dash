import { api } from "./api";
import { Colaborador } from "./colaboradoresService";

export interface Workshop {
  id: number;
  nome: string;
  dataRealizacao: string;
  descricao: string;
  colaboradores: Colaborador[];
}

const mockWorkshops: Workshop[] = [
  {
    id: 1,
    nome: "React Avançado",
    dataRealizacao: "2024-03-14T16:00:00",
    descricao: "Explorando conceitos avançados do React.",
    colaboradores: [
      { id: 1, nome: "Ana Souza" },
      { id: 2, nome: "Carlos Oliveira" },
    ],
  },
  {
    id: 2,
    nome: "APIs REST com .NET",
    dataRealizacao: "2024-06-13T16:00:00",
    descricao: "Criando APIs RESTful usando .NET.",
    colaboradores: [
      { id: 2, nome: "Carlos Oliveira" },
      { id: 3, nome: "Mariana Santos" },
    ],
  },
];

export const workshopsService = {
  async listarTodos(): Promise<Workshop[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockWorkshops), 500)
    );
  },

  async obterPorId(id: number): Promise<Workshop | null> {
    return new Promise((resolve) =>
      setTimeout(() => {
        const workshop = mockWorkshops.find((w) => w.id === id);
        resolve(workshop || null);
      }, 500)
    );
  },
};
