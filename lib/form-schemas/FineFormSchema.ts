import z from 'zod';

export const fineFormSchema = z.object({
  studentId: z
    .string()
    .regex(/^\d+$/, { message: "Student ID must be a numeric value only." })
    .min(1, { message: "Student ID is required." })
    .max(10, { message: "Student ID not greater than 10 digits" }),
  value: z
    .string()
    .min(1, { message: "Amount must be at least 1." })
    .max(500, { message: "Amount not greater than RS.500" }),
  label: z
    .string()
    .min(1, { message: "Reason is required." })
    .max(50, { message: "Enter a short but sweet reason" }),
  items: z.array(z.string()).optional(),
});
