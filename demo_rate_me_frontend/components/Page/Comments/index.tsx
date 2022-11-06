import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./comments.module.scss";
import SendIcon from "@mui/icons-material/Send";
import CommentsForm from "./CommentForm";
import { IPageData } from "../../../shared/interfaces/page.interface";
import CommentsList from "./CommentList";
import { getComments } from "../../../shared/services/api.service";
import { useQuery } from "@tanstack/react-query";

type CommentsProps = {
  page: IPageData;
  loading: boolean;
};

const Comments: React.FC<CommentsProps> = ({ page, loading }) => {
  //ToDo calls for comments should be paginated, in other words {take, skip} on the backend with custom/library middleware for pagination.
  //This will do for now
  const { isLoading, data, refetch } = useQuery(
    ["pageDetails", page.id],
    () => getComments(page.id),
    {
      placeholderData: [],
    }
  );

  return (
    <div className={styles.comments_container}>
      <Typography variant="h6">Leave Feedback</Typography>
      <CommentsForm
        id={page.id}
        onComment={refetch}
        categories={page.categories}
        loading={loading || isLoading}
      />
      <Typography variant="h6">Comments - {data.length}</Typography>
      <CommentsList comments={data} loading={isLoading} />
    </div>
  );
};

export default Comments;
