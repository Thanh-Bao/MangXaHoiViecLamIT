package live.itjob.service;

import live.itjob.entity.PostEntity;
import live.itjob.DTO.post.PostReadDTO;
import live.itjob.DTO.post.PostWriteDTO;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostService {
    PostReadDTO save(PostWriteDTO postWriteDTO);
    List<PostReadDTO> getPosts();
    List<PostReadDTO> getPostByUsername(String username);
    PostEntity findById(int id);
    List<PostReadDTO> filter(int province_id,int distric_id,
                            int ward_id ,String skill) ;
    List<PostReadDTO> searchBytext(String text);
}
