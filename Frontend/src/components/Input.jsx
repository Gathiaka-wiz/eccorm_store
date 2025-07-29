const Input = ({ ...props }) => {
    return (
        < input {...props} className=" bg-[#ffffffb0] text-[#727272] w-11/12 h-10  rounded font-[Supreme-Regular] text-sm text-center  placeholder:text-[#727272]  focus:outline-0 focus:border-0 focus:ring-2 placeholder:text-center  md:text-xl  md:placeholder:text-lg md:w-120 md:h-11 " />
    );
} 

export default Input;