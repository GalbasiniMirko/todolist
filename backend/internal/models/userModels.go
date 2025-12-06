package models

import (
	"database/sql"
	"time"
)

type User struct {
	Id           int       `json:"id"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	CreatedAt    time.Time `json:"createdAt"`
}

func CreateUser(db *sql.DB, email string, passwordHash string) (int64, error) {
	result, err := db.Exec("INSERT INTO Users (Email, PasswordHash, CreatedAt) VALUES (?, ?, ?)", email, passwordHash, time.Now())
	if err != nil {
		return 0, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return id, nil
}

func GetUserByEmail(db *sql.DB, email string) (*User, error) {
	row := db.QueryRow("SELECT * FROM Users WHERE Email = ?", email)

	u := &User{}

	err := row.Scan(&u.Id, &u.Email, &u.PasswordHash, &u.CreatedAt)
	if err != nil {
		return nil, err
	}

	return u, nil
}
