import { Skeleton, TextField } from "@mui/material";
import React, { useContext } from "react";
import styles from "./comments_form.module.scss";
import { Controller, useForm } from "react-hook-form";
import RMButton from "@/components/inputs/RMButton";
import { ratePage } from "@/shared/services/api.service";
import RMRatingInput from "@/components/inputs/RMRatingInput";
import { IRatingCategory } from "@/shared/interfaces/page.interface";
import { useMutation } from "@tanstack/react-query";
import { NotificationContext } from "@/components/notifications/NotificationProvider";
import { NotificationType } from "@/shared/interfaces/notification.interface";

type CommentsFormProps = {
  id: number;
  onComment: () => void;
  categories: IRatingCategory[];
  loading: boolean;
};

const CommentsForm: React.FC<CommentsFormProps> = ({
  id,
  onComment,
  categories,
  loading,
}) => {
  const { handleSubmit, register, reset, formState, control } = useForm();
  const { errors } = formState;
  const notify = useContext(NotificationContext);
  const { mutate, isLoading } = useMutation(ratePage, {
    onSuccess: () => {
      reset();
      notify(NotificationType.Success, "Thank you for the feedback!"),
        onComment();
    },
    onError: () => alert("Error!"),
  });

  const submit = async (e) => {
    mutate({ id, ...e });
  };

  return (
    <form className={styles.comments_container} onSubmit={handleSubmit(submit)}>
      <TextField
        label="Comment"
        fullWidth
        multiline
        minRows={2}
        {...register("message", {
          required: "Please, type in your comment",
        })}
        error={!!errors.message}
        helperText={errors?.message?.message}
      />
      <div className={styles.categories_container}>
        {loading ? (
          <Skeleton className={styles.skeleton_rating_category} />
        ) : (
          categories.map((category, index) => (
            <Controller
              key={index}
              control={control}
              name="category_ratings"
              defaultValue={categories.map((category) => ({
                category,
                rating: 0,
              }))}
              render={({ field: { onChange, value } }) => (
                <RMRatingInput
                  label={category.name}
                  key={index}
                  value={value[index].rating}
                  onChange={(categoryRatingValue) => {
                    const newRatings = value;
                    newRatings[index].rating = categoryRatingValue;
                    onChange(newRatings);
                  }}
                />
              )}
            />
          ))
        )}
      </div>
      <div className={styles.comments_button_container}>
        <div className={styles.send_button}>
          <RMButton
            type="submit"
            loading={isLoading}
            loadingAnimationMaxWidth={100}
          >
            Send
          </RMButton>
        </div>
      </div>
    </form>
  );
};

export default CommentsForm;
