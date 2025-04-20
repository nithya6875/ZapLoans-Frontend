import Link from "next/link";

const NavBar = () => {
    return (
        <div className="flex absolute top-0 left-0 z-20">
            <h1 className="text-white font-bold text-2xl p-3 cursor-pointer">
                <Link href="/">ZapLoans</Link>
            </h1>
        </div>
    );
};

export default NavBar;
