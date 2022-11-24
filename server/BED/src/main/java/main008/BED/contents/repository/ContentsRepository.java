package main008.BED.contents.repository;

import main008.BED.contents.entity.Contents;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public interface ContentsRepository extends JpaRepository<Contents, Long> {

    Contents findByContentsId(Long contentsId);

    boolean existsByContentsId(Long contentsId);

    List<Contents> findByUsersUsersId(Long usersId);

    Page<Contents> findByCategories(Contents.Categories categories, Pageable pageable);
}
