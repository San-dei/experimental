import { z } from "zod";

export const requestSchema = z.object({
  requestId: z.string().uuid(),
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres.").max(100),
  email: z.string().trim().email("Ingresá un email válido.").max(254).transform((s) => s.toLowerCase()),
  phone: z.string().trim().min(7).max(40)
    .regex(/^[+\d\s().-]+$/, "Ingresá un teléfono válido.")
    .refine((s) => {
      const digits = s.replace(/\D/g, "").length;
      return digits >= 7 && digits <= 15;
    }, "El teléfono debe tener entre 7 y 15 dígitos."),
  service: z.enum(["pentesting", "vulnerabilidades"]),
  description: z.string().trim().min(20, "Describí tu solicitud con al menos 20 caracteres.").max(4000),
  website: z.string().max(200).optional(),
});

export type ServiceRequest = z.infer<typeof requestSchema>;
