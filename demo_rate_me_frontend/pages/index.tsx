import { Typography } from "@mui/material";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>RateMe</title>
        <link rel="favicon" href="favicon.ico" />
      </Head>

      <main className={styles.main_container}>
        <Typography variant="h2">Rate anything!</Typography>
        <div className={styles.rating_container}>
          <a href="/page" className={styles.create_button}>
            <Typography variant="h6" color="primary">
              View
            </Typography>
          </a>
          <a href="/create" className={styles.view_button}>
            <Typography variant="h5">Create</Typography>
          </a>
        </div>
      </main>
    </div>
  );
}
