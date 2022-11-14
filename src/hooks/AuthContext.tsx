import { UserCredentials, User } from "@/type/User";
import { createContext, ReactNode, useContext, useState } from "react";
import { auth, firebase, firestore } from "@/services/firebase";

type AuthContextProps = {
  login: (data: UserCredentials) => Promise<any>;
  user: User;
  isLoading: boolean;
};

export const AuthContext = createContext({} as AuthContextProps);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAndSetUserFirestore = async (uid: string) => {
    const signedUser = await firestore.collection("users").doc(uid).get();
    const userFirestore = signedUser.data() as User;
    setUser({
      uid: uid,
      ...userFirestore,
    });
  };

  const login = async ({ email, password }: UserCredentials) => {
    setIsLoading(true);
    const response = await auth.signInWithEmailAndPassword(email, password);
    const signedUser = await firestore
      .collection("users")
      .doc(response.user?.uid)
      .get();

    const userFirestore = signedUser.data() as User;
    if (userFirestore) {
      await firestore.doc(`users/${userFirestore.uid}`).update({
        ...userFirestore,
      });

      await getAndSetUserFirestore(userFirestore.uid);
    } else {
      if (response?.user?.uid) {
        await firestore.doc(`users/${response?.user?.uid}`).set({
          uid: response?.user?.uid,
          email,
        });
        await getAndSetUserFirestore(response?.user?.uid);
      }
    }
    setIsLoading(false);
    return response;
  };

  return (
    <AuthContext.Provider value={{ login, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const props = useContext(AuthContext);
  return props;
};
