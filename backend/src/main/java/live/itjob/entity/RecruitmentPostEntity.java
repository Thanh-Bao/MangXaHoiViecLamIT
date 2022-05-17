package live.itjob.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_RecruitmentPost")
public class RecruitmentPostEntity extends BaseEntity {
    @Column(name = "_title", length = 500)
    private String title;

    @Column(name = "_type", nullable = false)
    private boolean type;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "programing_language_id", nullable = false)
    private List<ProgramingLanguageEntity> programingLanguageEntity;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "language_id", nullable = false)
    private List<LanguageEntity> languageEntity;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "_framework_id", nullable = false)
    private List<FrameworkEntity> frameworkEntities;

    @Min(value = 0, message = "msg1")
    @Column(name = "_experience")
    private int experience;

    @Column(name = "_description")
    private String description;
    @ManyToOne
    @JoinColumn(name="_userId",nullable = false)
    private UserEntity user;
}
