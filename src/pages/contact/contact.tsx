import React from "react";

import Style from "./contact.module.css";

const Contact: React.FC = () => {
  return (
    <section className={Style["contact"]}>
      <div className={Style["contact-img"]}>Img</div>

      <div className={Style["contact-info"]}>
        <label>
          Telefone: <span>(31) 9 8729-6252</span>
        </label>

        <label>
          Endereço:{" "}
          <span>
            Rua: Um, Nº80 <br />
            Lagoas - Brasil
          </span>
        </label>
      </div>
    </section>
  );
};

export default Contact;
