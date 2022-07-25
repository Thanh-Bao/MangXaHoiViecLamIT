package live.itjob.controller.enpointAPI;

import live.itjob.DTO.CV.CVReadDTO;
import live.itjob.DTO.CV.CVWriteDTO;
import live.itjob.service.CVService;
import live.itjob.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/cv")
public class CVController {
    private final CVService cvService;
    private final UserService userService;
    @PostMapping(value = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> save (@RequestParam("title") String title,
                                        @RequestParam("skill") String skill,
                                        @RequestParam("education") String education,
                                        @RequestParam("username") String username,
                                        @RequestParam("file")MultipartFile file) throws Exception {
        CVWriteDTO cv= new CVWriteDTO(title,skill,education,file,username);
        cvService.save(cv);
        return ResponseEntity.ok().body("true") ;
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<CVReadDTO>> getAll (){
        return ResponseEntity.ok().body(cvService.getAll()) ;
    }
    @GetMapping("/get/{username}")
    public ResponseEntity<CVReadDTO> getByUser(@PathVariable String username){
        return ResponseEntity.ok().body(cvService.getByUser(userService.getUser(username))) ;
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete (@PathVariable int id) {
        cvService.delete(id);
        return ResponseEntity.ok().body("true") ;
    }
}
