import React, { useCallback, useEffect, useState, useRef } from "react";
import Style from "./Produto.module.css";
import { useParams } from "react-router-dom";

type FotosType = {
  src: string;
  titulo: string;
};

type ProdutoType = {
  descricao: string;
  fotos: FotosType[];
  id: string;
  nome: string;
  preco: string;
  usuario_id: string;
  vendido: string;
};

const Produto: React.FC = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState<ProdutoType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fotosRef = useRef<HTMLImageElement | null>(null);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(0);

  const getProdutoById = useCallback(async () => {
    try {
      setLoading(true);
      const request = await fetch(
        `https://ranekapi.origamid.dev/json/api/produto/${id}`
      );

      if (!request.ok) throw new Error();

      const data = await request.json();
      setProduto(data);
    } catch (error) {
      setError("Algo de errado aconteceu. tente mais tarde");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getProdutoById();
  }, [getProdutoById]);

  useEffect(() => {
    if (fotosRef.current) {
      const { width } = fotosRef.current.getBoundingClientRect();
      setPosition(-(width * active));
    }
  }, [active]);

  if (loading) return <div className="loading" />;

  if (error) return <div className="error">{error}</div>;

  const _handlePrev = () => {
    if (active) setActive((prev) => prev - 1);
  };

  const _handleNext = () => {
    if (produto && active < produto?.fotos.length - 1)
      setActive((prev) => prev + 1);
  };

  const currency = function (number: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(number);
  };

  const renderProduto = ({
    descricao,
    fotos,
    id,
    nome,
    preco,
    usuario_id,
    vendido,
  }: ProdutoType) => (
    <section className={Style["produto"]}>
      <div>
        <button onClick={_handlePrev}>Prev</button>
        <button onClick={_handleNext}>Next</button>
        <div className={Style["fotos-slider"]} ref={fotosRef}>
          {fotos.map((foto, index) => (
            <img
              src={foto.src}
              title={foto.titulo}
              key={index}
              alt="fotos"
              style={{
                transform: `translateX(${position}px)`,
              }}
              className={index === active ? Style["active-slider"] : ""}
            />
          ))}
        </div>
      </div>

      <div className={Style["produto-info"]}>
        <h2>{nome}</h2>
        <p className={Style["preco"]}>{currency(Number(preco))}</p>
        <p className={Style["descricao"]}>{descricao}</p>
        <button disabled={vendido.toLocaleLowerCase() === "true"}>
          Comprar
        </button>
      </div>
    </section>
  );

  return produto ? renderProduto(produto) : null;
};

export default Produto;
