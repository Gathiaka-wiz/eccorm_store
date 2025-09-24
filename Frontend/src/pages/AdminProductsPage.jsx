import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
	EditIcon,
	HomeIcon,
	Trash2,
	ImageIcon,
	Loader,
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, useAnimationControls } from 'framer-motion';
import { useAdminStore } from '../store/adminStore';
import { userStore } from '../store/userStore';

const AdminProductsPage = () => {
	const isVisible = useRef(false);
	const controls = useAnimationControls();
	const mainControls = useAnimationControls();

	const inputRef = useRef(null);
	const isEdit = useRef(false);
	// Product valuables
	const [price, setPrice] = useState("");
	const [image, setImage] = useState(null);
	const [description, setDescription] = useState("");
	const [product_name, setProduct_name] = useState("");
	const [product_id, setProduct_id] = useState("");
	const [available_stock, setAvailable_stock] = useState("");

	const { createProduct, editProduct, deleteProduct, message, isFetching } =
		useAdminStore();
	const { getProducts, products } = userStore();

	const fetchProducts = async () => {
		try {
			await getProducts();
		} catch (error) {
			console.error(error);
		}
	}

	const toggleDisplay = () => {
		if (!isVisible.current) {
			controls.set('display');
			mainControls.set('blur');
			isVisible.current = true;
		} else {
			controls.set('initial');
			mainControls.set('initial');
			isVisible.current = false;
		}
	};

	const handleEditClick = (id) => {
		isVisible.current = false;

		setProduct_id(id);

		const idx = products.findIndex((prd) => prd._id === id);

		if (idx < 0) return toast.error('Product not found');

		const itm = products[idx];

		setPrice(itm.price);
		setImage(itm.image.url);
		setDescription(itm.description);
		setProduct_name(itm.product_name);
		setAvailable_stock(itm.available_stock);

		isEdit.current = true;
		toggleDisplay()
		console.log(id, "Clicked", "current", isVisible.current)
	};

	const resetValues = () => {
		setPrice("");
		setImage(null);
		setDescription("");
		setProduct_name("");
		setAvailable_stock("");
	}

	const handleImage = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith('image/')) {
			// setImage(URL.createObjectURL(file));
			setImage(file);
		} else {
			setImage(null);
		}
	};
	const handleUpload = () => {
		if (inputRef.current === null) return;
		inputRef.current.click();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (image === null) {
			toast.error('Please provide an image file');
			return;
		}
		if (isEdit.current) {
			try {
				await editProduct(
					product_id,
					product_name,
					price,
					available_stock,
					description,
					image
				);
				toast.success(message || "Product edit success");
				fetchProducts();
				resetValues();
				toggleDisplay();
			} catch (error) {
				console.error(error);
				toast.error(error.message || "Product edit error");
			}
		} else {
			try {
				await createProduct(
					product_name,
					price,
					available_stock,
					description,
					image
				);
				isEdit.current = false;
				toast.success(message || "Product create success");
				fetchProducts();
				resetValues();
				toggleDisplay();
			} catch (error) {
				console.log(error);
				toast.error(error.message || "Product create error");
			}
		}
	};

	const handleDelete = (product_id) => {
		try {
			deleteProduct(product_id);
			toast.success(message || 'Product delete success');
			fetchProducts();
		} catch (error) {
			console.log(error);
			toast.error(error || "Product delete error");
		}
	};

	useEffect(() => {
		try {
			getProducts();
			toast.success("Products fetch success");
			console.log(products)
		} catch (error) {
			console.log(error);
			toast.error("Products fetch error : please refresh")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		<div className="w-[100vw] min-h-[100vh]  h-max flex flex-col items-center bg-gradient-to-bl from-bg-[#ffffffff] from-0%  via-[#ff9d6c] via-40%  to-[##ff874b] to-100% relative text-[#333333]   ">
			<motion.nav
				initial={{ opacity: 0, y: -200 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="fixed flex justify-center  align-middle top-0 left-0 right-0   z-40  gap-x-8 "
			>
				<ul className="flex px-2 py-2.5 justify-evenly w-[80vw] sm:justify-evenly bg-[#2727273d] mt-2 rounded-sm border-0 border-[#808080] max-xs:w-[60vw] sm:w-[50vw] md:w-[50vw]">
					<Link
						to={'/'}
						className=" h-8 font-[Supreme-ExtraBold]  w-max sm:text-2xl sm:h-9 text-center md:size-10 md:text-4xl "
					>
						<HomeIcon className="md:size-8" />
					</Link>
					<h1 className="h-8 font-[Supreme-Bold]  w-max sm:text-xl sm:h-9 text-center md:text-2xl">
						ADMIN PRODUCTS PAGE
					</h1>
				</ul>
				<motion.button
					onClick={() => {
						toggleDisplay();
						resetValues()
					}}
					initial={{ background: '#ff5602' }}
					whileHover={{ scale: 1.05, background: '#ff5602b4' }}
					whileTap={{ scale: 1 }}
					transition={{ duration: 0.25, ease: 'easeInOut' }}
					className="bg-[#ff681c] size-14 mt-2 rounded font-bold text-white font-[Supreme-ExtraBold] cent "
				>
					New
				</motion.button>
			</motion.nav>

			<motion.main
				variants={{
					blur: {
						filter: 'blur(10px)',
						pointerEvents: 'none',
					},
					initial: {
						filter: 'blur(0)',
						pointerEvents: 'all',
					},
				}}
				initial="initial"
				transition={{ duration: 0.25, ease: 'easeInOut' }}
				animate={mainControls}
				className="grid justify-center flex-col gap-y-5  p-4 w-[85vw]  bg-[#00000026] mt-20 rounded"
			>
				{products !== null
					? products.map((product, index) => {
						return (<motion.div
							key={index}
							initial="initial"
							whileHover="hover"
							className="max-w-[70vw] w-[65vw] bg-[#ffffff6b] rounded flex  relative overflow-clip "
						>
							<img
								className="h-50 w-[25%] "
								src={product.image.url}
								alt={product.product_name}
							/>
							<section className="grid justify-center algn-middle w-[23%] py-5 text-[1.2rem] font-[Supreme-Medium] ">
								<p>{product.product_name}</p>
								<p>Ksh : {product.price}</p>
								<p>
									Stock{' '}
									{product.available_stock}
								</p>
							</section>
							<section className="w-[52%] h-60 overflow-scroll p-1.5  text-[1.1rem] ">
								<p>{product.description}</p>
							</section>
							<motion.aside
								onClick={() => {
									handleEditClick(product._id);
								}}
								variants={{
									initial: {
										opacity: 0,
										scale: 0,
										x: -50,
									},
									hover: {
										opacity: 1,
										scale: 1,
										x: 0,
									},
								}}
								whileTap={{ scale: 1.2 }}
								transition={{
									duration: 0.5,
									ease: 'easeInOut',
								}}
								className="absolute z-5 left-0 top-0 size-8 flex justify-center align-middle  p-1 bg-[#ff681c] cursor-pointer rounded text-white/80 "
							>
								<EditIcon
									onClick={() => {
										handleEditClick(
											product._id
										);
									}}
								/>
							</motion.aside>

							<motion.aside
								onClick={() => {
									handleDelete(product._id);
								}}
								variants={{
									initial: {
										opacity: 0,
										scale: 0,
										x: 50,
									},
									hover: {
										opacity: 1,
										scale: 1,
										x: 0,
									},
								}}
								whileTap={{ scale: 1.2 }}
								transition={{
									duration: 0.5,
									ease: 'easeInOut',
								}}
								className="absolute z-5 right-0 top-0 size-8 flex justify-center align-middle  p-1 bg-red-500 cursor-pointer rounded text-white/80 "
							>
								<Trash2
									onClick={() => {
										handleDelete(
											product._id
										);
									}}
								/>
							</motion.aside>
						</motion.div>)
					})
					: ''}

			</motion.main>

			<motion.form
				onSubmit={handleSubmit}
				className="absolute z-100 flex w-[950px] mt-3 flex-col  bg-[#20202067]  gap-y-2  p-4 overflow-hidden backdrop-blur-sm rounded-xl "
				variants={{
					initial: {
						opacity: 0,
						filter: 'blur(20px)',
						scale: 0,
						pointerEvents: 'none',
					},
					display: {
						opacity: 1,
						filter: 'blur(0px)',
						scale: 1,
						pointerEvents: 'all',
					},
				}}
				initial="initial"
				animate={controls}
				exit={{ opacity: 0, scale: 0 }}
				transition={{ duration: 2, ease: 'easeInOut' }}
			>
				<section className="w-[945px]  grid gd-col gap-x-3  text-[#333333] ">
					<aside
						// onClick={handleUpload}
						className="flex justify-center w-[340px] h-[240px] bg-[#00000033] cent rounded overflow-hidden "
					>
						{!image ? (
							<ImageIcon
								onClick={handleUpload}
								size={250}
								color="#F8F8F8"
								className="m-auto "
							/>
						) : (
							<img
								src={typeof image === 'string' ? image : URL.createObjectURL(image)}
								onClick={handleUpload}
								className="w-[100%] h-[100%] "
							/>
						)}
						<input
							type="file"
							accept="image/*"
							className="hidden"
							ref={inputRef}
							multiple={false}
							onChange={handleImage}
						/>
					</aside>
					<aside className="flex flex-col w-[98%] justify-around ">
						<input
							type="text"
							placeholder="Product Name"
							value={product_name}
							onChange={(e) => {
								setProduct_name(e.target.value);
							}}
							className=" mx-auto bg-[#ffffffc8] w-100  h-15 placeholder:text-center focus:outline-0 focus:border-2 focus:border-stone-500 text-[1.1rem] p-2 rounded-sm "
						/>
						<aside className=" flex flex-row justify-around align-middle w-[100%]">
							<input
								type="number"
								placeholder="price"
								value={price}
								onChange={(e) => {
									setPrice(e.target.value);
								}}
								className="bg-[#ffffffc8] placeholder:text-center w-65 h-14 text-center focus:outline-0 focus:border-2 focus:border-stone-500 text-[1.1rem] rounded "
								min={1}
								required
							/>
							<input
								type="number"
								placeholder="stock"
								value={available_stock}
								onChange={(e) => {
									setAvailable_stock(e.target.value);
								}}
								className="bg-[#ffffffc8] placeholder:text-center w-65 h-14 text-center focus:outline-0 focus:border-2 focus:border-stone-500 text-[1.1rem] rounded "
								min={1}
								required
							/>
						</aside>
					</aside>
				</section>
				<section className="h-50 w-[99%] ">
					<textarea
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						className=" p-2 text-gray-600 placeholder:text-center placeholder:text-[1.1rem] w-[100%] h-[100%] bg-[#ffffffc8] focus:outline-0 focus:border-2 focus:border-stone-500 text-[0.9rem] rounded "
						name="product-description"
						placeholder="Product Description"
						required
					></textarea>
				</section>
				<section className="flex justify-around text-[1.1rem]">
					<button
						onClick={toggleDisplay}
						type="reset"
						className="bg-[#000000d9] w-28 text-white px-2.5 py-1 cent  rounded "
						disabled={isFetching}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="bg-[#ff5602] w-28 text-white px-2.5 py-1 cent rounded  "
						disabled={isFetching}
					>
						{isFetching ? <Loader className=' mx-auto animate-spin cursor-none ' /> : 'save'}
					</button>
				</section>
			</motion.form>
		</div>
	);
};

export default AdminProductsPage;
