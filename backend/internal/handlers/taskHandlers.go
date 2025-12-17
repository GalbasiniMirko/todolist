package handlers

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/GalbasiniMirko/todolist/backend/internal/models"
	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	DB *sql.DB
}

func NewTaskHandler(db *sql.DB) *TaskHandler {
	return &TaskHandler{DB: db}
}

func (t *TaskHandler) GetTasksByDateHandler(c *gin.Context) {
	date := c.Param("date")
	if date == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Date parameter is required"})
		return
	}

	idUserAny, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	idUser := idUserAny.(int)

	tasks, err := models.GetTasksByDate(t.DB, idUser, date)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error Fetching tasks"})
		return
	}

	if tasks == nil {
		tasks = []models.Task{}
	}

	c.JSON(http.StatusOK, gin.H{
		"tasks": tasks,
	})
}

func (t *TaskHandler) CreateTaskHandler(c *gin.Context) {
	var newTask models.Task

	if err := c.ShouldBindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	idUserAny, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	newTask.IdUser = idUserAny.(int)
	newTask.State = "To do"

	id, err := models.CreateTask(t.DB, newTask)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create task"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"id": id,
	})
}

func (t *TaskHandler) UpdateTaskHandler(c *gin.Context) {
	idTaskString := c.Param("idTask")
	if idTaskString == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "idTask parameter is required"})
		return
	}

	idTask, err := strconv.Atoi(idTaskString)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid idTask"})
		return
	}

	var input struct {
		State string `json:"state"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	idUserAny, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	idUser := idUserAny.(int)
	if err := models.UpdateTaskState(t.DB, idUser, idTask, input.State); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update task"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task updated"})
}

func (t *TaskHandler) DeleteTaskHandler(c *gin.Context) {
	idTaskString := c.Param("idTask")
	if idTaskString == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "idTask parameter is required"})
		return
	}

	idTask, err := strconv.Atoi(idTaskString)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	idUserAny, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	idUser := idUserAny.(int)
	if err := models.DeleteTask(t.DB, idUser, idTask); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not delete task"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task deleted!"})
}
