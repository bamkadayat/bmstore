import * as z from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN"]).refine((val) => ["USER", "ADMIN"].includes(val), {
    message: "Role must be either USER or ADMIN",
  }),
});

export type User = z.infer<typeof userSchema>;

export const createUserSchema = userSchema;
export type CreateUser = z.infer<typeof createUserSchema>;
