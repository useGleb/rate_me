import React from "react";
import { IRatingCategory } from "@/shared/interfaces/page.interface";
import { Typography } from "@mui/material";
import styles from "./rmrating_category_input.module.scss";
import StarIcon from "@mui/icons-material/Star";
// import StarBorderIcon from "@mui/icons-material/StarBorder";

type RatingCategoryProps = {
  category: IRatingCategory;
};

const RatingCategory: React.FC<RatingCategoryProps> = ({
  category,
  ...rest
}) => {
  const generateScale = () => {
    const ratingObject = [];
    for (let i = 0; i < 5; ++i) {
      ratingObject.push(<StarIcon />);
    }
    return ratingObject;
  };

  return (
    <div {...rest} className={styles.rating_category_container}>
      <Typography variant="h5">{category.name}</Typography>
      <div className={styles.rating_scale}>{generateScale()}</div>
    </div>
  );
};

export default RatingCategory;
