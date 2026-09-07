package ui

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-go-http-server-basic/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-go-http-server-basic/internal/service"
)

type HTTPHandler struct {
	catalog *service.CatalogService
	mux     *http.ServeMux
}

func NewHTTPHandler(catalog *service.CatalogService) *HTTPHandler {
	handler := &HTTPHandler{
		catalog: catalog,
		mux:     http.NewServeMux(),
	}
	handler.routes()
	return handler
}

func (h *HTTPHandler) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	h.mux.ServeHTTP(writer, request)
}

func (h *HTTPHandler) routes() {
	h.mux.HandleFunc("GET /health", h.handleHealth)
	h.mux.HandleFunc("GET /books", h.handleListBooks)
	h.mux.HandleFunc("POST /books", h.handleCreateBook)
	h.mux.HandleFunc("GET /books/", h.handleGetBook)
}

func (h *HTTPHandler) handleHealth(writer http.ResponseWriter, _ *http.Request) {
	writeJSON(writer, http.StatusOK, map[string]string{"status": "ok"})
}

func (h *HTTPHandler) handleListBooks(writer http.ResponseWriter, _ *http.Request) {
	writeJSON(writer, http.StatusOK, h.catalog.List())
}

func (h *HTTPHandler) handleCreateBook(writer http.ResponseWriter, request *http.Request) {
	var payload domain.CreateBookRequest
	if err := json.NewDecoder(request.Body).Decode(&payload); err != nil {
		writeJSON(writer, http.StatusBadRequest, domain.APIError{Message: "invalid json payload"})
		return
	}

	book, err := h.catalog.Create(payload)
	if err != nil {
		writeJSON(writer, http.StatusBadRequest, domain.APIError{Message: err.Error()})
		return
	}
	writeJSON(writer, http.StatusCreated, book)
}

func (h *HTTPHandler) handleGetBook(writer http.ResponseWriter, request *http.Request) {
	id := strings.TrimPrefix(request.URL.Path, "/books/")
	if id == "" {
		writeJSON(writer, http.StatusBadRequest, domain.APIError{Message: "book id is required"})
		return
	}

	book, ok := h.catalog.Find(id)
	if !ok {
		writeJSON(writer, http.StatusNotFound, domain.APIError{Message: "book not found"})
		return
	}
	writeJSON(writer, http.StatusOK, book)
}

func writeJSON(writer http.ResponseWriter, statusCode int, payload any) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(statusCode)
	_ = json.NewEncoder(writer).Encode(payload)
}
