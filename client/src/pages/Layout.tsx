import {Link, Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white p-4">
                    <Link to="/home"> <h1 className="text-2xl">Home</h1> </Link>
            </header>

            <main className="flex-1 container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
                <Outlet/>
            </main>

            <footer className="bg-gray-800 text-white p-4">
                <p className="text-center">{"© 2024 Inforce <~>"}</p>
            </footer>
        </div>
    );
};

export default Layout;