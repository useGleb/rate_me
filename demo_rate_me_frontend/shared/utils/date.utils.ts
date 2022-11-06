import { DateTime } from "luxon";

export const translatePostDate = (iso_date: string) => {
  const now = DateTime.now();
  const postDate = DateTime.fromISO(iso_date);
  const differenceInMillis = now.toMillis() - postDate.toMillis();
  const hour = 3600000;
  const minute = hour / 60;
  const day = hour * 24;

  if (differenceInMillis <= minute) {
    return "Just now";
  }

  if (differenceInMillis > minute && differenceInMillis < hour) {
    return Math.round(differenceInMillis / minute) + " minutes ago";
  }

  if (differenceInMillis < hour * 24) {
    return Math.round(differenceInMillis / hour) + " hours ago";
  }

  if (differenceInMillis < day * 7) {
    return Math.round(differenceInMillis / day) + " days ago";
  }

  return postDate.toFormat("dd.MM");
};
