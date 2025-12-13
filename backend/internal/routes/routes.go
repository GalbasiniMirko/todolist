package routes

import (
	"net/http"

	"github.com/GalbasiniMirko/todolist/backend/internal/handlers"
	"github.com/GalbasiniMirko/todolist/backend/internal/middlewares"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, authH *handlers.AuthHandler) {
	api := r.Group("/api")

	authGroup := api.Group("/auth")
	{
		authGroup.POST("/signup", authH.Signup)
		authGroup.POST("/login", authH.Login)
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
	}
}
