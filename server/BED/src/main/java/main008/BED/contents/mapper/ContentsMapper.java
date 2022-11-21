package main008.BED.contents.mapper;

import main008.BED.contents.dto.ContentsDto;
import main008.BED.contents.entity.Contents;
import main008.BED.likes.mapper.LikesMapper;
import main008.BED.users.mapper.UsersMapper;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ContentsMapper {

    Contents postToContents(ContentsDto.Post post);

    ContentsDto.Response contentsToResponse(Contents contents);

    default List<ContentsDto.Response> contentsToResponses(List<Contents> contents, UsersMapper usersMapper) {

        return contents.stream()
                .map(content -> ContentsDto.Response.builder()
                        .contentsId(content.getContentsId())
                        .title(content.getTitle())
                        .thumbnail(content.getThumbnail())
                        .likesCount(content.getLikes().getLikesCount())
                        .categories(content.getCategories())
                        .users(usersMapper.usersToResponse(content.getUsers()))
                        .build())
                .collect(Collectors.toList());
    }
}
