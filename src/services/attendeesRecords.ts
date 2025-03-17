import { Collaborator } from "../types";
import { api } from "./api";

class AttendeesRecordsService {
  constructor() {}

  async getAll(): Promise<Collaborator[]> {
    const response = await api.get("/collaborators");
    return response.data;
  }

  async getById(id: number): Promise<Collaborator | null> {
    const response = await api.get(`/collaborators/${id}`);

    if (response.status === 404) {
      return null;
    }

    return response.data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`/collaborators/${id}`);
  }
}

export const attendeesRecordsService = new AttendeesRecordsService();
