import { motion } from "framer-motion";
import {useDispatch} from "react-redux";
import {open} from '../storage/slices/formSlice'

const AddProduct = () => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(open())
    }
    return (
        <motion.div
            className="relative bg-white border border-dashed rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.95}}
            onClick={handleClick}
        >
            <svg
                className="w-16 h-16 text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v14m7-7H5"
                />
            </svg>
        </motion.div>
    );
};

export default AddProduct;