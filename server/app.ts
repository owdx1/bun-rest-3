import { Hono } from "hono";

const app = new Hono()


app.get("/", c => {
  return c.body("hi oc")
})

export default app