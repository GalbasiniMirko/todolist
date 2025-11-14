package models

import (
	"database/sql"
	"time"
)

type Task struct {
	Id          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Date        string `json:"date"`
	State       string `json:"state"`
}

func GetAllTasks(db *sql.DB) ([]Task, error) {
	rows, err := db.Query("SELECT * FROM Tasks")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []Task
	for rows.Next() {
		var t Task
		if err := rows.Scan(&t.Id, &t.Title, &t.Description, &t.Date, &t.State); err != nil {
			return nil, err
		}
		tasks = append(tasks, t)
	}

	return tasks, nil
}

func CreateTask(db *sql.DB, t Task) error {
	parsedDate, err := time.Parse(time.RFC3339, t.Date)
	if err != nil {
		return err
	}

	parsedDate = parsedDate.UTC()
	mysqlDate := parsedDate.Format("2006-01-02 15:04:05")

	_, err = db.Exec("INSERT INTO Tasks (Title, Description, Date, State) VALUES (?, ?, ?, ?)", t.Title, t.Description, mysqlDate, t.State)

	return err
}

func EditTask(db *sql.DB, t Task, idTask int) error {
	parsedDate, err := time.Parse(time.RFC3339, t.Date)
	if err != nil {
		return err
	}

	parsedDate = parsedDate.UTC()
	mysqlDate := parsedDate.Format("2006-01-02 15:04:05")

	_, err = db.Exec("UPDATE Tasks SET Title=?, Description=?, Date=?, State=? WHERE Id=?", t.Title, t.Description, mysqlDate, t.State, idTask)

	return err
}
