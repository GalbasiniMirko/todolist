package main

import (
	"log"

	"github.com/GalbasiniMirko/todolist/backend/internal/utils/security"
	"github.com/gin-gonic/gin"
)

func main() {
	security.InitEnvFile()

	mode := security.GetEnvOrDefault("GIN_MODE", gin.DebugMode)
	gin.SetMode(mode)

	r := gin.New()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	port := security.GetEnvOrDefault("PORT", ":8080")
	if err := r.Run(port); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}
