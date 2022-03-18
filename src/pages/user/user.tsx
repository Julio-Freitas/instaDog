import React from "react";
import { Route, Routes } from "react-router-dom";
import Feed from "../../components/Feed";
import UserHeader from "./userHeader";
import UserPhotoPost from "./userPhotoPost";

const User: React.FC = () => {
  return (
    <section>
      <UserHeader />
      <Routes>
        <Route path="" element={<Feed />} />
        <Route path="estatisticas" element={<h2>estatisticas</h2>} />
        <Route path="fotos" element={<UserPhotoPost />} />
      </Routes>
    </section>
  );
};

export default User;
