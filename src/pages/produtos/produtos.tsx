import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Style from "./Produtos.module.css";

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

type ProdutosType = ProdutoType[];
const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<ProdutosType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadingProdutos = useCallback(async () => {
    try {
      setLoading(true);

      const request = await fetch(
        "https://ranekapi.origamid.dev/json/api/produto"
      );
      if (!request.ok) throw new Error();

      const data = await request.json();

      setProdutos(data);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Algo de errado aconteceu. tente mais tarde");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadingProdutos();
  }, [loadingProdutos]);

  if (loading) return <div className="loading" />;

  if (error) return <div className="error">{error}</div>;

  if (!produtos?.length) return <div>Nenhum resultado encontrado!</div>;

  return (
    <section className={Style["section-produtos"]}>
      <h1>Todos os produtos </h1>
      <div className={Style["wrapper-produtos"]}>
        {produtos?.map((produto) => (
          <Link
            to={`/produtos/${produto.id}`}
            key={produto.id}
            className={Style["produto"]}
          >
            <h2>{produto.nome}</h2>
            <img
              src={produto.fotos[0].src}
              title={produto.fotos[0].titulo}
              alt="Produtos"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Produtos;
