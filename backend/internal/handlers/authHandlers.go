package handlers

import (
	"database/sql"
	"net/http"

	"github.com/GalbasiniMirko/todolist/backend/internal/models"
	"github.com/GalbasiniMirko/todolist/backend/internal/utils/security"
	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	DB *sql.DB
}

func NewAuthHandler(db *sql.DB) *AuthHandler {
	return &AuthHandler{DB: db}
}

type signupRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
}

func (a *AuthHandler) Signup(c *gin.Context) {
	var req signupRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON: " + err.Error()})
		return
	}

	_, err := models.GetUserByEmail(a.DB, req.Email)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
		return
	}

	hashedPwd, err := security.HashData(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing data"})
		return
	}

	userId, err := models.CreateUser(a.DB, req.Email, hashedPwd)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"userId":  userId,
		"message": "User created successfully",
	})
}
