package main

import (
	"fmt"
	"log"

	"github.com/GalbasiniMirko/todolist/backend/internal/utils/database"
	"github.com/gin-gonic/gin"
)

func main() {
	db, err := database.InitDB()
	if err != nil {
		log.Fatal("Database connection error: ", err)
	} else {
		fmt.Println("Connected to the database!")
	}
	defer db.Close()

	router := gin.New()

	if err := router.Run(":8080"); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}
