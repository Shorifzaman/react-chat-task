import  { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import initializeAuthentication from '../../pages/Firebase/firebase.init';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userLogout, userRegister } from '../../store/actions/authAction';

initializeAuthentication();

const useFirebase = () => {
  const { myInfo } = useSelector(state => state.auth);
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const auth = getAuth()
  const dispatch = useDispatch ();
  const [authError, setAuthError] = useState('')

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
        
        // setUser(user)
        const destination = location?.state?.from || '/';
        navigate(destination)
        
        setAuthError('')
      }).catch((error) => {
        setAuthError(error.message)

      })
  }

  // register user 
  const registerUser = (email, password, userName, location, navigate) => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)

      .then((userCredential) => {
        // Signed in 
        const user = userCredential.myInfo;
        
        // save to database-------------
        // ...
        setAuthError('');
        // setUser(newUser)
        const newUser = {
          userName: user.displayName,
          email: user.email,
          password: 'noneedofpassword',
          // image: 'file',
          emailVerified: user.emailVerified,
        };
        // REGISTER USER IN DATABASE
        registerToDB(newUser, location, navigate);
        // updateProfile----------
        updateProfile(auth.currentUser, {
          displayName: userName
        }).then(() => {
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });

        const destination = location?.state?.from || '/';
        navigate(destination)
        setAuthError('')
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setAuthError(error.message)
        // ..
      }).finally(() => {
        setIsLoading(false);
      })
  }


  const loginUser = (email, password, location, navigate) => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location?.state?.from || '/';
        navigate(destination)
        setAuthError('')

      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setAuthError(errorMessage)
      }).finally(() => {
        setIsLoading(false)

      })
  }


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
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {
        const newUser = {
          name: user?.displayName,
          email: user?.email,
          emailVerified: user?.emailVerified,
        };

        setUser(newUser)
      } else {
        setUser({})
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [auth])
// --------------------------------------------------------------//
const registerToDB = (newUser, location, navigate) => {
  dispatch(userRegister(newUser));

  const redirect_uri = location?.state?.from || '/';
  navigate(redirect_uri);
};

const loginToDB = (email, password) => {
  try {
    const response = (
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    dispatch(userLogin(email)); // get the user all info for profile page
    console.log(response?.data?.message);
    console.log(user, 'this is the user');
  } catch (error) {
    console.log(error.message);
    setAuthError(error.message);
  }
};
const logoutFromDB =  () => {
  dispatch(setUser({}));
  setAuthError('');
  dispatch(userLogout());
};
// --------------------------------------------------------------//


  return {
    user, setUser,
    signInWithGoogle,
    registerUser,
    loginUser,
    isLoading,
    setIsLoading,
    authError,
    logOut,
    registerToDB,
    loginToDB

  }
};

export default useFirebase;