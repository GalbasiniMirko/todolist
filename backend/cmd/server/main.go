package main

import (
	"fmt"
	"log"

	"github.com/GalbasiniMirko/todolist/backend/internal/handlers"
	"github.com/GalbasiniMirko/todolist/backend/internal/routes"
	"github.com/GalbasiniMirko/todolist/backend/internal/utils/database"
	"github.com/GalbasiniMirko/todolist/backend/internal/utils/security"
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

	authHandler := handlers.NewAuthHandler(db)

	r := gin.New()

	routes.SetupRoutes(r, authHandler)

	port := security.GetEnvOrDefault("PORT", ":8080")
	if err := r.Run(port); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}
