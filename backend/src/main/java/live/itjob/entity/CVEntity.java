package live.itjob.entity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CVEntity extends BaseEntity {
    String title ;
    String skill ;
    String education;
    String link ;
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id",nullable = false)
    private UserEntity user;
}
