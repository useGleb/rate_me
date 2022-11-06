import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IPageData } from "@/shared/interfaces/page.interface";
import styles from "./page_preview.module.scss";
import Image from "next/image";
import { translatePostDate } from "@/shared/utils/date.utils";
import theme from "../../../styles/theme";

type PagePreviewProps = {
  page: IPageData;
};

const PagePreview: React.FC<PagePreviewProps> = ({ page, ...rest }) => {
  const router = useRouter();
  const handlePreviewClick = () => {
    router.push(`/page/${page.id}`);
  };

  const [imageErrored, setImageErrored] = useState(false);

  return (
    <div
      {...rest}
      onClick={handlePreviewClick}
      className={styles.preview_container}
    >
      <Image
        src={
          imageErrored
            ? "/placeholder.jpg"
            : process.env.BACKEND_URL + "/" + page.image_path
        }
        className={styles.image}
        width="64"
        height="64"
        layout="fixed"
        alt="Preview Image"
        objectFit="cover"
        onError={() => setImageErrored(true)}
      />
      <div className={styles.preview_info_container}>
        <div className={styles.preview_info_header}>
          <Typography variant="h6" className={styles.text}>
            {page.name}
          </Typography>
          <Typography variant="body2" color="neutral.main">
            {translatePostDate(page.createdAt)}
          </Typography>
        </div>
        <Typography variant="subtitle1" className={styles.text}>
          {page.description}
        </Typography>
      </div>
    </div>
  );
};

export default PagePreview;
