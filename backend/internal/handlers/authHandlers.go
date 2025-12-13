package handlers

import (
	"database/sql"
	"net/http"
	"time"

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

type signupLoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
}

func (a *AuthHandler) Signup(c *gin.Context) {
	var req signupLoginRequest

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

func (a *AuthHandler) Login(c *gin.Context) {
	var req signupLoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON: " + err.Error()})
		return
	}

	user, err := models.GetUserByEmail(a.DB, req.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid data"})
		return
	}

	if !security.CheckDataHash(req.Password, user.PasswordHash) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid data"})
		return
	}

	accessToken, err := security.GenerateToken(user.Id, 15*time.Minute)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating access token"})
		return
	}
	refreshToken, err := security.GenerateToken(user.Id, 7*24*time.Hour)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating refresh token"})
		return
	}

	if err := models.CreateRefreshToken(a.DB, user.Id, refreshToken, time.Now().Add(7*24*time.Hour)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating refresh token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
	})
}
