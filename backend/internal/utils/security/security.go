package security

import (
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
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
