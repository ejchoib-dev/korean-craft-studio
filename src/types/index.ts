export type CraftType = 'pottery' | 'lacquerware' | 'bojagi' | 'woodcraft';

export interface Craft {
  id: string;
  name: string;
  type: CraftType;
  description: string;
  price: number;
  imageUrl: string;
}

export interface WorkshopClass {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  capacity: number;
  imageUrl: string;
}

export interface OrderInquiryFormData {
  name: string;
  phone: string;
  craftId: string;
  message: string;
}

export interface ClassApplicationFormData {
  name: string;
  phone: string;
  classId: string;
  participantCount: number;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  receptionNumber?: string;
}

export interface OrderInquiryResponse {
  receptionNumber: string;
  submittedAt: string;
}

export interface ClassApplicationResponse {
  receptionNumber: string;
  classId: string;
  submittedAt: string;
}
