import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const manageSchema = z.object({
  id: z.string(),
  product_name: z.string(),
  branch: z.string(),
  stock: z.string(),
  min_stock: z.string(),
  optimal_stock: z.string(),
  last_synced_at: z.string(),
})

export type Task = z.infer<typeof manageSchema>

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  unitPrice: z.number(),
  count: z.number(),
  totalPrice: z.number(),
})

export type Product = z.infer<typeof productSchema>
