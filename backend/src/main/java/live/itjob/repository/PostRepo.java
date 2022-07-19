package live.itjob.repository;

import live.itjob.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepo extends JpaRepository<PostEntity, Integer> {
    List<PostEntity> findAllByOrderByCreatedAtDesc();
    List<PostEntity> findAllByOrderByCreatedAtAsc();



    @Query(value = "select r.* from _post  as r join _location as l " +
            "on r.location_id= l.id where l._district_id= :distric_id and l._province_id= :province_id" +
            " and l._ward_id= :ward_id ORDER BY r._created_at DESC",nativeQuery = true)
    List<PostEntity> searchByLocation (@Param("province_id") int province_id,@Param("distric_id") int distric_id,
                                     @Param("ward_id") int ward_id);
    @Query(value = "select r.* from _post  as r join _location as l " +
            "on r.location_id= l.id where  l._province_id= :province_id ORDER BY r._created_at DESC"
            ,nativeQuery = true)
    List<PostEntity> searchByProvince ( @Param("province_id") int province_id);
    @Query(value = "select r.* from _post  as r join _location as l " +
            "on r.location_id= l.id where l._district_id= :distric_id and l._province_id= :province_id ORDER BY r._created_at DESC"
            ,nativeQuery = true)
    List<PostEntity> searchByProvinceAndDistric (@Param("province_id") int province_id,@Param("distric_id") int distric_id);
    @Query(value = "select * from _post where description like %:text% or title like %:text% ORDER BY _created_at DESC "
            ,nativeQuery = true)
    List<PostEntity> searchByText(@Param("text") String  text) ;
    @Query(value = "select r.* from _post  as r join _location as l " +
            "on r.location_id= l.id where l._district_id= :distric_id and l._province_id= :province_id" +
            " and l._ward_id= :ward_id and r.description like %:text% ORDER BY r._created_at DESC    ",nativeQuery = true)
    List<PostEntity> searchByLocationAndText (@Param("province_id") int province_id,@Param("distric_id") int distric_id,
                                       @Param("ward_id") int ward_id ,@Param("text") String text);
    @Query(value = "select r.* from _post  as r join _location as l " +
            "on r.location_id= l.id where l._province_id= :province_id" +
            "  and r.description like %:text% ORDER BY r._created_at DESC    ",nativeQuery = true)
    List<PostEntity> searchByProviceAndText (@Param("province_id") int province_id,@Param("text") String text);
    @Query(value = "select r.* from _post  as r join _location as l " +
            "on r.location_id= l.id where l._district_id= :distric_id and l._province_id= :province_id" +
            " and r.description like %:text% ORDER BY r._created_at DESC    ",nativeQuery = true)
    List<PostEntity> searchByProviceAndDistricAndText (@Param("province_id") int province_id,@Param("distric_id") int distric_id,
                                              @Param("text") String text);

    @Query(value = "select * from _post JOIN _user ON _post.user_id = _user.id where _user._username = ?1",nativeQuery=true)
    List<PostEntity> getPostByUsername(String username);
}
