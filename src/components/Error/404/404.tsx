import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [redirectTime, setRedirectTime] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    let time: any = null;
    if (redirectTime > 0) {
      time = setInterval(() => {
        if (redirectTime > 0) setRedirectTime(redirectTime - 1);
      }, 1000);
    } else {
      navigate("/conta");
    }
    return () => clearInterval(time);
  }, [redirectTime, navigate]);
  return (
    <div>
      <h1 className="title">
        Página não encontrada :/ <br />
      </h1>
      <span> Você será redirecinado em {redirectTime}s</span>
    </div>
  );
};

export default NotFound;
