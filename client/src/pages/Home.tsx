import {instance} from "../api/axios.api.ts";
import {useLoaderData} from "react-router-dom";
import Product from "../components/Product.tsx";
import AddProduct from "../components/AddProduct.tsx";
import ProductForm from "../components/ProductForm.tsx";


export const homeLoader = async () => {
   return await instance.get('/products')
}

const Home = () => {
    // @ts-ignore
    const { data } = useLoaderData()

    return (
        <>
            <div
                className="w-full mt-6 grid justify-items-stretch grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
                {
                    //@ts-ignore
                    data.map((product, index) => (
                        <Product
                            key={index + product.id}
                            imageUrl={product.imageUrl}
                            id={product.id}
                            name={product.name}
                            weight={product.weight}
                            count={product.count}
                            size={product.size}
                        />
                    ))
                }
                <AddProduct/>
            </div>
            <ProductForm type={"create"}/>
        </>
    );
};

export default Home;