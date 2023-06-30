import React, { memo, useEffect, useState } from "react";
import { getData, updateData } from "../../../firebase/firebase";

function List() {
  const userProperties = ["avatar", "name", "account", "auth", "status"];
  const [users, setUsers] = useState([]);


  const changeStatus = async (item) => {
    const { id, ...updateItem } = item;
    updateItem.status = !updateItem.status;
    updateData("user", item.id, updateItem);
    setUsers(await getData("user"));
  };
  const getUser = async () => {
    setUsers(await getData("user"));
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Stt</th>
            {userProperties.map((item, index) => (
              <th key={index} scope="col" className="px-6 py-3">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((item, indexData) => (
            <tr key={item.id} className="align-middle bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-3">{indexData + 1}</td>
              {userProperties.map((properties, index) => (
                <td key={index} scope="row" className="px-6 py-3">
                  {properties === "avatar" ? (
                    <div className="relative w-10 h-10">
                      <img src={item.avatar} className="w-10 h-10 rounded-full" alt="Avatar" />
                      <div className="w-3 h-3 bg-[#62cb52] border-2 rounded-full text-xs absolute right-0 bottom-0"></div>
                    </div>
                  ) : properties === "status" ? (
                    <button
                      onClick={() => changeStatus(item)}
                      className={
                        item[properties] ? "btn btn-primary" : "btn btn-danger"
                      }
                    >
                      {item[properties] ? "active" : "passive"}
                    </button>
                  ) : (
                    item[properties]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(List);
