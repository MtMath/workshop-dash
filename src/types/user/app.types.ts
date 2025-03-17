export interface Workshop {
  id: number;
  name: string;
  realizationDate: string;
  slug: string;
  capacity?: number;
  description: string;
  attendees: AttendeesRecord[];
}

export interface Collaborator {
  id: number;
  name: string;
  attendances: AttendeesRecord[];
}

export interface AttendeesRecord {
  id: number;
  workshopId: number;
  collaboratorId: number;
  attended: boolean;
  createdAt: string;
  updatedAt: string;
}
