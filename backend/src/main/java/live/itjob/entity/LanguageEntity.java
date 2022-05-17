package live.itjob.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LanguageEntity extends BaseEntity{
    @Column(name = "_title",nullable = false)
    private String title;
}
