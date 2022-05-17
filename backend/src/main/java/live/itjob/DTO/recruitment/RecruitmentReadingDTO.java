package live.itjob.DTO.recruitment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecruitmentReadingDTO {
    private String title;
    private Integer id;
    private boolean type;
    private List<ProgramingLanguageDTO> programingLanguageEntity;
    private List<LanguageDTO> languageEntity;
    private List<FrameWorkDTO> frameworkEntities;
    private int experience;
    private String description;
}
