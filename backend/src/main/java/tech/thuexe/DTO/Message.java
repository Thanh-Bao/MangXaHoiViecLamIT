package tech.thuexe.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data @AllArgsConstructor
public class Message {
    private Date timestamp;
    private String errorType;
    private String message;
}
