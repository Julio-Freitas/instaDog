import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { DELELE_PHOTO } from "../../api/api";
import { UserContext } from "../../context/usetContext";
import useFetch from "../../hooks/useFetch";
import Loading from "../loading";
import PhotoComment from "../photoComment";
import PhotoDelete from "../photoDelete";
import Style from "./PhotoContent.module.css";

type PropsType = {
  acessos: string;
  id: number;
  src: string;
  title: string;
  author: string;
  idade: number;
  peso: number;
  total_comments?: number;
};

type PropsDataResult = {
  photo: PropsType;
  comments: [
    {
      [key: string]: string;
    }
  ];
};

type TypeData = {
  data: PropsDataResult;
  setModalPhoto: (id: number | null) => void;
};
const PhotoContent = ({ data, setModalPhoto }: TypeData) => {
  const user = useContext(UserContext);
  const { photo, comments } = data;

  const { error, loading, request } = useFetch();

  const _handleDeletePhoto = useCallback(
    async (id: number) => {
      const { url, options } = DELELE_PHOTO(id);
      const { response } = await request(url, options);
      if (response && response.ok) setModalPhoto(null);
    },
    [request, setModalPhoto]
  );

  return (
    <>
      {loading && <Loading />}
      <div className={Style["photo"]}>
        <div className={Style["img"]}>
          <img src={photo.src} alt={photo.title} />
        </div>
        <div className={Style["details"]}>
          <div>
            <p className={Style["author"]}>
              {user.data?.username === photo.author ? (
                <PhotoDelete onClick={() => _handleDeletePhoto(photo.id)} />
              ) : (
                <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
              )}
              <span className={Style["view"]}>{photo.acessos} </span>
            </p>
            <h1 className="title">
              <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
            </h1>

            <ul className={Style["attributes"]}>
              <li>{photo.peso} KG </li>
              <li>{photo.idade} anos</li>
            </ul>
          </div>
        </div>
        <PhotoComment photoId={photo.id} comments={comments} />
        {error}
      </div>
    </>
  );
};

export default PhotoContent;
