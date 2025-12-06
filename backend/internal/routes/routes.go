package routes

import (
	"github.com/GalbasiniMirko/todolist/backend/internal/handlers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, authH *handlers.AuthHandler) {
	authGroup := r.Group("/auth")
	{
		authGroup.POST("/signup", authH.Signup)
	}
}
