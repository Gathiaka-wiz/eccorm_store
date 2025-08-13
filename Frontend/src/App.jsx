import { useEffect } from "react";
import { Routes,Route, Navigate } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';

// Store import
import { useAuthStore } from "./store/authStore";

// Pages
import SignupPage from './pages/SignupPage';
import SigninPage from "./pages/SigninPage";
import VerifyAccountPage from './pages/VerifyAccount';
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

// Components
import LoadingSpinner from './components/LoadingSpinner'

// Protect routes that need authentication
const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to='/signup' replace/>
    }
    if (!user.isVerified) {
        return  <Navigate to='/verify-account' replace/>
    }

    return children;
}

// Redirect authenticated user 
const RedirectAuthenticatedUser = ({ children }) => {
    const  { isAuthenticated, user } = useAuthStore();
    
    if (isAuthenticated  && user.isVerified) {
        return <Navigate to='/' replace/>
    }

    return children;
}

const App = () => {
    const { isCheckingAuth, checkAuth } = useAuthStore();


    useEffect(() => {
        checkAuth();
    },[checkAuth]);

    if (isCheckingAuth) return <LoadingSpinner/>
    return (
        <div className=' w-screen h-100vh flex flex-col items-center justify-center bg-gradient-to-bl from-bg-[#ffffffff]  via-[#ff5602cf] to-[#ff5602cf] font-[Supreme-Regular] bg-no-repeat bg- bg-center  '>
            <Routes>
                <Route path='/' element={ <HomePage/> } ></Route>

                <Route 
                    path='signin' 
                    element={ 
                            <RedirectAuthenticatedUser>  
                                <SigninPage /> 
                            </RedirectAuthenticatedUser> 
                        } 
                />
                <Route 
                    path='/signup' 
                    element={ 
                            <RedirectAuthenticatedUser> 
                                <SignupPage/>  
                            </RedirectAuthenticatedUser> 
                            } 
                />
                <Route 
                    path='verify-account' 
                    element={ 
                            <RedirectAuthenticatedUser> 
                                <VerifyAccountPage />  
                            </RedirectAuthenticatedUser> 
                            } 
                />

                <Route 
                    path='product/:product_id'
                    element={
                        <ProductPage/>
                    }
                />
            </Routes>
            <Toaster position="center-top"/>
        </div>
    );

}


export default App;