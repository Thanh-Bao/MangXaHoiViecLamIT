package live.itjob.service.impl;

import live.itjob.entity.PostEntity;
import live.itjob.entity.UserEntity;
import live.itjob.service.PostService;
import live.itjob.service.UserService;
import live.itjob.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import live.itjob.DTO.post.PostReadDTO;
import live.itjob.DTO.post.PostWriteDTO;
import live.itjob.repository.PostRepo;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepo postRepo;
    private final UserService userService;
    private final DataMapperUtils dataMapperUtils;

    @Override
    public PostReadDTO save(PostWriteDTO postWriteDTO) {
        PostEntity postEntity = postRepo.save(mapDTOtoEntity(postWriteDTO));
        if (postEntity == null) {
            return null;
        }
        return dataMapperUtils.map(postEntity,PostReadDTO.class);
    }

    @Override
    public List<PostReadDTO> getPosts() {
        List<PostEntity> post = postRepo.findAllByOrderByCreatedAtDesc();
        return dataMapperUtils.mapAll(post,PostReadDTO.class);
    }


    @Override
    public PostEntity findById(int id) {
        return postRepo.findById(id).get();
    }

    private PostEntity mapDTOtoEntity(PostWriteDTO postWriteDTO) {
        UserEntity user = userService.getUser(userService.getUsername());
        PostEntity postEntity = new PostEntity();
        postWriteDTO.getImages().forEach(image -> postEntity.addImage(image));
        postEntity.setPrice(postWriteDTO.getPrice());
        postEntity.setTitle(postWriteDTO.getTitle());
        postEntity.setLocation(postWriteDTO.getLocation());
        postEntity.setDescription(postWriteDTO.getDescription());
        postEntity.setUser(user);
        return postEntity;
    }

}
