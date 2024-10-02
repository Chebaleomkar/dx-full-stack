export type Fine = {
  _id : string;
  student: string;
  amount: number;
  reason: string;
  issuedBy: string;
  issuedAt: Date;
  paidAt : Date; 
  status: "processing" | "updated" | "confirmed" | "unpaid" | "paid";
}