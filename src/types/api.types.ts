export interface ApiResponse<T> {
  data: T;
  message: number;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface WorkshopRequest {
  title: string;
  date: string;
  capacity?: number;
  description: string;
}

export interface CollaboratorRequest {
  name: string;
}

export interface AttendeesRecordRequest {
  workshopId: number;
  collaboratorId: number;
  attended?: boolean;
}
