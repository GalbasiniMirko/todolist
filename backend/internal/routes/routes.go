package routes

import (
	"database/sql"
	"net/http"

	"github.com/GalbasiniMirko/todolist/backend/internal/handlers"
	"github.com/GalbasiniMirko/todolist/backend/internal/middlewares"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, db *sql.DB) {
	authHandler := handlers.NewAuthHandler(db)
	taskHandler := handlers.NewTaskHandler(db)

	api := r.Group("/api")

	authGroup := api.Group("/auth")
	{
		authGroup.POST("/signup", authHandler.Signup)
		authGroup.POST("/login", authHandler.Login)
		authGroup.POST("/refresh", authHandler.Refresh)
		authGroup.POST("/logout", authHandler.Logout)
	}

	protected := api.Group("/")
	protected.Use(middlewares.AuthMiddleware())
	{
		protected.GET("/me", func(c *gin.Context) {
			userId, _ := c.Get("userId")
			c.JSON(http.StatusOK, gin.H{
				"message": "You are successfully authenticated!",
				"userId":  userId,
			})
		})

		protected.GET("/tasks/:date", taskHandler.GetTasksByDateHandler)
		protected.POST("/tasks", taskHandler.CreateTaskHandler)
		protected.PUT("/tasks/:idTask", taskHandler.UpdateTaskHandler)
		protected.DELETE("/tasks/:idTask", taskHandler.DeleteTaskHandler)
	}
}
