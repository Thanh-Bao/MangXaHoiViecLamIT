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
@Table(name = "_Role")
public class RoleEntity extends BaseEntity{
    @Column(name = "_name", length = 20, nullable = false)
    private String name;
}
