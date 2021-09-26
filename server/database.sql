CREATE DATABASE todo;

CREATE TABLE todo_list(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)   
);

CREATE TABLE todo_item(
    id SERIAL PRIMARY KEY,
    fk_list_id INTEGER REFERENCES todo_list(id),
    done BOOLEAN,
    description VARCHAR(255)   
);

