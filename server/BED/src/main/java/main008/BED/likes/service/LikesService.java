package main008.BED.likes.service;

import lombok.RequiredArgsConstructor;
import main008.BED.contents.entity.Contents;
import main008.BED.contents.repository.ContentsRepository;
import main008.BED.exception.BusinessLogicException;
import main008.BED.exception.ExceptionCode;
import main008.BED.likes.entity.Likes;
import main008.BED.likes.entity.LikesDetail;
import main008.BED.likes.repository.LikesDetailRepository;
import main008.BED.likes.repository.LikesRepository;
import main008.BED.users.entity.Users;
import main008.BED.users.repository.UsersRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class LikesService {

    private final ContentsRepository contentsRepository;
    private final UsersRepository usersRepository;
    private final LikesRepository likesRepository;
    private final LikesDetailRepository likesDetailRepository;

    /**
     * readOnly = true
     *
     * 이 속성을 @Transactional 에 설정하게되면 읽기전용 트랜잭션이 된다.
     *
     * 읽기 전용 트랜잭션으로 설정하는 이유?
     * 일반 @Transactional은 해당하는 메서드가 호출될 때 JPA에서 commit이 호출된다.
     * JPA에서 commit이 호출되면 영속성 컨텍스트에서 flush처리를 하게되고 변경 감지를 하여 snapshot을 생성하게 된다.
     *
     * 조회 메서드에서는 불필요한 기능들이 동작하게 되는 것이다.
     * 즉, 조회메서드에는 readOnly = true를 적용시켜주어 JPA 성능을 최적화 시켜주는 것이 좋다.
     */
    @Transactional(readOnly = true)
    public List<LikesDetail> findTrueLikes(Likes likes) {

        return likesDetailRepository.findByLikesLikesIdAndLikedTrue(likes.getLikesId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKES_NOT_FOUND));
    }

    /**
     * 컨텐츠 좋아요 기능
     *
     * 트랜잭션 격리레벨 : 트랜잭션은 다른 트랙잭션에 영향을 주지 않고, 독립적으로 실행되는 격리성이 보장되어야한다.
     * isolation 어트리뷰트를 사용하여 격리 조정 옵션 지정이 가능하다.
     *
     * isolation = Isolation.SERIALIZABLE : 동일한 데이터에 대해 동시에 둘 이상의 트랜잭션 수행이 불가하도록 한다.
     */
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Likes likesContents(Long contentsId, Long usersId, LikesDetail likesDetail) {

        Contents contents = contentsRepository.findByContentsId(contentsId);
        Users users = usersRepository.findByUsersId(usersId);
        Likes likes = contents.getLikes();

        if (likesDetailRepository.findByUsersIdLikesId(usersId, likes.getLikesId()).isPresent()) {

            LikesDetail likesDetail1 = likesDetailRepository
                    .findByUsersIdLikesId(usersId, likes.getLikesId())
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKES_NOT_FOUND));

            reLikesClick(likesDetail1, likes, contents);
        } else {

            likesClick(likesDetail, likes, contents, users);
        }

        return likesRepository.save(likes);
    }

    /**
     * 이미 좋아요 누른 경우
     */
    private void reLikesClick(LikesDetail likesDetail, Likes likes, Contents contents) {

        if (likesDetail.getLiked()) {

            likesDetail.setLiked(false);
            likesRepository.likesCountDown(likes);
            contentsRepository.likesCountForContentsDown(contents.getContentsId());
        } else {

            likesDetail.setLiked(true);
            likesRepository.likesCountUp(likes);
            contentsRepository.likesCountForContentsUp(contents.getContentsId());
        }

        likesDetailRepository.save(likesDetail);
    }

    /**
     * 처음 좋아요를 누른 경우
     */
    private void likesClick(LikesDetail likesDetail, Likes likes, Contents contents, Users users) {

        likesDetail.setLikes(likes);
        likesDetail.setUsers(users);
        likesDetail.setLiked(true);
        likesDetail.setCreatedAt(ZonedDateTime.now(ZoneId.of("Asia/Seoul")));

        likes.getLikesDetails().add(likesDetail);
        likes.setContents(contents);
        likesRepository.likesCountUp(likes);
        contentsRepository.likesCountForContentsUp(contents.getContentsId());
    }
}