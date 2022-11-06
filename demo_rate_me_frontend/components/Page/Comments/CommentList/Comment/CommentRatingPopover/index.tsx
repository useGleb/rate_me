import React from "react";
import { ICategoryRating } from "@/shared/interfaces/rating.interface";
import { Popover, Typography } from "@mui/material";
import styles from "./comment_rating_popover.module.scss";

type CommentRatingDropdown = {
  ratings: ICategoryRating;
  anchorEl: any;
  onClose: () => void;
};

const CommentRatingDropdown: React.FC<CommentRatingDropdown> = ({
  ratings,
  anchorEl,
  onClose,
}) => {
  const open = Boolean(anchorEl);
  return (
    <Popover anchorEl={anchorEl} open={open} onClose={onClose}>
      <div className={styles.popover}>
        {ratings.map((rating, index) => (
          <div key={index}>
            <Typography variant="h6">{rating.category.name}</Typography>
          </div>
        ))}
      </div>
    </Popover>
  );
};

export default CommentRatingDropdown;
