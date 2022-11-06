import { NextPage } from "next";
import React, { Suspense, useEffect, useState } from "react";
import LoadingWrapper from "../../components/LoadingWrapper";
import styles from "@/styles/Recommendations.module.scss";

import PagePreview from "../../components/Page/PagePreview";
import { getRecommendations } from "../../shared/services/api.service";
import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

const UserPage: NextPage = () => {
  const { data, isLoading } = useQuery(
    ["recommendations"],
    getRecommendations,
    { initialData: { mostRecent: [], mostRated: [] } }
  );

  return (
    <>
      <Head>
        <title>RateMe - Recommendations</title>
      </Head>
      <main>
        <LoadingWrapper
          fallback={<CircularProgress size={48} />}
          loading={isLoading}
          className={styles.recommendations_container}
        >
          <div className={styles.recommendations_list}>
            <Typography variant="h4">Most Rated</Typography>
            {data.mostRated.map((page, index) => (
              <PagePreview page={page} key={index} />
            ))}
          </div>
          <div className={styles.recommendations_list}>
            <Typography variant="h4">Recent</Typography>

            {data.mostRecent.map((page, index) => (
              <PagePreview page={page} key={index} />
            ))}
          </div>
        </LoadingWrapper>
      </main>
    </>
  );
};

export default UserPage;
