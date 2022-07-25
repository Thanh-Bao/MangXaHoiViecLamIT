package live.itjob.DTO.CV;

import live.itjob.entity.CVEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CVReadDTO {
    int id ;
    String title ;
    String skill ;
    String education;
    String link ;
    String username;
    public static CVReadDTO tranTo(CVEntity cv ){
        if(cv==null) return null ;
        return new CVReadDTO(cv.getId(),cv.getTitle(),cv.getSkill(),cv.getEducation(),cv.getLink(),
                cv.getUser().getUsername());
    }
}
