package database

import (
	"database/sql"
	"fmt"

	"github.com/GalbasiniMirko/todolist/backend/internal/utils/security"
	_ "github.com/go-sql-driver/mysql"
)

func ConnectDB() (*sql.DB, error) {
	db, err := sql.Open("mysql", security.GetEnvVariable("DSN"))
	if err != nil {
		return nil, fmt.Errorf("Failed to open DB: %v", err)
	}

	if err := db.Ping(); err != nil {
		db.Close()
		return nil, fmt.Errorf("Failed to ping DB: %v", err)
	}
	return db, nil
}
