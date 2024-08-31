import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const expenseRoute = new Hono();


const expenseSchema = z.object({
  id: z.number().int().min(1),
  title: z.string().min(1, "Title is required").max(50),
  amount: z.number().positive()
})

const createExpenseSchema = expenseSchema.omit({ id: true })

type Expense = z.infer<typeof expenseSchema>

const fakeExpenses: Expense[] = [
  {
    id: 0,
    title: "Anan",
    amount: 1999
  },
  {
    id: 1,
    title: "Bacın",
    amount: 2999
  }
]


expenseRoute.
get("/", c => { 
  return c.json(fakeExpenses)
})
.get("/:id{[0-9]+}", c => {
  const id = Number.parseInt(c.req.param('id'))

  const expense = fakeExpenses.find((expense) => expense.id === id)

  if(!expense) {
    return c.notFound();
  }

  return c.json(expense)

})

.get("/total-expense", c => {
  return c.json({ total : 299 })
})

.post("/", zValidator("json", createExpenseSchema), c => { 
  const expense = c.req.valid("json")
  fakeExpenses.push({
    ...expense,
    id: fakeExpenses.length + 1
  })

  return c.json(expense)
})

