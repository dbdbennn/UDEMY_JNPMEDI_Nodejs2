import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/todos", (ctx) => {
  ctx.response.body = { todos: todos };
});

router.post("/todos", async (ctx) => {
  try {
    const contentType = ctx.request.headers.get("content-type");
    if (contentType !== "application/json") {
      ctx.response.status = 415; // Unsupported Media Type
      ctx.response.body = { error: "Unsupported Media Type" };
      return;
    }

    const data = await ctx.request.body({ type: "json" }).value; // Wait for the body parsing
    const newTodo: Todo = {
      id: new Date().toISOString(),
      text: data.text, // Use data.text directly
    };

    todos.push(newTodo);

    ctx.response.body = { message: "Created todo!", todo: newTodo };
  } catch (error) {
    ctx.response.status = 400; // Bad Request
    ctx.response.body = { error: "Bad Request" };
  }
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const data = await ctx.request.body();
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === tid;
  });
  todos[todoIndex] = { id: todos[todoIndex].id, text: data.value.text };
  ctx.response.body = { message: "Updated todo" };
});

router.delete("/todos/:todoId", (ctx) => {
  const tid = ctx.params.todoId;
  todos = todos.filter((todo) => todo.id !== tid);
  ctx.response.body = { message: "Deleted todo" };
});

export default router;
