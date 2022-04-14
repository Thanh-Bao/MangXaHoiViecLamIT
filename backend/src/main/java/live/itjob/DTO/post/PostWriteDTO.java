package live.itjob.DTO.post;

import live.itjob.entity.ImageEntity;
import live.itjob.entity.LocationEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostWriteDTO {
    private List<ImageEntity> images = new ArrayList<>();
    private double price;
    private String title;
    private String description;
    private LocationEntity location;
}
