

# Book Management System

Node.js application for Book management.


## Features

- User authentication (JWT-based)
- Password and token are hashed using argon2
- CRUD operations for managing book entries
- Filtering books by author or publication year.
- joi for schema validation


## Run Locally

Clone the project

```bash
  gh repo clone itsharshitsaini/book-management-system
```

Go to the project directory

```bash
  cd book-management-system
```

Install dependencies

```bash
  npm install
```

## Database Schema

### Overview
This database schema is used by the Book Management API to store information about books and users.Create a db and add the following tables.

### Tables

#### `tb_books`
| Column Name      | Data Type | Description                |
|------------------|-----------|----------------------------|
| book_id          | int       | Unique identifier for a book |
| name             | varchar   | Name of the book           |
| author           | varchar   | Author of the book         |
| publication_year | varchar   | Year of publication        |
| creation_time    | timestamp | Timestamp of creation      |
| updation_time    | timestamp | Timestamp of last update   |
| user_id          | int       | User ID associated with the book |

#### `tb_users`
| Column Name  | Data Type | Description              |
|--------------|-----------|--------------------------|
| user_id      | int       | Unique identifier for a user |
| username     | varchar   | Username of the user      |
| name         | varchar   | Name of the user          |
| email        | varchar   | Email address of the user |
| age          | int       | Age of the user           |
| creation_time| timestamp | Timestamp of creation     |
| updation_time| timestamp | Timestamp of last update  |
| refresh_token| varchar   | Refresh token for user    |
| password     | varchar   | Password hash             |

### Table Constraints

- `tb_books`: The combination of `user_id`, `name`, `author`, and `publication_year` must be unique.
- `tb_users`: `username`, and `email` must be unique.

###  Create Tables
```sql
CREATE TABLE tb_books (
    book_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45),
    author VARCHAR(45),
    publication_year VARCHAR(45),
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    PRIMARY KEY (book_id),
    UNIQUE KEY book_id_UNIQUE (book_id),
    UNIQUE KEY user_book_constraint (user_id, name, author, publication_year),
    FOREIGN KEY (user_id) REFERENCES tb_users(user_id)
);

CREATE TABLE tb_users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45),
    age INT,
    creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    refresh_token VARCHAR(100),
    password VARCHAR(100),
    PRIMARY KEY (user_id),
    UNIQUE KEY user_id_UNIQUE (user_id),
    UNIQUE KEY username_UNIQUE (username),
    UNIQUE KEY token_UNIQUE (refresh_token),
    UNIQUE KEY email_UNIQUE (email)
);

```

## Set up environment variables

 Setting up environment variables:

    1. Create a `.env` file in the root directory of the project.
    2. Add the following environment variables to the `.env` file:
```plaintext
PORT=8032
DB_NAME="book-management-db"
DB_HOST="your_host_name"
DB_USER="your_root_name"
DB_PASSWORD="enter-your-password"
ACCESS_TOKEN_SECRET="your_access_token_secret"
REFRESH_TOKEN_SECRET="your_refresh_token_secret"
```

## Start the server

```bash
  npm run start
```


# API Reference

## User Login 

```http
POST /users/login
```
#### Body Parameters
|  Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|`username`	|`string`	|**Required**.  |
|`password`	|`string`	|**Required**.  |

## User Signin 

```http
POST /users/signin
```
#### Body Parameters
|  Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|`username`	|`string`	|**Required**.  |
|`password`	|`string`	|**Required**.  |
|`name`	|`string`	|**Required**.  |
|`email`	|`string`	|**Required**.  |
|`age`	|`string`	|**Required**.  |

## Refresh Token

```http
POST /users/refresh_token
```
#### Body Parameters
|  Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
`refresh_token`|	`string`|	**Required.** Refresh token used to generate new token.|
`username`	|`string`	|**Required.** Username associated with the refresh token.

## Get Books

```http
GET /books/get_books
```


#### Query Parameters
|  Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `author` | `string` | **Optional**. Filter books by author name.|
| `publication_year` | `string` | **Optional**. Filter books by publication_year. |

### Headers

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization`  | `string` | **Required**. Bearer <JWT_TOKEN>    |


## Add Book

Adds new book in the database.

```http
POST /books/add_book
```
#### Body Parameters
|  Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|`name`	|`string`	|**Required**.  name of the book.|
|`author`	|`string`	|**Required**.  author of the book.|
|`publication_year`	|`string`	|**Required**.  publication year of the book.|

### Headers

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization`  | `string` | **Required**. Bearer <JWT_TOKEN>    |

## Update Book

Updates an existing book in the database.

```http
PATCH /books/update_book
```
#### Body Parameters
|  Parameter | Type         | Description                   |
| :-------- | :-------      | :-------------------------    |
| `book_id` | `number`      | **Required**. ID of the book to be updated.|
| `update_obj` | `object` | **Required**. Object containing fields to be updated; contains name, author or publication_year|
|`name`	|`string`	|**Optional**. New name of the book.|
|`author`	|`string`	|**Optional**. New author of the book.|
|`publication_year`	|`string`	|**Optional**. New publication year of the book.|

#### Headers

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization`  | `string` | **Required**. Bearer <JWT_TOKEN>   |



## Delete Book

Deletes book in the database.

```http
DELETE /books/delete_book
```
#### Body Parameters
|  Parameter | Type     | Description               |
| :-------- | :------- | :------------------------- |
| `book_id` | `number` | **Required**. ID of the book to be deleted.|

#### Headers

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization`  | `string` | **Required**. Bearer <JWT_TOKEN> |




