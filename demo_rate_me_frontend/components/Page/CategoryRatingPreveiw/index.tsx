import { Typography } from "@mui/material";
import React from "react";
import { IRatingCategory } from "../../../shared/interfaces/page.interface";
import styles from "./category_rating_preview.module.scss";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

type CategoryRatingPreviewProps = {
  category: IRatingCategory;
};

const CategoryRatingPreview: React.FC<CategoryRatingPreviewProps> = ({
  category,
  ...rest
}) => {
  const rating = Number(category.avg).toPrecision(2);
  const test = [1, 2, 3, 4, 5];
  const generateScale = () => {
    return test.map((undefined, index) => {
      const isFilled = Math.floor(rating - index) > 0;
      const isHalf = Math.floor(rating - index) < 1 && rating - index > 0;
      if (isHalf) {
        return <StarHalfIcon key={index} color="warning" />;
      }
      if (isFilled) {
        return <StarIcon key={index} color="warning" />;
      }

      return <StarBorderIcon key={index} color="warning" />;
    });
  };
  return (
    <div {...rest} className={styles.preview_container}>
      <div className={styles.general_rating}>
        <Typography variant="h6">{category.name}</Typography>
        <Typography variant="h6" color="warning.light">
          {rating}
        </Typography>
      </div>
      <div className={styles.scale}>{generateScale()}</div>
    </div>
  );
};

export default CategoryRatingPreview;
