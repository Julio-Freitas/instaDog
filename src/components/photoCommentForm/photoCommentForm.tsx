import React, { FormEvent, useContext, useState } from "react";
import { POST_COMMENTS } from "../../api/api";

import { ReactComponent as SendIcon } from "../../assets/enviar.svg";
import { UserContext } from "../../context/usetContext";
import useFetch from "../../hooks/useFetch";

import Style from "./PhotoFormComment.module.css";

type PropsType = {
  photoId: number;
  setCommentsPhoto: (comment: any) => void;
};

const PhotoCommentForm: React.FC<PropsType> = ({
  photoId,
  setCommentsPhoto,
}) => {
  const [comment, setComment] = useState("");

  const { error, request } = useFetch();
  const { login } = useContext(UserContext);

  const _handleSubmitComment = async (event: FormEvent) => {
    event.preventDefault();
    const { url, options } = POST_COMMENTS(photoId, { comment });

    const { response, json } = await request(url, options);

    if (response && response.ok)
      setCommentsPhoto((comments: any) => [...comments, json]);
    setComment("");
  };
  return login ? (
    <form onSubmit={_handleSubmitComment} className={Style["commentsForm"]}>
      <label htmlFor="photoComment">
        <textarea
          id="photoComment"
          name="photoComment"
          value={comment}
          placeholder="comentário"
          onChange={({ target }) => setComment(target.value)}
          autoFocus={true}
        />
      </label>
      <button type="submit">
        {}
        <SendIcon />
      </button>
      {error}
    </form>
  ) : null;
};

export default PhotoCommentForm;
