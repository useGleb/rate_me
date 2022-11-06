import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { getPage } from "../../shared/services/api.service";
import styles from "@/styles/Details.module.scss";
import Comments from "../../components/Page/Comments";
import { useQuery } from "@tanstack/react-query";
import PageContent from "../../components/Page/PageContent";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Head from "next/head";
import { NotificationContext } from "../../components/notifications/NotificationProvider";
import { NotificationType } from "../../shared/interfaces/notification.interface";

const UserDetailsPage: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, data } = useQuery(
    ["pageDetails", id],
    () => getPage(Number(id)),
    {
      onError: () =>
        notify(NotificationType.Error, "Error while fetching data"),
      placeholderData: {
        id: 0,
        name: "",
        description: "",
        categories: [],
        image_path: "",
        createdAt: new Date(),
      },
    }
  );

  const handleGoBack = () => {
    router.push("/page");
  };

  const notify = useContext(NotificationContext);

  return (
    <>
      <Head>
        <title>RateMe - Details</title>
      </Head>
      <main>
        <div className={styles.content_container}>
          <div className={styles.header}>
            <IconButton className={styles.back_button} onClick={handleGoBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h3">Rate me!</Typography>
          </div>
          <PageContent loading={isLoading || data.id === 0} page={data} />
          <Comments page={data} loading={isLoading || data.id === 0} />
        </div>
      </main>
    </>
  );
};

export default UserDetailsPage;
