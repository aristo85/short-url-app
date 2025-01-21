import { FC, useState } from "react";
import {
  useDeleteShorturlMutation,
  useGetShorturlsQuery,
  useGetOriginalUrlQuery,
} from "../shorturlApi";
import styles from "./ShorturlList.module.scss";
import ThreeDotMenu from "./ThreeDotMenu";
import DetailsModal from "./DetailsModal";

const ShorturlList: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<string>("");
  const { data, isLoading, isSuccess } = useGetShorturlsQuery();
  const [selectedShortUrl, setSelectedShortUrl] = useState<string | null>(null);
  const { refetch } = useGetOriginalUrlQuery(selectedShortUrl ?? "", {
    skip: !selectedShortUrl,
  });

  const [deleteShorturl] = useDeleteShorturlMutation();

  const handleDelete = async (shorturlToDelete: string) => {
    try {
      await deleteShorturl(shorturlToDelete).unwrap();
    } catch (err) {
      console.error("Failed to delete shorturl:", err);
    }
  };

  const handleRedirect = (shorturlToRedirect: string) => {
    if(shorturlToRedirect === selectedShortUrl) {
      refetch();
    } else {
      setSelectedShortUrl(shorturlToRedirect);
    }
  };

  const hadleDetails = (shorturl: string) => {
    setIsModalOpen(shorturl);
  };

  let theModal = null;
  if (isModalOpen) {
    theModal = (
      <DetailsModal
        open={!!isModalOpen}
        onClose={() => setIsModalOpen("")}
        shortUrl={isModalOpen}
      />
    );
  }

  return (
    <div className={styles.listItem}>
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        data.shortUrls.length < 1 ? (
          <p>No url to display</p>
        ) : (
          <ol>
            {data.shortUrls.map((shorturl) => (
              <li key={shorturl}>
                <p>
                  {shorturl}
                  <ThreeDotMenu
                    onDelete={() => handleDelete(shorturl)}
                    onDetails={() => hadleDetails(shorturl)}
                    onRedirect={() => handleRedirect(shorturl)}
                  />
                </p>
              </li>
            ))}
          </ol>
        )
      ) : (
        <p>Something went wrong</p>
      )}
      {theModal}
    </div>
  );
};

export default ShorturlList;
