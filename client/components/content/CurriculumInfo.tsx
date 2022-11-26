import React from "react";
import styles from "./CurriculumInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { ICurriculumContent } from "../../types/contents";
import Image from "next/image";
import Link from "next/link";
interface CurriculumInfoProps {
  curriculumInfo: ICurriculumContent[];
  contentsId: number;
}

const CurriculumInfo = ({
  contentsId,
  curriculumInfo,
}: CurriculumInfoProps) => {
  console.log("dadsa", contentsId);
  const handleChapterDeleteClick = async () => {
    // try{
    //   const status = await delChapter()
    // }
  };

  const handleClassDeleteClick = async () => {};

  return (
    <>
      {curriculumInfo.map((e, index) => (
        <div key={index} className={styles.Wrapper}>
          <div className={styles.thumbnail}>
            <Image src={e.thumbnail} alt={e.title} fill={true} />
          </div>
          <div className={styles.chapterWrapper}>
            <div className={styles.chapterTitle}>
              <h4>{e.chapterOrder}</h4>
              <div className={styles.chapter}>
                <h3>{e.title}</h3>
                <span>
                  <Link
                    href={{
                      pathname: "/upload/chapter",
                      query: { slug: "edit" },
                    }}
                  >
                    <button className={styles.btn}>수정</button>
                  </Link>
                  <button
                    onClick={handleChapterDeleteClick}
                    className={styles.btn}
                  >
                    삭제
                  </button>
                </span>
              </div>

              {e.uploadClassList.map((e, index) => (
                <>
                  <div className={styles.class}>
                    <div>
                      <h4 key={index}>{e.title}</h4>
                      <h5>영상길이</h5>
                    </div>
                    <div>
                      <Link
                        href={{
                          pathname: "/upload/class",
                          query: { slug: "edit" },
                        }}
                      >
                        <button className={styles.btn}>수정</button>
                      </Link>
                      <button
                        onClick={handleClassDeleteClick}
                        className={styles.btn}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </>
              ))}

              <div className={styles.addbtnWrapper}>
                <Link href={"/upload/class"}>
                  <button className={styles.addbtn}>
                    <FontAwesomeIcon
                      icon={faPencil}
                      className={styles.fontimg}
                    />
                    강의 추가하기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CurriculumInfo;
