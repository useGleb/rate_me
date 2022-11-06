import React, { useMemo, useState } from "react";
import { IComment } from "@/shared/interfaces/rating.interface";
import styles from "./comment.module.scss";
import { Typography } from "@mui/material";
import { translatePostDate } from "@/shared/utils/date.utils";
import { ICategoryRating } from "@/shared/interfaces/rating.interface";
import StarIcon from "@mui/icons-material/Star";
import CommentRatingPopover from "./CommentRatingPopover";

type CommentProps = {
  comment: IComment;
};

const Comment: React.FC<CommentProps> = ({ comment, ...rest }) => {
  const avgRating = useMemo(() => {
    const ratingSum = comment.ratings.reduce(
      (prev: ICategoryRating, curr: ICategoryRating) => prev + curr.rating,
      0
    );
    return (ratingSum / comment.ratings.length).toPrecision(2);
  }, [comment]);

  const [ratingsAnchorEl, setRatingsAnchorEl] = useState(null);

  const handleOpenRatings = (e: React.BaseSyntheticEvent) => {
    setRatingsAnchorEl(e.target);
  };

  const handleCloseRatings = () => {
    setRatingsAnchorEl(null);
  };

  return (
    <div {...rest} className={styles.comment}>
      <Typography variant="body2">
        {translatePostDate(comment.createdAt)}
      </Typography>
      <Typography variant="body1" textAlign="center">
        {comment.message}
      </Typography>
      <div className={styles.rating} onClick={handleOpenRatings}>
        <Typography variant="h6" color="warning.light">
          {avgRating}
        </Typography>
        <StarIcon color="warning" />
      </div>
      <CommentRatingPopover
        anchorEl={ratingsAnchorEl}
        ratings={comment.ratings}
        onClose={handleCloseRatings}
      />
    </div>
  );
};

export default Comment;
