import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Store import
import { useAuthStore } from './store/authStore';
import { useAdminStore } from './store/adminStore';

// Pages
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import VerifyAccountPage from './pages/VerifyAccount';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import UserPage from './pages/UserPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminProductsPage from './pages/AdminProductsPage';
import OrdersPage from './pages/OrdersPage';
import CheckoutPage from './pages/CheckoutPage';

// Components
import LoadingSpinner from './components/LoadingSpinner';

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
};

// Redirect authenticated user
const RedirectAuthenticatedUser = ({ children }) => {
	const  { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated  && user.isVerified) {
	    return <Navigate to='/' replace/>
	}

	return children;
};

// Redirect if not admin
const RedirectRegularUser = ({ children }) => {
	const { isAdmin } = useAdminStore();

	if (!isAdmin) {
	    return <Navigate to='/' replace />
	}

	return children;
};

const App = () => {
	const { isCheckingAuth, checkAuth } = useAuthStore();
	const { isCheckingAdmin, checkAdmin } = useAdminStore();

	useEffect(() => {
		checkAuth();
		checkAdmin();
	}, [checkAuth, checkAdmin]);

	if (isCheckingAuth && isCheckingAdmin) return <LoadingSpinner />;
	return (
		<div className=" w-screen h-100vh flex flex-col items-center justify-center bg-gradient-to-bl from-bg-[#ffffffff]  via-[#ff5602cf] to-[#ff5602cf] font-[Supreme-Regular] bg-no-repeat  bg-center  ">
			<Routes>
				{/* Public Routes */}
				<Route path="/" element={<HomePage />}></Route>

				<Route
					path="/product/:product_id"
					element={<ProductPage />}
				/>

				{/* User Routes */}
				<Route
					path="/cart"
					element={
						<ProtectedRoutes>
							<CartPage />
						</ProtectedRoutes>
					}
				/>

				<Route
					path="/profile"
					element={
						<ProtectedRoutes>
							<UserPage />
						</ProtectedRoutes>
					}
				/>

				<Route
					path="/orders"
					element={
						<ProtectedRoutes>
							<OrdersPage />
						</ProtectedRoutes>
					}
				/>
				<Route
					path="/checkout"
					element={
						<ProtectedRoutes>
							<CheckoutPage />
						</ProtectedRoutes>
					}
				/>

				{/* Auth Routes */}
				<Route
					path="/signin"
					element={
						<RedirectAuthenticatedUser>
							<SigninPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path="/signup"
					element={
						<RedirectAuthenticatedUser>
							<SignupPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path="/verify-account"
					element={
						<RedirectAuthenticatedUser>
							<VerifyAccountPage />
						</RedirectAuthenticatedUser>
					}
				/>

				{/* AdminRoutes */}

				<Route
					path="/admin/users"
					element={
						<ProtectedRoutes>
							<RedirectRegularUser>
								<AdminUsersPage />
							</RedirectRegularUser>
						</ProtectedRoutes>
					}
				/>

				<Route
					path="/admin/products"
					element={
						<ProtectedRoutes>
							<RedirectRegularUser>
								<AdminProductsPage />
							</RedirectRegularUser>
						</ProtectedRoutes>
					}
				/>
			</Routes>
			<Toaster position="center-top" />
		</div>
	);
};

export default App;
