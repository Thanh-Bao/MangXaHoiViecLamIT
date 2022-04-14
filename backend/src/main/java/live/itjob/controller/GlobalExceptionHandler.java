package live.itjob.controller;

import live.itjob.DTO.Message;
import live.itjob.utility.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {

    // handler custom validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> customValidationErrorHandling(MethodArgumentNotValidException exception){
        Message message = new Message(new Date(), "Validation Error", exception.getBindingResult().getFieldError().getDefaultMessage());
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    // handle custom exception
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> customException(CustomException exception){
        Message message = new Message(new Date(), "Validation Error", exception.getMessage());
        return new ResponseEntity<>(message, exception.getStatus());
    }
}
