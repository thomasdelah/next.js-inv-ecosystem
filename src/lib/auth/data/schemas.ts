import { z } from 'zod'

export type LoginFormDto = z.infer<typeof loginFormSchema>;
export const loginFormSchema = z.object({
  email: z.string(),
});
