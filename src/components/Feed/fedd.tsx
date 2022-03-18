import React, { useEffect, useState } from "react";
import { GET_PHOTOS } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import Loading from "../loading";

import Style from "./Feed.module.css";
import FeedItem from "./feedItem";
import FeedModal from "./feedModal";

const Feed: React.FC = () => {
  const { data, loading, error, request } = useFetch();
  const [modalPhoto, setModalPhoto] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = GET_PHOTOS({ page: 1, total: 6, user: "0" });
      await request(url, options);
    }

    fetchPhotos();
  }, [request]);

  if (loading) return <Loading />;

  if (error) return <h1>Error</h1>;

  if (!data) return <div>Eror...</div>;
  else
    return (
      <>
        <ul className={Style["feed-list"]}>
          {[...data].map((photo: any) => (
            <FeedItem key={photo.id} setModalPhoto={setModalPhoto} {...photo} />
          ))}
        </ul>
        {modalPhoto && (
          <FeedModal photoId={modalPhoto} setModalPhoto={setModalPhoto} />
        )}
      </>
    );
};

export default Feed;
