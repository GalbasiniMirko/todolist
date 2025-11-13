package routes

import (
	"github.com/GalbasiniMirko/todolist/backend/internal/handlers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, app *handlers.App) {
	router.GET("/tasks", app.GetAllTasks)
}
