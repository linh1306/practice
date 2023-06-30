import {  signInWithPopup,  signOut,  GoogleAuthProvider,  getAdditionalUserInfo,  onAuthStateChanged} from "firebase/auth";
import { auth, addData, getData, getById } from "./firebase";
import { async } from "@firebase/util";

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then( async (result) => {
      const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);

      if (additionalUserInfo.isNewUser) {
        const data = {
          name: user.displayName,
          account: user.email,
          password: null,
          createdAt: new Date(),
          avatar: user.photoURL,
          auth: "user",
          status: false
        };
        addData("user", data, '');
      }
      const dataLogin = await getById('loginAt',user.uid)
      addData("loginAt", {
        loginAt: [
          ...(dataLogin?dataLogin.loginAt : []),
          new Date(user.metadata.lastSignInTime)
        ]
      },user.uid);
    })
    .catch((error) => {
      console.log("Lỗi đăng nhập bằng Google:", error);
    });
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("Đăng xuất thành công");
    return "Đăng xuất thành công";
  } catch (error) {
    console.log("Lỗi đăng xuất:", error);
    throw error;
  }
};

export const checkLoginStatus = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user;
    } else {
      return false;
    }
  });
};
