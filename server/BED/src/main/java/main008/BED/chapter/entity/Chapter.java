package main008.BED.chapter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main008.BED.contents.entity.Contents;
import main008.BED.uploadClass.entity.UploadClass;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String chapterOrder;

    @Column
    private String title;

    @Column
    private String thumbnail;

    @Column
    private String keys;

//    @ManyToOne
//    @JoinColumn(name = "CONTENTS_ID")
//    private Contents contents;

    @OneToMany(mappedBy = "chapter", cascade = CascadeType.REMOVE) // 양방향
    private List<UploadClass> uploadClassList;
}