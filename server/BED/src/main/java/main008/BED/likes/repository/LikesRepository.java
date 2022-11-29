package main008.BED.likes.repository;

import main008.BED.likes.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {

    @Modifying(clearAutomatically = true) // select 제외한 @Query 어노테이션 사용 쿼리에서 사용, modifying query 는 int 혹은 Integer 타입으로만 리턴 가능
    @Query(value = "UPDATE likes SET likes_Count = likes_Count + 1", nativeQuery = true)
    void likesCountUp(Likes likes);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE likes SET likes_Count = likes_Count - 1", nativeQuery = true)
    void likesCountDown(Likes likes);
}