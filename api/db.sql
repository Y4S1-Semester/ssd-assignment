-- Create the Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  -- Optional field for user profile image
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Posts table
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  `desc` TEXT NOT NULL,
  img VARCHAR(255),
  cat VARCHAR(255),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  uid INT,
  FOREIGN KEY (uid) REFERENCES users(id) ON DELETE CASCADE
);
