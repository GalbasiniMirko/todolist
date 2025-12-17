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

type RefreshToken struct {
	Id        int       `json:"id"`
	IdUser    int       `json:"idUser"`
	Token     string    `json:"refreshToken"`
	ExpiresAt time.Time `json:"expiresAt"`
	CreatedAt time.Time `json:"createdAt"`
	Revoked   bool      `json:"revoked"`
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

func CreateRefreshToken(db *sql.DB, idUser int, token string, expiresAt time.Time) error {
	_, err := db.Exec("INSERT INTO RefreshTokens (IdUser, RefreshToken, ExpiresAt, CreatedAt) VALUES (?, ?, ?, ?)", idUser, token, expiresAt, time.Now())
	return err
}

func GetRefreshToken(db *sql.DB, hashedToken string) (*RefreshToken, error) {
	row := db.QueryRow("SELECT Id, IdUser, ExpiresAt FROM RefreshTokens WHERE RefreshToken = ? AND ExpiresAt > NOW() AND Revoked = FALSE", hashedToken)

	rt := &RefreshToken{}

	err := row.Scan(&rt.Id, &rt.IdUser, &rt.ExpiresAt)
	if err != nil {
		return nil, err
	}

	return rt, nil
}

func RevokeRefreshToken(db *sql.DB, hashedToken string) error {
	_, err := db.Exec("UPDATE RefreshTokens SET Revoked = TRUE WHERE RefreshToken = ?", hashedToken)
	return err
}
