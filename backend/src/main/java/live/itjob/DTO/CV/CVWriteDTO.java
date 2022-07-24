package live.itjob.DTO.CV;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CVWriteDTO {
    String title ;
    String skill ;
    String education;
    MultipartFile link ;
    String username;

}
