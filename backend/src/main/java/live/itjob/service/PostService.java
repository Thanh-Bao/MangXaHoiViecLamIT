package live.itjob.service;

import live.itjob.entity.PostEntity;
import live.itjob.DTO.post.PostReadDTO;
import live.itjob.DTO.post.PostWriteDTO;

import java.util.List;

public interface PostService {
    PostReadDTO save(PostWriteDTO postWriteDTO);
    List<PostReadDTO> getPosts();
    PostEntity findById(int id);
}
