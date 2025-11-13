package handlers

import (
	"database/sql"
	"net/http"

	"github.com/GalbasiniMirko/todolist/backend/internal/models"
	"github.com/gin-gonic/gin"
)

type App struct {
	DB *sql.DB
}

func (a *App) GetAllTasks(c *gin.Context) {
	tasks, err := models.GetAllTasks(a.DB)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"tasks": tasks})
}
