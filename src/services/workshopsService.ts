import {
  Workshop,
  ApiResponse,
  AttendeesRecordRequest,
  WorkshopRequest,
} from "../types";
import { api } from "./api";

class WorkshopsService {
  constructor() {}

  async getAll(): Promise<ApiResponse<Workshop[]>> {
    const response = await api.get("/workshops");
    return response.data;
  }

  async getById(id: number): Promise<ApiResponse<Workshop> | null> {
    const response = await api.get(`/workshops/${id}`);

    if (response.status === 404) {
      return null;
    }

    return response.data;
  }

  async getAttendeesRecords(
    id: number
  ): Promise<ApiResponse<AttendeesRecordRequest[]>> {
    const response = await api.get(`/workshops/${id}/attendees`);

    return response.data;
  }

  async create(
    workshop: WorkshopRequest
  ): Promise<ApiResponse<Workshop> | null> {
    await api.post("/workshops", workshop).then((response) => {
      return response.data;
    });

    return null;
  }

  async update(
    id: number,
    workshop: WorkshopRequest
  ): Promise<ApiResponse<Workshop> | null> {
    await api.put(`/workshops/${id}`, workshop).then((response) => {
      return response.data;
    });

    return null;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`/workshops/${id}`);
  }

  async addCollaborator(
    workshopId: number,
    collaboratorId: number
  ): Promise<void> {
    const payload: AttendeesRecordRequest = {
      workshopId,
      collaboratorId,
    };

    await api.post(`/attendees/add-collaborator`, payload);
  }

  async removeCollaborator(
    workshopId: number,
    collaboratorId: number
  ): Promise<void> {
    const payload: AttendeesRecordRequest = {
      workshopId,
      collaboratorId,
    };

    await api.delete("/attendees/remove-collaborator", { data: payload });
  }
}

export const workshopsService = new WorkshopsService();
