import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { POST_PHOTO } from "../../../api/api";
import Button from "../../../components/button";
import Input from "../../../components/input";
import Loading from "../../../components/loading";
import useFetch from "../../../hooks/useFetch";
import useForm from "../../../hooks/userForm";
import Style from "./UserPhotoPost.module.css";

type PhotoType = {
  lastModified?: number | null;
  lastModifiedDate?: Date | null;
  name: string;
  size: number;
  type: string;
  webkitRelativePath?: string | null;
};
type TypePhotoObject = {
  raw: PhotoType | any;
} | null;

const UserPhotoPost = () => {
  const nome = useForm("text");
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = useState<TypePhotoObject>({ raw: null });
  const [preview, setPreview] = useState<string | null>(null);
  const { data, error, loading, request } = useFetch();
  const [erroFiels, setErrorFields] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!!data) navigate("/conta");
  }, [data, navigate]);

  useEffect(() => {
    if (
      nome.error ||
      peso.error ||
      idade.error ||
      !nome.value ||
      !peso.value ||
      !idade.value
    ) {
      setErrorFields(true);
    } else {
      setErrorFields(false);
    }
  }, [nome, peso, idade]);

  const _handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("img", img?.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    const token = window.localStorage.getItem("token");

    if (!token) return;
    const { url, options } = POST_PHOTO(formData, token);
    request(url, options);
  };

  const _handleCheckImage = (file: File) => {
    if (file.type.includes("image")) {
      setImg({ raw: file });
      setPreview(URL.createObjectURL(file));
    } else {
      alert("O arquivo não é uma imagem");
      setImg(null);
      setPreview(null);
    }
  };
  const _handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
      _handleCheckImage(file);
    } else {
      setImg(null);
      setPreview(null);
    }
  };
  return (
    <>
      <section className={`${Style["photoPost"]} animateLeft`}>
        <form onSubmit={_handleSubmit}>
          <Input label="Nome" type="text" name="nome" {...nome} />
          <Input label="Peso" type="text" name="peso" {...peso} />
          <Input label="Idade" type="text" name="idade" {...idade} />
          <label htmlFor="img" className={Style["button-upload"]}>
            <input
              placeholder="img"
              type="file"
              name="img"
              id="img"
              onChange={_handleImgChange}
              accept="image/png, image/gif, image/jpeg"
            />
            Escolher imagem
          </label>

          <p> {img?.raw && img.raw.name}</p>
          <Button
            loading={loading}
            disabled={erroFiels || !preview}
            type="submit"
          >
            Enviar
          </Button>
        </form>

        {preview ? (
          <div className={Style["img-container"]}>
            <img src={preview} alt="Imagem" />
          </div>
        ) : null}

        {error}
      </section>

      {loading && <Loading />}
    </>
  );
};

export default UserPhotoPost;
