import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaYahoo } from "react-icons/fa";
export default function Footer() {
    return (
        <>
            <div className="bg-black text-white text-center py-3">
                <h2 className="text-lg font-semibold mb-6 cursor-default">
                    Contact us through social media
                </h2>
                <div className="flex justify-center gap-6 mb-8 cursor-default">
                    <a href="#Facebook" className="text-3xl hover:scale-110 transition-transform">
                        <FaFacebook className="text-blue-500" />
                    </a>
                    <a href="#Twitter" className="text-3xl hover:scale-110 transition-transform">
                        <FaTwitter className="text-sky-400" />
                    </a>
                    <a href="#Google" className="text-3xl hover:scale-110 transition-transform">
                        <FaGoogle className="text-red-500" />
                    </a>
                    <a href="#Instagram" className="text-3xl hover:scale-110 transition-transform">
                        <FaInstagram className="text-pink-500" />
                    </a>
                    <a href="#Yahoo" className="text-3xl hover:scale-110 transition-transform">
                        <FaYahoo className="text-purple-600" />
                    </a>
                </div>
                <div className="text-lg leading-8 cursor-default">
                    <p>
                        <span className="font-semibold">Email:</span>{" "}
                        OnlineLibrary.123@gmail.com
                    </p>
                    <p>
                        <span className="font-semibold">Mobile:</span> +919635282435
                    </p>
                </div>
            </div>
        </>
    );
}
