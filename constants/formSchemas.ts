import z from 'zod'


export const TeacherLoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password is too short" })
    .max(12, { message: "Password is too long" }),
});
