import { FC } from "react";
import ShorturlForm from "./ShorturlForm";
import styles from "./ShorturlList.module.scss";
import ShorturlList from "./ShorturlList";

const ShorturlContainer: FC = () => {
  return (
    <>
      <h1 className={styles.pageTitle}>Shorten url List</h1>
      <ShorturlForm />
      <ShorturlList />
    </>
  );
};

export default ShorturlContainer;
