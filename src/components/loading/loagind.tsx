import { ReactComponent as LoadingIcon } from "../../assets/carregando.svg";
import Style from "./Loading.module.css";
const Loading = () => (
  <div className={Style["loading"]}>
    <LoadingIcon />
  </div>
);

export default Loading;
