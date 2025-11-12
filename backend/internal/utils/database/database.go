package database

import (
	"database/sql"
	"fmt"

	"github.com/GalbasiniMirko/todolist/backend/internal/utils/security"
	_ "github.com/go-sql-driver/mysql"
)

func InitDB() (*sql.DB, error) {
	db, err := sql.Open("mysql", security.GetEnvVariable("DSN"))
	if err != nil {
		return nil, fmt.Errorf("%v", err)
	}

	if err := db.Ping(); err != nil {
		db.Close()
		return nil, fmt.Errorf("%v", err)
	}
	return db, nil
}
