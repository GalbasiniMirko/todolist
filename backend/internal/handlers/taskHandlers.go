package handlers

import (
	"database/sql"
	"net/http"
	"strconv"
	"time"

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

func (a *App) CreateTask(c *gin.Context) {
	var task models.Task

	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	if task.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}
	if len(task.Title) > 100 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is too long"})
		return
	}

	if task.Date == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Date is required"})
		return
	}

	if err := models.CreateTask(a.DB, task); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating task: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Task created successfully",
	})
}

func (a *App) EditTask(c *gin.Context) {
	var task models.Task

	idParam := c.Params.ByName("id")
	idTask, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task id"})
		return
	}

	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	if task.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}
	if len(task.Title) > 100 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is too long"})
		return
	}

	if task.Date == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Date is required"})
		return
	}

	if _, err := time.Parse(time.RFC3339, task.Date); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format"})
		return
	}

	if err := models.EditTask(a.DB, task, idTask); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error editing task: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Task edited successfully",
	})
}
