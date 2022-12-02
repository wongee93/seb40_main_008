"use client";
import React, { useState } from "react";
import styles from "./ContentTabs.module.css";
import CurriculumInfo from "./CurriculumInfo";
import { IContent, ICurriculumContent } from "../../types/contents";
import { CustomTab } from "../Tab/CustomTab";

interface ContentTabsProps {
  contentInfo: IContent;
  curriculumInfo: ICurriculumContent[];
}

const ContentTabs = ({ contentInfo, curriculumInfo }: ContentTabsProps) => {
  return (
    <>
      <CustomTab
        tabs={["강의소개", "강사소개", "커리큘럼"]}
        contents={[
          <>
            {contentInfo?.details.length === 0 ? (
              <div className={styles.tabpannel}>강의 소개가 없습니다.</div>
            ) : (
              <div
                style={{
                  width: "90%",
                  padding: "20px",
                  height: "100%",
                  border: "1px solid white",
                  margin: "20px auto",
                }}
              >
                {contentInfo?.details}
              </div>
            )}
          </>,
          <>
            {contentInfo?.details.length === 0 ? (
              <div className={styles.tabpannel}>강사 소개가 없습니다.</div>
            ) : (
              <div
                style={{
                  width: "90%",
                  padding: "20px",
                  height: "100%",
                  border: "1px solid white",
                  margin: "20px auto",
                }}
              >
                {contentInfo?.tutorDetail}
              </div>
            )}
          </>,
          <>
            {contentInfo?.details.length === 0 ? (
              <div className={styles.tabpannel}>커리큘럼이 없습니다.</div>
            ) : (
              <CurriculumInfo
                role={contentInfo?.role}
                contentsId={contentInfo?.contentsId}
                curriculumInfo={curriculumInfo}
              />
            )}
          </>,
        ]}
      />
    </>
  );
};
export default ContentTabs;
