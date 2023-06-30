import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import List from "../../component/admin/listUser/List";
import { addData, deleteData, getData } from "../../firebase/firebase";
import ListCourse from "../../component/listCourse/ListCourse";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const {admin} = useContext(AuthContext)
  return (
    <div>
      <ListCourse /> 
    </div>
  );
}

export default Home;
