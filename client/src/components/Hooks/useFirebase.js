import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import initializeAuthentication from '../../pages/Firebase/firebase.init';
import {
  userLogin,
  userLogout,
  userRegister,
} from '../../store/actions/authAction';

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  const auth = getAuth();
  const dispatch = useDispatch();

  // login google------------------------
  const signInWithGoogle = (location, navigate) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.myInfo;
        // save user to database--
        const newUser = {
          userName: user.displayName,
          email: user.email,
          password: 'noneedofpassword',
          // image: 'file',
          emailVerified: user.emailVerified,
        };
        // REGISTER USER IN DATABASE
        registerToDB(newUser, location, navigate);
        // saveUsers(user.email, user.displayName, 'PUT')

        setUser(user);
        const destination = location?.state?.from || '/';
        navigate(destination);

        setAuthError('');
      })
      .catch((error) => {
        setAuthError(error.message);
      });
  };

  // register user
  const registerUser = (email, password, userName, location, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        const newUser = {
          userName,
          email,
          password,
          emailVerified: user?.emailVerified,
        };

        // REGISTER USER IN DATABASE
        registerToDB(newUser, location, navigate);

        setAuthError('');
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loginUser = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError('');
        navigate('/');
        console.log('hitted');
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setAuthError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //logout-----------------

  const logOut = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      logoutFromDB();
    } catch (error) {
      console.log(error);
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // on auth state change -----------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await axios
          .get(
            'http://localhost:5000/api/auth/user-info?email=user51@gmail.com'
          )
          .then((response) => {
            const currentUser =
              Array.isArray(response.data) && response.data[0];
            if (user?.email) {
              setUser({
                name: currentUser.userName,
                email: currentUser.email,
                emailVerified: user?.emailVerified,
                image: currentUser.image,
              });
            }
          });
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  // --------------------------------------------------------------//
  const registerToDB = (newUser, location, navigate) => {
    dispatch(userRegister({ ...newUser, confirmPassword: newUser.password }));

    const redirect_uri = location?.state?.from || '/';
    navigate(redirect_uri);
  };

  const loginToDB = (email, password) => {
    try {
      const response =
        ({
          email,
          password,
        },
        {
          withCredentials: true,
        });

      dispatch(userLogin(email)); // get the user all info for profile page
      console.log(response?.data?.message);
      console.log(user, 'this is the user');
    } catch (error) {
      console.log(error.message);
      setAuthError(error.message);
    }
  };

  const logoutFromDB = () => {
    setAuthError('');
    setUser({});
    dispatch(userLogout());
  };
  // --------------------------------------------------------------//

  return {
    user,
    setUser,
    signInWithGoogle,
    registerUser,
    loginUser,
    isLoading,
    setIsLoading,
    authError,
    logOut,
    registerToDB,
    loginToDB,
  };
};

export default useFirebase;
