import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ProductI} from "../types/type.ts";
import {instance} from "../api/axios.api.ts";
import Comment from "../components/Comment.tsx";
import {MdEdit} from "react-icons/md";
import ProductForm from "../components/ProductForm.tsx";
import {useDispatch} from "react-redux";
import {open} from "../storage/slices/formSlice.ts"

const ProductPage = () => {
    const { id } = useParams<{id: string}>()
    const [product, setProduct] = useState<ProductI>()
    const [comments, setComments] = useState<any[]>([])
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try{
                const response = await instance.get<ProductI>(`/products/${id}`)
                if(response.data){
                    setProduct(response.data)
                }
                const commentsResponse = await instance.get(`/comments/${id}`)
                if(commentsResponse.data){
                    setComments(commentsResponse.data)
                }
            } catch (error){

            }
        })()
    }, [id])

    if(!product){
        return <div>Loading...</div>
    }

    return (
        <>
        <div className="container mx-auto p-4">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="relative  bg-white border rounded-lg shadow-md overflow-hidden">
                    <div
                        className="absolute cursor-pointer z-50 top-2 right-2 flex items-center justify-center w-8 h-8 text-center text-white bg-red-600 bg-opacity-30 hover:bg-opacity-45 rounded-full text-xl font-bold">
                        <span className="leading-none">×</span>
                    </div>
                    <div
                        onClick={() => dispatch(open())}
                        className="absolute cursor-pointer z-50 top-2 right-12 flex items-center justify-center w-8 h-8 text-center text-white bg-green-600 bg-opacity-30 hover:bg-opacity-45 rounded-full text-xl font-bold">
                        <span className="leading-none"><MdEdit size={15}/></span>
                    </div>
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                        <img
                            alt={product.name}
                            src={product.imageUrl}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="p-4">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {product.name}
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Size: {product.size.width} x {product.size.height}
                        </p>
                        <p className="mt-1 text-lg text-gray-600">
                            {product.count} in stock
                        </p>
                        <p className="mt-1 text-lg font-medium text-gray-800">
                            Weight: {product.weight}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <Comment
                                key={comment.id + index}
                                description={comment.description}
                                createdAt={comment.createdAt}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">No comments yet.</p>
                    )}
                </div>
            </div>
        </div>

            {/*@ts-ignore*/}
            <ProductForm type={"update"} initialData={{...product, id}}/>
        </>
    );
};

//@ts-ignore
export default ProductPage;