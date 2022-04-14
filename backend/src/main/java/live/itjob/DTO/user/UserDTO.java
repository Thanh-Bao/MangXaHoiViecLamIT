package live.itjob.DTO.user;
import live.itjob.DTO.RoleDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data @NoArgsConstructor
public class UserDTO {
    private String name;
    private String username;
    private int createdAt;
    private boolean isActive ;
    private String phone;
    private Set<RoleDTO> roles = new HashSet<RoleDTO>();
}
