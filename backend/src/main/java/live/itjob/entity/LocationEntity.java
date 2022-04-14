package live.itjob.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_Location")
public class LocationEntity extends BaseEntity {

    @Column(name="_provinceId")
    private int provinceId;

    @Column(name="_districtId")
    private int districtId;

    @Column(name="_wardId")
    private int wardId;

    @Column(name="_street")
    private String street;

    @OneToOne(mappedBy = "location")
    @JsonBackReference
    private PostEntity post;

}
