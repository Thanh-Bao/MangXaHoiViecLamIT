package tech.thuexe.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_Order")
public class OrderEntity extends BaseEntity {

    @Column(nullable = false)
    private int rentalDay;

    @Column(nullable = false)
    private int returnDay;

    @Column(nullable = false)
    private double amount;

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
