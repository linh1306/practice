import React, { useContext, useEffect, useState } from 'react';
import PageUser from '../../component/pageUser/PageUser';
import { getById, getData } from '../../firebase/firebase';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment/moment';

const ListLoginUser = () => {
  const { user } = useContext(AuthContext);
  const [arr, setArr] = useState([])
  const getLoginAt = async () => {
    if (Object.keys(user).length > 0) {
      const dataLogin = await getById('loginAt', user.uid)
      setArr(dataLogin ? dataLogin.loginAt : [])
    }
  }
  useEffect(() => {
    getLoginAt()
  }, [])
  // user
  // 
  // 
  // 
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Stt</th>
            <th>Login at</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{moment(item.seconds * 1000 + item.nanoseconds / 1000000).format('HH:mm DD/MM/YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListLoginUser;