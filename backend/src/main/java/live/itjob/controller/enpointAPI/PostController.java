package live.itjob.controller.enpointAPI;

import live.itjob.service.PostService;
import live.itjob.service.UserService;
//import live.itjob.utility.FormSearch;
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
    private final UserService userService;

    @PostMapping("/save")
    public ResponseEntity<PostReadDTO> save(@RequestBody PostWriteDTO post) {
        return ResponseEntity.ok().body(postService.save(post));
    }
    @GetMapping("/user/{username}")
    public ResponseEntity<List<PostReadDTO>> getPostByUser(@PathVariable String username){
        System.out.println(username);
        return ResponseEntity.ok().body(postService.getPostByUser(userService.getUser(username)));
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostReadDTO>> getPosts() {
        return ResponseEntity.ok().body(postService.getPosts());
    }
//   API lọc ,nhận vào ID tỉnh , ID quận ,ID phường , and skill
//    cái nào không chọn thì cho giá trị là "" hoặc 0 và lọc theo các giá trị chọn
//    @PostMapping ("/filter")
//    public ResponseEntity<List<PostReadDTO>> filter(@RequestBody FormSearch form){
//        return ResponseEntity.ok().body(postService.filter(form.getProvince_id(),form.getDistric_id(),form.getWard_id(),form.getText())) ;
//    }
// API tìm kiếm theo text , nhận vào text
    @GetMapping("/search")
    public ResponseEntity<List<PostReadDTO>> search(@RequestParam(name = "text") String text) {
        return ResponseEntity.ok().body(postService.searchBytext(text));
    }
}


