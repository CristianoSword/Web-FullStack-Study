package httpapi

import (
	"embed"
	"encoding/json"
	"html/template"
	"net/http"

	"study/docker/multistageoptimizer/internal/catalog"
	"study/docker/multistageoptimizer/internal/config"
)

//go:embed web/index.html
var embeddedFiles embed.FS

type Server struct {
	settings config.Settings
	catalog  catalog.Service
}

func NewServer(settings config.Settings) Server {
	return Server{
		settings: settings,
		catalog:  catalog.NewService(),
	}
}

func (s Server) Router() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/", s.handleHome)
	mux.HandleFunc("/health", s.handleHealth)
	mux.HandleFunc("/products", s.handleProducts)
	mux.HandleFunc("/artifacts", s.handleArtifacts)
	return mux
}

func (s Server) handleHome(writer http.ResponseWriter, _ *http.Request) {
	pageTemplate := template.Must(template.ParseFS(embeddedFiles, "web/index.html"))
	writer.Header().Set("Content-Type", "text/html; charset=utf-8")
	_ = pageTemplate.Execute(writer, map[string]any{
		"AppName": s.settings.AppName,
		"Stages":  s.catalog.ArtifactReport().BuildStages,
	})
}

func (s Server) handleHealth(writer http.ResponseWriter, _ *http.Request) {
	writeJSON(writer, http.StatusOK, map[string]any{
		"status":      "ok",
		"appName":     s.settings.AppName,
		"listen":      s.settings.Address(),
		"runtimeImage": "scratch",
	})
}

func (s Server) handleProducts(writer http.ResponseWriter, _ *http.Request) {
	writeJSON(writer, http.StatusOK, map[string]any{
		"products": s.catalog.Products(),
		"count":    len(s.catalog.Products()),
	})
}

func (s Server) handleArtifacts(writer http.ResponseWriter, _ *http.Request) {
	writeJSON(writer, http.StatusOK, s.catalog.ArtifactReport())
}

func writeJSON(writer http.ResponseWriter, status int, payload any) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(status)
	_ = json.NewEncoder(writer).Encode(payload)
}
