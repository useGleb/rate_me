import { Skeleton } from "@mui/material";
import React from "react";
import styles from "../page_content.module.scss";
import skeletonStyles from "./page_content_skeleton.module.scss";

const PageContentSkeleton: React.FC = () => {
  return (
    <div className={styles.page_container}>
      <div className={styles.user_info}>
        <div className={styles.user_image_container}>
          <Skeleton variant="rectangular" className={styles.user_image} />
        </div>
        <div
          className={`${styles.user_info_container} ${skeletonStyles.user_info_skeleton}`}
        >
          <Skeleton className={skeletonStyles.skeleton_text__title} />
          <Skeleton
            variant="text"
            height={120}
            className={skeletonStyles.skeleton_text__title}
          />
          <Skeleton className={skeletonStyles.skeleton_text__title} />
          <Skeleton className={skeletonStyles.skeleton_text__title} />
          <Skeleton className={skeletonStyles.skeleton_text__title} />
        </div>
      </div>
    </div>
  );
};

export default PageContentSkeleton;
