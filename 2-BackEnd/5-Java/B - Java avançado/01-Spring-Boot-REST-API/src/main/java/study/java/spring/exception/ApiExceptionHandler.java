package study.java.spring.exception;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<Map<String, Object>> handleNotFound(ResourceNotFoundException exception) {
    return response(HttpStatus.NOT_FOUND, exception.getMessage(), null);
  }

  @ExceptionHandler(BusinessRuleException.class)
  public ResponseEntity<Map<String, Object>> handleBusinessRule(BusinessRuleException exception) {
    return response(HttpStatus.UNPROCESSABLE_ENTITY, exception.getMessage(), null);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException exception) {
    Map<String, String> errors = exception.getBindingResult().getFieldErrors().stream()
        .collect(Collectors.toMap(
            FieldError::getField,
            fieldError -> fieldError.getDefaultMessage() == null
                ? "invalid value"
                : fieldError.getDefaultMessage(),
            (first, second) -> first,
            LinkedHashMap::new));

    return response(HttpStatus.BAD_REQUEST, "Validation failed", errors);
  }

  private ResponseEntity<Map<String, Object>> response(
      HttpStatus status,
      String message,
      Object details) {
    Map<String, Object> body = new LinkedHashMap<String, Object>();
    body.put("timestamp", Instant.now().toString());
    body.put("status", status.value());
    body.put("error", status.getReasonPhrase());
    body.put("message", message);
    if (details != null) {
      body.put("details", details);
    }
    return ResponseEntity.status(status).body(body);
  }
}
