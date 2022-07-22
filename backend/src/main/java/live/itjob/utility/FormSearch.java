package live.itjob.utility;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormSearch {
    String text ;
    int province_id;
    int distric_id;
    int ward_id ;
}
