package live.itjob.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_SubmitCV")
public class SubmitCVEntity extends BaseEntity {

    @ManyToOne
    @JoinColumn(
            name = "post_id",
            nullable = false
    )
    private PostEntity post;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private UserEntity user;

}
