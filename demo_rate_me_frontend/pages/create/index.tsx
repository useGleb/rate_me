import { NextPage } from "next";
import styles from "@/styles/Create.module.scss";
import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { createPage } from "../../shared/services/api.service";
import { CreatePageRequestData } from "../../shared/interfaces/api.interface";
import RMButton from "../../components/inputs/RMButton";
import RMImageInput from "../../components/inputs/RMImageInput";

const CreatePage: NextPage = () => {
  const { handleSubmit, register, formState, reset, control } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: FieldValues) => {
    setLoading(true);
    try {
      await createPage(e as unknown as CreatePageRequestData).then((e) => {
        //ToDo fix structure so file result don't get send to the server :)
        router.push(`/page/${e.id}`);
      });
      reset();
    } catch {
      alert("Error!");
    }
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <main className={styles.main}>
      <h1>Create Your Rating Page</h1>
      <form className={styles.form_container} onSubmit={handleSubmit(submit)}>
        <TextField
          size="small"
          label="Your Name"
          {...register("name", {
            required: "Please, enter your name",
            maxLength: {
              value: 24,
              message: "Your name is too long! :'(",
            },
          })}
          fullWidth
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <TextField
          size="small"
          multiline
          row={3}
          minRows={3}
          maxRows={5}
          label="A little bit about you"
          {...register("description", {
            required: "Please, tell a little bit about yourself",
            maxLength: {
              value: 2048,
              message: "Your message is too long!",
            },
          })}
          fullWidth
          error={!!errors.description}
          helperText={errors?.description?.message}
        />
        <Controller
          control={control}
          name="categories"
          rules={{
            validate: {
              required: (value) => {
                if (!Array.isArray(value) || value?.length === 0)
                  return "Please, input at least one category!";
              },
              maxLength: (value) => {
                if (!Array.isArray(value) || value?.length > 3)
                  return "Maximum category count is 3!";
              },
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              freeSolo
              multiple
              fullWidth
              options={[]}
              onChange={onChange}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="In which categories do you want rating?"
                    size="small"
                    variant="outlined"
                    error={!!errors.categories}
                    helperText={errors?.categories?.message}
                  />
                );
              }}
              onChange={(event, values, reason) => onChange(values)}
              defaultValue={[]}
              value={value as unknown as string[]}
            />
          )}
        />
        <Controller
          control={control}
          name="image"
          rules={{
            validate: {
              required: (value) => {
                if (!value.file)
                  return "Please, upload image for your rating page";
              },
            },
            maxLength: 5,
          }}
          defaultValue={{ file: undefined, raw: undefined }}
          render={({ field: { onChange, value } }) => (
            <RMImageInput value={value} onChange={onChange} />
          )}
        />
        {errors?.image?.message}
        <RMButton type="submit" loading={loading}>
          <h2>Submit</h2>
        </RMButton>
      </form>
    </main>
  );
};

export default CreatePage;
