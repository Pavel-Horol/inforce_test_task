import {Link} from "react-router-dom";
import {instance} from "../api/axios.api.ts";

interface ProjectProps {
    id: number
    name: string
    imageUrl: string
    count: number
    size: {
        width: number
        height: number
    },
    weight: string
}

const Product = ({id ,name, imageUrl, count, size, weight}:ProjectProps) => {
    const handleDelete = async () => {
        try{
            const response = instance.delete(`products/${id}`)
            window.location.reload()
            console.log(response)
        }catch (error){
            console.error(error);
        }
    }

    return (
        <div
            className="relative bg-white border rounded-lg shadow-md overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
            <div
                onClick={handleDelete}
                className="absolute cursor-pointer z-50 top-2 right-2 flex items-center justify-center w-8 h-8 text-center text-white bg-red-600 bg-opacity-30 hover:bg-opacity-45 rounded-full text-xl font-bold">
                <span className="leading-none">×</span>
            </div>
            <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden">
                <img
                    alt={name}
                    src={imageUrl}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    <Link to={`/home/${id}`} className="hover:text-blue-600">
                        {`${name} ~~>`}
                    </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                    Size: {size.width} x {size.height}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    {count} in stock
                </p>
                <p className="mt-1 text-sm font-medium text-gray-800">
                    Weight: {weight}
                </p>
            </div>
        </div>
    );
};

export default Product;