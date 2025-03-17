import { ApiResponse, Collaborator } from "../types";
import { api } from "./api";

class CollaboratorService {
  constructor() {}

  async getAll(): Promise<ApiResponse<Collaborator[]>> {
    const response = await api.get("/collaborators");
    return response.data;
  }

  async getById(id: number): Promise<ApiResponse<Collaborator> | null> {
    const response = await api.get(`/collaborators/${id}`);
    return response.data;
  }

  async create(
    collaborator: Collaborator
  ): Promise<ApiResponse<Collaborator> | null> {
    await api
      .post("/collaborators", collaborator)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return null;
  }

  async update(
    id: number,
    collaborator: Collaborator
  ): Promise<ApiResponse<Collaborator> | null> {
    await api
      .put(`/collaborators/${id}`, collaborator)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return null;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`/collaborators/${id}`);
  }
}

export const collaboratorsService = new CollaboratorService();
