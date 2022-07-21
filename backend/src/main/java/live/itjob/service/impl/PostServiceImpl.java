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
        return dataMapperUtils.map(postEntity, PostReadDTO.class);
    }

    @Override
    public List<PostReadDTO> getPosts() {
        List<PostEntity> post = postRepo.findAllByOrderByCreatedAtDesc();
        return dataMapperUtils.mapAll(post, PostReadDTO.class);
    }

    @Override
    public List<PostReadDTO> getPostByUser(UserEntity user) {
        List<PostEntity> post = postRepo.findAllByUser(user);
        return dataMapperUtils.mapAll(post, PostReadDTO.class);
    }


    @Override
    public PostEntity findById(int id) {
        return postRepo.findById(id).get();
    }

    @Override
    public List<PostReadDTO> filter(int province_id, int distric_id, int ward_id, String skill) {
        //ok tìm theo địa chỉ
        if (skill == "" & ward_id != 0) {
            List<PostEntity> post = postRepo.searchByLocation(province_id, distric_id, ward_id);
            return dataMapperUtils.mapAll(post, PostReadDTO.class);
        }
        //ok tìm theo provice and distric
        if (skill == "" & ward_id == 0 & distric_id != 0) {
            List<PostEntity> post = postRepo.searchByProvinceAndDistric(province_id, distric_id);
            return dataMapperUtils.mapAll(post, PostReadDTO.class);
        }
        //ok tim theo provice
        if (skill == "" & ward_id == 0 & distric_id == 0) {
            List<PostEntity> post = postRepo.searchByProvince(province_id);
            return dataMapperUtils.mapAll(post, PostReadDTO.class);
        }
        // ok tim theo text and provice
        if (skill != "" & ward_id == 0 & distric_id == 0) {
            List<PostEntity> post = postRepo.searchByProviceAndText(province_id,skill);
            return dataMapperUtils.mapAll(post, PostReadDTO.class);
        }
        // ok tìm theo text and provice and distric
        if (skill != "" & ward_id == 0 & distric_id != 0) {
            List<PostEntity> post = postRepo.searchByProviceAndDistricAndText(province_id,distric_id,skill);
            return dataMapperUtils.mapAll(post, PostReadDTO.class);
        }
        //ok tìm theo text
        if (skill != "" & ward_id == 0 & distric_id == 0 & province_id == 0) {
            List<PostEntity> post = postRepo.searchByText(skill);
            return dataMapperUtils.mapAll(post, PostReadDTO.class);
        }
        //ok tìm theo text và địa chỉ
        if (skill != "" & ward_id != 0) {
            List<PostEntity> post = postRepo.searchByLocationAndText(province_id, distric_id, ward_id, skill);
            return dataMapperUtils.mapAll(post, PostReadDTO.class);
        }
        return null;
    }

    @Override
    public List<PostReadDTO> searchBytext(String text) {
        List<PostEntity> post = postRepo.searchByText(text);
        return dataMapperUtils.mapAll(post, PostReadDTO.class);
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
