package ui

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-rest-api-gin-gorm/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-rest-api-gin-gorm/internal/service"
)

func NewRouter(taskService *service.TaskService) *gin.Engine {
	router := gin.New()
	router.Use(gin.Logger(), gin.Recovery())

	router.GET("/health", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	router.GET("/tasks", func(context *gin.Context) {
		tasks, err := taskService.List(domain.TaskQuery{
			Status:   context.Query("status"),
			Priority: context.Query("priority"),
			Owner:    context.Query("owner"),
		})
		if err != nil {
			context.JSON(http.StatusInternalServerError, domain.APIError{Message: err.Error()})
			return
		}
		context.JSON(http.StatusOK, tasks)
	})

	router.POST("/tasks", func(context *gin.Context) {
		var payload domain.CreateTaskRequest
		if err := context.ShouldBindJSON(&payload); err != nil {
			context.JSON(http.StatusBadRequest, domain.APIError{Message: "invalid json payload"})
			return
		}
		task, err := taskService.Create(payload)
		if err != nil {
			context.JSON(http.StatusBadRequest, domain.APIError{Message: err.Error()})
			return
		}
		context.JSON(http.StatusCreated, task)
	})

	router.GET("/tasks/:id", func(context *gin.Context) {
		id, ok := parseID(context)
		if !ok {
			return
		}
		task, err := taskService.Find(id)
		if err != nil {
			context.JSON(http.StatusNotFound, domain.APIError{Message: err.Error()})
			return
		}
		context.JSON(http.StatusOK, task)
	})

	router.PATCH("/tasks/:id", func(context *gin.Context) {
		id, ok := parseID(context)
		if !ok {
			return
		}
		var payload domain.UpdateTaskRequest
		if err := context.ShouldBindJSON(&payload); err != nil {
			context.JSON(http.StatusBadRequest, domain.APIError{Message: "invalid json payload"})
			return
		}
		task, err := taskService.Update(id, payload)
		if err != nil {
			statusCode := http.StatusBadRequest
			if err.Error() == "task not found" {
				statusCode = http.StatusNotFound
			}
			context.JSON(statusCode, domain.APIError{Message: err.Error()})
			return
		}
		context.JSON(http.StatusOK, task)
	})

	router.DELETE("/tasks/:id", func(context *gin.Context) {
		id, ok := parseID(context)
		if !ok {
			return
		}
		if err := taskService.Delete(id); err != nil {
			context.JSON(http.StatusNotFound, domain.APIError{Message: err.Error()})
			return
		}
		context.Status(http.StatusNoContent)
	})

	return router
}

func parseID(context *gin.Context) (uint, bool) {
	value, err := strconv.ParseUint(context.Param("id"), 10, 64)
	if err != nil {
		context.JSON(http.StatusBadRequest, domain.APIError{Message: "task id must be numeric"})
		return 0, false
	}
	return uint(value), true
}
