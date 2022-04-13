package tech.thuexe.entity;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;

@MappedSuperclass
@Data
public abstract class BaseEntity {

    @Id
    private int id = 10000000 + (int)(Math.random() * 99999999);

    @CreatedDate
    @Column(name="_createdAt", nullable = false)
    private int createdAt = (int) Instant.now().getEpochSecond();

    @CreatedBy
    @Column(name="_createdBy")
    private String createdBy;

}
