package main008.BED.uploadClass.entity;

import lombok.*;
import main008.BED.chapter.entity.Chapter;
import main008.BED.docs.entity.Docs;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UploadClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uploadClassId;

    @Column
    private String title;

    @Lob
    private byte[] video;

    @Column
    private String name; // video name - eg: "video.mp4"

    @ManyToOne // 양방향
    @JoinColumn(name = "CHAPTER_ID")
    private Chapter chapter;

    @OneToOne
    @JoinColumn(name = "DOCS_ID")
    private Docs docs;

}