package models

import (
	"database/sql"
)

type Task struct {
	Id          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Date        string `json:"date"`
	Time        string `json:"time"`
	State       string `json:"state"`
	IdUser      int    `json:"idUser"`
}

func CreateTask(db *sql.DB, title string, description string, date string, time string, state string, idUser int) (int64, error) {
	result, err := db.Exec("INSERT INTO Tasks (Title, Description, Date, Time, State, IdUser) VALUES (?, ?, ?, ?, ?, ?)", title, description, date, time, state, idUser)
	if err != nil {
		return 0, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return id, nil
}

func GetTasksByUser(db *sql.DB, idUser int) ([]Task, error) {
	rows, err := db.Query("SELECT * FROM Tasks WHERE IdUser = ?", idUser)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []Task
	for rows.Next() {
		var t Task
		if err := rows.Scan(&t.Id, &t.Title, &t.Description, &t.Date, &t.Time, &t.State, &t.IdUser); err != nil {
			return nil, err
		}
		tasks = append(tasks, t)
	}

	return tasks, nil
}

func GetTasksByDate(db *sql.DB, idUser int, date string) ([]Task, error) {
	rows, err := db.Query("SELECT * FROM Tasks WHERE IdUser = ? AND Date = ?", idUser, date)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []Task
	for rows.Next() {
		var t Task
		if err := rows.Scan(&t.Id, &t.Title, &t.Description, &t.Date, &t.Time, &t.State, &t.IdUser); err != nil {
			return nil, err
		}
		tasks = append(tasks, t)
	}

	return tasks, nil
}
