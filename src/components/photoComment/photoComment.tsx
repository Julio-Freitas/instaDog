import React, { useEffect, useRef, useState } from "react";
import PhotoCommentForm from "../photoCommentForm";

import Style from "./PhotoComment.module.css";

type PropsType = {
  photoId: number;
  comments: [
    {
      [key: string]: string;
    }
  ];
};

const PhotoComment: React.FC<PropsType> = ({ photoId, comments }) => {
  const [commentsPhoto, setCommentsPhoto] = useState(comments);

  const commentRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (commentRef.current) {
      const { current } = commentRef;
      current.scrollTop = current.scrollHeight;
    }
  }, [commentsPhoto]);
  return (
    <div className={Style["comments"]} ref={commentRef}>
      <ul>
        {commentsPhoto.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      <PhotoCommentForm photoId={photoId} setCommentsPhoto={setCommentsPhoto} />
    </div>
  );
};

export default PhotoComment;
