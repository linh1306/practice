import { Container } from "react-bootstrap";
import { Nav, Navbar, NavDropdown, OverlayTrigger, Popover } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { signOutUser } from "../../firebase/login";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function BasicExample() {
  const { user, admin, setUser } = useContext(AuthContext);
  const [showBoxInfoUser, setShowBoxInfoUser] = useState(false);
  console.log(user)
  const handleSigout = async () => {
    await signOutUser();
    setUser(null);
  };



  return (
    <nav className="bg-slate-300 border-gray-200 dark:bg-gray-900 w-full fixed z-50" >
      <div className="relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-3">
          <div className="flex-1 relative flex flex-wrap items-center justify-between">
            <a href="https://flowbite.com/" className="flex items-center">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Logo Flowbite" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"><font style={{ verticalAlign: 'inherit' }}><font style={{ verticalAlign: 'inherit' }}>chảy máu</font></font></span>
            </a>
            <button data-collapse-toggle="navbar-solid-bg" type="button" className="pr-4 inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path></svg>
            </button>
            <div className="hidden absolute top-full w-full md:relative md:block md:w-auto" id="navbar-solid-bg">
              <ul className=" md:mr-4 flex flex-col font-medium rounded-lg bg-gray-200 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                <li>
                  <NavLink to="/" className={({ isActive }) => isActive ?
                    "block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    :
                    "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/init" className={({ isActive }) => isActive ?
                    "block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    :
                    "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>Init</NavLink>
                </li>
                <li>
                  <NavLink to="/login" className={({ isActive }) => isActive ?
                    "block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    :
                    "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>Login</NavLink>
                </li>
                <li>
                  <NavLink to="/test" className={({ isActive }) => isActive ?
                    "block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    :
                    "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>Test</NavLink>
                </li>
                {admin && (
                  <li>
                    <NavLink to="/list-user" className={({ isActive }) => isActive ?
                      "block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      :
                      "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>User</NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="flex items-center md:order-2 relative">
            <button type="button" onClick={() => setShowBoxInfoUser(!showBoxInfoUser)} className="hidden md:flex mr-3 text-sm bg-slate-300 border-2 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
              {user ? (
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={user.photoURL} alt=""></img>
              ) : (
                <NavLink to="/login" className="font-semibold px-3 py-2">Login</NavLink>
              )}
            </button>
            {user && (
              <div className={showBoxInfoUser
                ? "hidden md:block min-w-[300px] z-50 mt-3 absolute right-0 top-12 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                : "hidden"} >
                <div>
                  <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                    <div className="h-28 overflow-hidden rounded-t-lg bg-[#9d789b]"></div>
                    <div
                      className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                      <img src={user ? user.photoURL : ""} />
                    </div>
                    <div className="p-6 bg grid content-center">
                      <h4 className="mb-4 text-2xl font-semibold text-center">{user && user.displayName}</h4>
                      <hr />
                      <button className="mt-3 text-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded items-center" onClick={() => handleSigout()}>
                        <i className="fas fa-sign-out"></i>
                        <span>  Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav >
  );
}

export default BasicExample;
