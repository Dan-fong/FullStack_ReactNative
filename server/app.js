import express from 'express';
import { 
getTodo,
shareTodo,
deleteTodo,
getTodosById,
createTodo,
toggleCompleted,
getUserByEmail,
getUserById,
getSharedTodoById
} from './database.js';
import cors from 'cors';

const corsOptions = {
    origin: "http://localhost:19006", // specify the allowed origin
    methods: ["POST", "GET"], // specify the allowed methods
    credentials: true, // allow sending credentials (cookies, authentication)
    // exposedHeaders: ["Content-type"]
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/todos/:id", async (req, res) => {
    const todos = await getTodosById(req.params.id);
    res.status(200).send(todos);
})

app.get("/todos/shared_todos/:id", async (req, res) => {
    const todo = await getSharedTodoById(req.params.id);
    const author = await getUserById(todo.user_id);
    const shared_with = await getUserById(todo.shared_with_id);
    res.status(200).send({author, shared_with});
})

app.get("/users/:id", async (req, res) => {
    const user = await getUserById(req.params.id);
    res.status(200).send(user)
})

app.put("/todos/:id", async (req, res) => {
    const { value } = req.body;
    const todo = await toggleCompleted(req.params.id, value);
    res.status(201).send(todo);    
})

app.delete("/todos/:id", async (req, res) => {
    await deleteTodo(req.params.id);
    res.send({msg: "Todo deleted succesful"});
})

app.post("/todos/shared_todos", async (req, res) => {
    const { todo_id, user_id, email } = req.body;
    const userToShare = await getUserByEmail(email);
    const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id);
    res.status(201).send(sharedTodo)
})

app.post("/todos", async (req, res) => {
    const { user_id, title } = req.body
    const todo = await createTodo(user_id, title);
    res.status(201).send(todo);
})

app.listen(8080, () => {
    console.log("Server running on port 8080")
})