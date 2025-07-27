const Input = ({ ...props }) => {
    return (
        < input {...props} className=" bg-[#ffffffb0] text-[#727272] w-150 h-12 rounded font-[Supreme-Regular] text-xl text-center  placeholder:text-[#727272] placeholder:text-center focus:outline-none focus:ring-2 focus:ring-gray-700 md:placeholder:text-left md:\:text-left md:w-200 md:h-14 md:\:text-sm md:placeholder:text-2xl sm:w-100 sm:h-10 sm:text-lg  " />
    );
} 

export default Input;