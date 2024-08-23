import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { close } from '../storage/slices/formSlice';
import { RootState } from "../storage/store.ts";
import {FC, FormEvent, useEffect, useState} from "react";
import { instance } from "../api/axios.api.ts";

interface ProductFormProps {
    type: 'create' | 'update'
    initialData?: {
        id: string
        name: string
        imageUrl: string
        count: number
        size: {
            width: number
            height: number
        }
        weight: string
    }
}

const ProductForm:FC<ProductFormProps> = ({type, initialData}) => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.form.isOpened);

    const [productName, setProductName] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [count, setCount] = useState<number>();
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();
    const [weight, setWeight] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (type === 'update' && initialData) {
            setProductName(initialData.name);
            setImageUrl(initialData.imageUrl);
            setCount(initialData.count);
            setWidth(initialData.size.width);
            setHeight(initialData.size.height);
            setWeight(initialData.weight);
        }
    }, [type, initialData]);

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();
        if (!productName || !imageUrl || !count || !width || !height || !weight) {
            setError("Please fill out all fields");
            return;
        }
        setError(null);
        setLoading(true);

        const productData = {
            name: productName,
            imageUrl,
            count,
            size: {
                height,
                width
            },
            weight
        };

        try {
            const response = await instance.post(`/products/${initialData?.id}`, productData);
            if(response.status === 201){
                alert("Product added successfully");
                window.location.reload()
                dispatch(close());
                // setProductName("")
                // setImageUrl("")
                // setCount(0)
                // setHeight(0)
                // setWidth(0)
                // setWeight("")

            }

        } catch (error) {
            console.error(error);
            setError("Error adding product. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault()
        const productData = {
            name: productName,
            imageUrl,
            count,
            size: {
                height,
                width
            },
            weight
        };

        try {
            const response = await instance.patch("/products", productData);
            if(response.status === 201){
                alert("Product added successfully");
                window.location.reload()
                dispatch(close());
                // setProductName("")
                // setImageUrl("")
                // setCount(0)
                // setHeight(0)
                // setWidth(0)
                // setWeight("")

            }

        } catch (error) {
            console.error(error);
            setError("Error adding product. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <button
                    aria-label="Close form"
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={() => dispatch(close())}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Product</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form
                    className="space-y-4"
                    onSubmit={type === 'create' ? handleCreate : handleUpdate}
                >
                    <div>
                        <label className="block text-gray-700">Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Image URL</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter image URL"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Count</label>
                        <input
                            type="number"
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                            className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter count"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Size (Width x Height)</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(Number(e.target.value))}
                                className="block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Width"
                            />
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                className="block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Height"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700">Weight</label>
                        <input
                            type="text"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter weight"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                            onClick={() => dispatch(close())}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ProductForm;
