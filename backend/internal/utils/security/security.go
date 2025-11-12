package security

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func GetEnvVariable(key string) string {
	if err := godotenv.Load(); err != nil {
		fmt.Errorf("Error loading .env file: %v", err)
	}

	value := os.Getenv(key)
	if value == "" {
		fmt.Errorf("Variable %s don't find in .env file", key)
	}

	return value
}
