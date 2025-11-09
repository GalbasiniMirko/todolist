package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.New()

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "pong",
		})
	})

	if err := router.Run(":8080"); err != nil {
		log.Fatal("Errore nell'avvio del server: ", err)
	}
}
