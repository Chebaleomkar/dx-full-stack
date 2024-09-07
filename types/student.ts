export type Student= {
  name: string;
  studentId: string;
  dateOfBirth: Date;
  imageUrl?: string;
  totalFine: number;
  recentFineAmount: number;
  updatedAt: Date;
  updatedBy: string
  mobileNumber?: string;
  email?: string;
  gender?: string;
  course?: string;
  age?: number;
  finedDayTime: Date[];
  institution:string;
}