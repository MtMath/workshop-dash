import { api } from "./api";

export interface Colaborador {
  id: number;
  nome: string;
}

const mockColaboradores: Colaborador[] = [
  { id: 1, nome: "Ana Souza" },
  { id: 2, nome: "Carlos Oliveira" },
  { id: 3, nome: "Mariana Santos" },
];

export const colaboradoresService = {
  async listarTodos(): Promise<Colaborador[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockColaboradores), 500)
    );
  },
};
