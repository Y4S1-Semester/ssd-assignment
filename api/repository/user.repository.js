import { db } from "../db.js";

export const findUserByEmailOrUsername = (email, username) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE email = ? or username = ?";
        db.query(query, [email, username], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

export const createUser = (username, email, passwordHash) => {
    return new Promise((resolve, reject) => {
        const query =
            "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
        const values = [username, email, passwordHash];
        db.query(query, [values], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};



export const findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE username = ?";
        db.query(query, [username], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};
