package tech.thuexe.DTO.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tech.thuexe.DTO.user.UserDTO;
import tech.thuexe.entity.ImageEntity;
import tech.thuexe.entity.LocationEntity;
import tech.thuexe.entity.UserEntity;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostReadDTO {
    private int id;
    private List<ImageEntity> images = new ArrayList<>();
    private double price;
    private String title;
    private String description;
    private LocationEntity location;
    private int createdAt;
    private UserDTO user;
}
