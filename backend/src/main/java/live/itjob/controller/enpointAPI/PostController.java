package live.itjob.controller.enpointAPI;

import live.itjob.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import live.itjob.DTO.post.PostReadDTO;
import live.itjob.DTO.post.PostWriteDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/post")
@Validated
public class PostController {
    private final PostService postService;

    @PostMapping("/save")
    public ResponseEntity<PostReadDTO> save(@RequestBody PostWriteDTO post) {
        return ResponseEntity.ok().body(postService.save(post));
    }
    @GetMapping("/user/{username}")
    public ResponseEntity<List<PostReadDTO>> getPostByUser(@PathVariable String username){
        System.out.println(username);
        System.out.println(postService.getPostByUsername(username));
        return ResponseEntity.ok().body(postService.getPostByUsername(username));
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostReadDTO>> getPosts() {
        return ResponseEntity.ok().body(postService.getPosts());
    }
//   API lọc ,nhận vào ID tỉnh , ID quận ,ID phường , and skill
//    cái nào không chọn thì cho giá trị là "" hoặc 0 và lọc theo các giá trị chọn
    @GetMapping ("/filter")
    public ResponseEntity<List<PostReadDTO>> filter(@RequestParam(name = "skill") String skill,
                                                    @RequestParam(name = "province_id") int province_id,
                                                    @RequestParam(name = "distric_id") int distric_id,
                                                    @RequestParam(name = "ward_id") int ward_id){

        return ResponseEntity.ok().body(postService.filter(province_id,distric_id,ward_id,skill)) ;
    }
// API tìm kiếm theo text , nhận vào text
    @GetMapping("/search")
    public ResponseEntity<List<PostReadDTO>> search(@RequestParam(name = "text") String text) {
        return ResponseEntity.ok().body(postService.searchBytext(text));
    }
}


