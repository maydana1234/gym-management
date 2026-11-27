export interface Plan {
  id?: string;
  nombre?: string;
  name?: string;
  precio?: number | string;
  price?: number | string;
  duracion?: string;
  duration?: string;
  caracteristicas?: string[];
  description?: string;
  activo?: boolean;
}

export interface Miembro {
  id?: string;
  name: string;
  mobile: string;
  gender?: "Male" | "Female";
  memberNo?: string;
  height?: string;
  weight?: string;
  chest?: string;
  waist?: string;
  dob?: string;
  address?: string;
  training?: "Trainer" | "Personal";
  plan: string;
  batchTime?: string;
  joiningDate: string;
  expiryDate: string;
  paidAmount?: number | string;
  dueAmount: number | string;
  paymentMethod?: string;
  avatar?: string;
}