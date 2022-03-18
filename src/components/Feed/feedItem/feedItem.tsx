import Style from "../Feed.module.css";

type PropsType = {
  acessos: string;
  id: number;
  src: string;
  title: string;
  setModalPhoto: (id: number) => void;
};

const FeedItem = (photo: PropsType) => (
  <li
    className={Style["feed-item"]}
    onClick={() => photo.setModalPhoto(photo.id)}
  >
    <img src={photo.src} alt={photo.title} />
    <span className={Style["feed-view"]}>{photo.acessos}</span>
  </li>
);

export default FeedItem;
