package live.itjob.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_ProgramingLanguage")
public class ProgramingLanguageEntity extends BaseEntity{
    @Column (name = "_title",nullable = false)
    private String title;

}
