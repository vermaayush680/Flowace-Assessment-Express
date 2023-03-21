CREATE SCHEMA IF NOT EXISTS flowace;

CREATE TABLE IF NOT EXISTS flowace.User (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS flowace.Sport_Schedule (
  id INT AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  startTime VARCHAR(255) NOT NULL,
  endTime VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES User(id)
);