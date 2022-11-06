import { Typography } from "@mui/material";
import React from "react";
import { IComment } from "../../../../shared/interfaces/rating.interface";
import Comment from "./Comment";

type CommentsListProps = {
  comments: IComment[];
  loading: boolean;
};

const CommentsList: React.FC<CommentsListProps> = ({ comments, loading }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <Comment comment={comment} key={index} />
      ))}
    </>
  );
};

export default CommentsList;
