package security

import (
	"crypto/sha256"
	"encoding/hex"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

func InitEnvFile() {
	dir, _ := os.Getwd()

	for {
		envPath := filepath.Join(dir, ".env")

		if _, err := os.Stat(envPath); err == nil {
			if err := godotenv.Load(envPath); err != nil {
				log.Printf("Error loading .env file from %s: %v\n", envPath, err)
			}
			return
		}

		parent := filepath.Dir(dir)

		if parent == dir {
			log.Println("No .env file found")
			return
		}

		dir = parent
	}
}

func GetEnvOrDefault(key string, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}

	return value
}

func GetEnvVariable(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Fatalf("❌ Environment variable '%s' not defined", key)
	}

	return value
}

func HashData(data string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(data), 14)
	return string(bytes), err
}

func CheckDataHash(data, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(data))
	return err == nil
}

func GenerateToken(idUser int, duration time.Duration) (string, error) {
	claims := jwt.MapClaims{
		"sub": idUser,
		"exp": time.Now().Add(duration).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	secretKey := []byte(GetEnvVariable("JWT_SECRET"))

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func HashToken(token string) string {
	hash := sha256.Sum256([]byte(token))
	return hex.EncodeToString(hash[:])
}
