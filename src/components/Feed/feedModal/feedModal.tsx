import { MouseEvent, useEffect } from "react";
import { GET_PHOTO } from "../../../api/api";
import useFetch from "../../../hooks/useFetch";
import PhotoContent from "../../photoContent";
import Style from "./FeedModal.module.css";

type PropsPhoto = {
  photoId: number;
  setModalPhoto: (id: null | number) => void;
};

const FeedModal = ({ photoId, setModalPhoto }: PropsPhoto) => {
  const { request, data, loading, error } = useFetch();

  useEffect(() => {
    const loadingPhoto = async () => {
      const { url, options } = GET_PHOTO({ id: photoId });
      await request(url, options);
    };
    loadingPhoto();
  }, [photoId, request]);

  if (loading || !data) return <h1>Error</h1>;
  if (error) return <h1>Error</h1>;

  const _handleClickOutModal = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  };

  return (
    <div className={Style["modal"]} onClick={_handleClickOutModal}>
      <PhotoContent data={data} setModalPhoto={setModalPhoto} />
    </div>
  );
};

export default FeedModal;
