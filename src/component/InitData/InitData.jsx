import React, { useEffect, useState } from "react";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
import { addData, deleteData, getData } from "../../firebase/firebase";
import { us } from "./data";
function InitData() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    account: "",
    password: "",
    createdAt: new Date(),
    avatar: "",
    auth: ""
  });
  const getUser = async () => {
    setUsers(await getData("user"));
  };
  const addUser = async (item) => {
    await addData("user", item, '');
    getUser();
  };
  const deleteUser = async (id) => {
    await deleteData("user", id);
    getUser();
  };

  const add = () => {
    // if (
    //   user.name &&
    //   user.account &&
    //   user.password &&
    //   user.avatar &&
    //   user.auth
    // ) {
    //   setUser((item) => ({
    //     ...item,
    //     createdAt: new Date()
    //   }));
    //   addUser(user);
    // } else {
    //   console.error("data trong");
    // }
    us.forEach((element) => {
      addUser(element);
    });
  };

  const deletes = () => {
    users.forEach((element) => {
      deleteUser(element.id);
    });
  };

  const get = () => {
    getUser();
  };

  useEffect(() => {
    // getUser();
  }, []);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>stt</th>
            <th>name</th>
            <th>account</th>
            <th>password</th>
            <th>auth</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.account}</td>
              <td>{item.password}</td>
              <td>{item.auth}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => get()}>getdata</button>
      <button onClick={() => add()}>addData</button>
      <button onClick={() => deletes()}>deleteData</button>
    </>
  );
}

export default InitData;
