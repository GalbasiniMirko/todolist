package main

import (
	"fmt"
	"log"
	"time"

	"github.com/GalbasiniMirko/todolist/backend/internal/routes"
	"github.com/GalbasiniMirko/todolist/backend/internal/utils/database"
	"github.com/GalbasiniMirko/todolist/backend/internal/utils/security"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	security.InitEnvFile()

	mode := security.GetEnvOrDefault("GIN_MODE", gin.DebugMode)
	gin.SetMode(mode)

	db, err := database.ConnectDB()
	if err != nil {
		log.Fatal("Database connection error: ", err)
	}
	defer db.Close()
	fmt.Println("Connected to the database!")

	r := gin.New()

	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	allowedOrigin := security.GetEnvOrDefault("ALLOWED_ORIGIN", "http://localhost:5173")

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{allowedOrigin},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.SetupRoutes(r, db)

	port := security.GetEnvOrDefault("PORT", ":8080")
	if err := r.Run(port); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}
