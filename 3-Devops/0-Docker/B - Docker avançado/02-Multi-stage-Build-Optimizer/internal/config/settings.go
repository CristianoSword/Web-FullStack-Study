package config

import "os"

type Settings struct {
	AppName string
	Host    string
	Port    string
}

func Load() Settings {
	return Settings{
		AppName: env("APP_NAME", "multi-stage-build-optimizer"),
		Host:    env("APP_HOST", "0.0.0.0"),
		Port:    env("APP_PORT", "3050"),
	}
}

func (s Settings) Address() string {
	return s.Host + ":" + s.Port
}

func env(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
