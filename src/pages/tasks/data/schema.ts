import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  unitPrice: z.number(),
  count: z.number(),
  totalPrice: z.number(),
})

export type Product = z.infer<typeof productSchema>
