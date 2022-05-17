package live.itjob.DTO.recruitment;

import live.itjob.entity.FrameworkEntity;
import live.itjob.entity.LanguageEntity;
import live.itjob.entity.ProgramingLanguageEntity;
import live.itjob.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecruitmentDTO {
    private String title;
    private Integer idPost;
    private boolean type;
    private List<ProgramingLanguageDTO> programingLanguageEntity;
    private List<LanguageDTO> languageEntity;
    private List<FrameWorkDTO> frameworkEntities;
    private int experience;
    private String description;
//    private UserEntity user;
}
