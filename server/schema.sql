/*DROP DATABASE IF EXISTS todo_app;*/
CREATE DATABASE todo_app;
USE todo_app;

CREATE TABLE users(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
);

CREATE TABLE todos(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shared_todos(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    todo_id BIGINT,
    user_id BIGINT,
    shared_with_id BIGINT,
    FOREIGN KEY (todo_id) REFERENCES todos(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    FOREIGN KEY (shared_with_id) REFERENCES users(id)
);

INSERT INTO users(user, email, password) VALUES ('Daniel', 'daniel@gmail.com' , 'daniel1234');
INSERT INTO users(user, email, password) VALUES ('Rafael', 'rafael@gmail.com' , 'rafael1234');
INSERT INTO users(user, email, password) VALUES ('Emanuel', 'emanuel@gmail.com' , 'emanuel1234');

INSERT INTO todos(title, user_id) VALUES
("Ir a correr en las mañanas", 1),
("Sacar a pasear al perro", 1),
("Bañarme", 1),
("Cocinar el almuerzo", 2),
("Almorzar", 2),
("Ir al trabajo", 2),
("Ir a la escuela", 3),
("Hacer las tareas", 3),
("Estudiar para mis examenes", 3);

INSERT INTO shared_todos(todo_id, user_id, shared_with_id) VALUES
(1, 1, 2),
(2, 2, 1),
(1, 1, 3),
(5, 2, 3);

/*
    SELECT todos.*, shared_todos.shared_with_id
    FROM todos
    LEFT JOIN shared_todos 
    ON todos.id = shared_todos.todos_id
    WHERE todos.user_id = [user_id] OR shared_todos.share_with_id = [user_id];
*/