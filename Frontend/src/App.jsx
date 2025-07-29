import { Routes,Route, Navigate } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';

import SignupPage from './pages/SignupPage';


const App = () => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-bg-[#ffffffff]  via-[#ff5602cf] to-[#ff5602cf] font-[Supreme-Regular] '>
            <Routes>
                <Route path='/signup' element={ <SignupPage /> } />
            </Routes>
            <Toaster position="center-top"/>
        </div>
    );

}


export default App;