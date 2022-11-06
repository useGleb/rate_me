import React, { useEffect, useState } from "react";
import { IPageData } from "@/shared/interfaces/page.interface";
import CategoryRatingPreview from "../CategoryRatingPreveiw";
import Image from "next/image";
import styles from "./page_content.module.scss";
import { Typography } from "@mui/material";
import LoadingWrapper from "@/components/LoadingWrapper";
import PageContentSkeleton from "./PageContentSkeleton";

type PageContentProps = {
  page: IPageData;
  loading: boolean;
};

const PageContent: React.FC<PageContentProps> = ({ page, loading }) => {
  return (
    <LoadingWrapper
      className={styles.page_container}
      loading={loading}
      fallback={<PageContentSkeleton />}
    >
      <div className={styles.user_info}>
        <div className={styles.user_image_container}>
          <Image
            src={process.env.BACKEND_URL + "/" + page.image_path}
            alt="User Image"
            layout="fill"
            objectFit="contain"
            className={styles.user_image}
          />
        </div>
        <div className={styles.user_info_container}>
          <Typography variant="h4">{page.name}</Typography>
          <Typography variant="subtitle1">{page.description}</Typography>
          {page.categories?.map((category, index) => (
            <CategoryRatingPreview category={category} key={index} />
          ))}
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default PageContent;
