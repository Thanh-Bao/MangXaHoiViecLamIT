package live.itjob.utility;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class CustomException extends Exception{
    private HttpStatus status;
    public CustomException(String message, HttpStatus status){
        super(message);
        this.status = status;
    }
}
