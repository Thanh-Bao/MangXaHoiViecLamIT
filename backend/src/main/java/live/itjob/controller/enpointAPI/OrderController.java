package live.itjob.controller.enpointAPI;

import live.itjob.entity.OrderEntity;
import live.itjob.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/order")
@Validated
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/save")
    public ResponseEntity<OrderEntity> save(@RequestBody OrderEntity order,
                                            @RequestParam int postId) {
        return ResponseEntity.ok().body(orderService.save(order, postId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderEntity>> getOrders() {
        return ResponseEntity.ok().body(orderService.findAllByUser());
    }

}
