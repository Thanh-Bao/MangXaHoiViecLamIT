package tech.thuexe.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_Image")
public class ImageEntity extends BaseEntity {

    @Column(name="_link",nullable = false)
    private String link;

    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id", nullable = false)
    @JsonBackReference
    private PostEntity post;

}
