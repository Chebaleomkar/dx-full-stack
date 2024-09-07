export type Fine = {
  student: string;
  amount: number;
  reason: string;
  issuedBy: string;
  issuedAt: Date;
  paidAt : Date; // new field
  status: "processing" | "updated" | "confirmed" | "unpaid" | "paid";
}