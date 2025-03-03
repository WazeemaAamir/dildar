"use client"
import { UserIcon, UserPlusIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { 
  FaShoppingCart, FaUser, FaFacebook, FaTwitter, FaInstagram, FaYoutube,
  FaCcVisa, FaCcMastercard, FaPaypal, FaMoneyBillWave, FaMobile, FaGooglePlay, FaPlay
} from "react-icons/fa";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from '@radix-ui/react-dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { QRCodeCanvas } from "qrcode.react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css"; 
import "swiper/css/pagination";
import "swiper/css/navigation";
// -------------------------------------------------
// Authentication Modals Component (helper component)
// -------------------------------------------------
function AuthModals() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  
    
  return (
    <div>
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsLoginOpen(true)}>Login</Button>
        </DialogTrigger>
        <DialogContent className="bg-white p-6 rounded-lg shadow-md">
          <DialogTitle>Login</DialogTitle>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <div className="mt-4 flex justify-end space-x-2">
            <DialogClose asChild>
              <Button onClick={() => setIsLoginOpen(false)}>Close</Button>
            </DialogClose>
            <Button>Login</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsSignupOpen(true)}>Signup</Button>
        </DialogTrigger>
        <DialogContent className="bg-white p-6 rounded-lg shadow-md">
          <DialogTitle>Signup</DialogTitle>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Input 
            type="text" 
            placeholder="WhatsApp Number" 
            value={whatsappNumber} 
            onChange={(e) => setWhatsappNumber(e.target.value)} 
          />
          <div className="mt-4 flex justify-end space-x-2">
            <DialogClose asChild>
              <Button onClick={() => setIsSignupOpen(false)}>Close</Button>
            </DialogClose>
            <Button>Signup</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// -------------------------------------------------
// Categories Data    
// -------------------------------------------------
const categories = [
  { id: 1, name: "Men's Clothing", image: "/images/mens-clothing.jpg" },
  { id: 2, name: "Women's Clothing", image: "/images/womens-clothing.jpg" },
  { id: 3, name: "Bed Sheets", image: "/images/bridal-suits.jpg" },
  { id: 4, name: "Footwear", image: "/images/footwear.jpg" },
  { id: 5, name: "Accessories", image: "/images/accessories.jpg" },
  { id: 6, name: "Electronics", image: "/images/electronics.jpg" },
];

// -------------------------------------------------
// Products Data
// -------------------------------------------------
const products = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: ["Men's Clothing", "Women's Clothing", "Bed Sheet", "Footwear"][i % 4] + ` Product ${i + 1}`,
  price: `Rs.${1500 + (i % 5) * 500}`,
  image: [
    "/images/mens-clothing.jpg",
    "/images/womens-clothing.jpg",
    "/images/bed-sheets.jpg",
    "/images/footwear.jpg",
  ][i % 4],
}));

// -------------------------------------------------
// TopBar Component
// -------------------------------------------------
const TopBar: React.FC = () => {
  return (
    <div className="bg-orange-600 text-white text-sm py-2 px-8 flex justify-between items-center">
      <div className="flex space-x-6">
      <nav className="flex justify-between items-center px-8 py-4">
      <ul className="flex gap-6 text-white text-lg font-medium">
      <Link href="/download-app" className="px-4 py-2 hover:underline text-white rounded">
          SAVE MORE ON APP
        </Link> 
        <Link href="/help-support" className="px-4 py-2 hover:underline text-white rounded">
          Help & Support
        </Link>
        <Link href="/loginModel" className="px-4 py-2 hover:underline text-white rounded">
          LOGIN
        </Link>
        <Link href="/SignUpModel" className="px-4 py-2 hover:underline text-white rounded">
        SIGN UP
        </Link>
     </ul>
    </nav>
   </div>
    </div>
  );
};

// -------------------------------------------------
// Main HomePage Component
// -------------------------------------------------
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(30);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showLoginForm, setShowLoginForm] = useState(false);

  // Handle Search
  useEffect(() => {
    if (searchQuery) {
      setFilteredProducts(
        products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery]);

  return (
    
    <div>
      {/* Top Bar */}
      <TopBar />  
      {/* Header and Search Section */}
      <div className="flex bg-gradient-to-r from-red-600 to-orange-500 py-3 px-6 shadow-md justify-between items-center bg-red-600 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl text-white text-2xl font-bold font-bold">
          Dildar.pk
          </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg border w-full md:w-[400px] h-12 px-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
          />
        </div>
        <div className="flex items-center gap-4">
          <FaUser className="cursor-pointer text-xl" onClick={() => setShowLoginForm(true)} />
          <FaShoppingCart className="cursor-pointer text-xl" onClick={() => (window.location.href = "/cart")}
           />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
      <section className=" text-center bg-white p-6">
      <h1 className="text-4xl  font-bold text-red-600">Big Sale on Women's Clothing</h1>
      <p className="text-xl text-gray-700 mt-2">Up to 50% off on selected items</p>
      <Swiper   />
    </section>

      <h1 className="flex items-center justify-center font-bold rounded-xl ">Women's Clothing</h1>
     <div className="grid grid-cols-3 gap-4">
    {[
      "/whatsApp-women1.jpg", 
      "/whatsapp-women2.jpg",
      "/whatsapp-women3.jpg",
      "/whatsApp-women4.jpg",
      "/whatsapp-women5.jpg",
      "/whatsapp-women6.jpg",
      "/whatsapp-women7.jpg",
      "/whatsApp-women8.jpg",
      "/whatsapp-women9.jpg",
      "/whatsapp-women10.jpg",
      "/whatsapp-women31.jpg",
      "/whatsApp-women11.jpg",
      "/whatsapp-women12.jpg",
      "/whatsapp-women13.jpg",
      "/whatsApp-women14.jpg",
      "/whatsapp-women15.jpg",
      "/whatsapp-women16.jpg",
      "/whatsApp-women17.jpg",
      "/whatsapp-women18.jpg",
      "/whatsapp-women19.jpg",
      "/whatsapp-women20.jpg",
      "/whatsapp-women21.jpg",
      "/whatsapp-women22.jpg",
      "/whatsApp-women23.jpg",
      "/whatsapp-women24.jpg",
      "/whatsapp-women25.jpg",
      "/whatsapp-women26.jpg",
      "/whatsapp-women27.jpg",
      "/whatsapp-women28.jpg",
      "/whatsapp-women29.jpg",
      "/whatsapp-women30.jpg",
      "/whatsApp-women32.jpg",
      "/whatsapp-women33.jpg",
      "/whatsapp-women34.jpg",
      "/whatsApp-women35.jpg",
      "/whatsapp-women36.jpg",
      "/whatsapp-women37.jpg",
      "/whatsApp-women38.jpg",
      "/whatsapp-women39.jpg",
      "/whatsapp-women40.jpg",
      "/whatsApp-women41.jpg",
      "/whatsapp-women42.jpg",
      "/whatsapp-women43.jpg",
      "/whatsapp-women44.jpg",
      "/whatsapp-women45.jpg",
      "/whatsApp-women46.jpg",
      "/whatsapp-women47.jpg",
      "/whatsapp-women48.jpg",  
      "/whatsApp-women49.jpg",
      "/whatsapp-women50.jpg",
      "/whatsapp-women51.jpg",
      "/whatsApp-women52.jpg",
      "/whatsapp-women53.jpg",
      "/whatsapp-women54.jpg",
      "/whatsapp-women55.jpg",
      "/whatsapp-women56.jpg",
      "/whatsApp-women57.jpg",
      "/whatsapp-women58.jpg",
      "/whatsapp-women59.jpg",
      "/whatsapp-women60.jpg",
      "/Whatsapp-women61.jpg",
      "/Whatsapp-women62.jpg",
      "/Whatsapp-women63.jpg",
      "/Whatsapp-women64.jpg",
      "/Whatsapp-women65.jpg",
      "/Whatsapp-women66.jpg",
      "/Whatsapp-women67.jpg",
      "/Whatsapp-women68.jpg",
      "/Whatsapp-women69.jpg",
      "/Whatsapp-women70.jpg",
      "/Whatsapp-women71.jpg",
      "/WhatsApp-women72.jpg",
      "/WhatsApp-women73.jpg",
      "/WhatsApp-women74.jpg",
      "/WhatsApp-women75.jpg"
    ].map((src, index) => (
      <div key={index} className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white p-4">
        <Image 
          src={src} 
          alt="Women's Fashion" 
          width={300} 
          height={300} 
          className="w-full h-auto rounded-lg"
          unoptimized 
        />
        <div className="px-4 py-2">
          <h2 className="font-bold text-lg">Women's Clothing</h2>
          {(index === 0 || index === 1 || index === 2) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $10.77
                    </p>
                    
                    )}
           {(index === 3 || index === 4 || index === 5 || index === 6 ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $10.01
                    </p>
                    )}  
           {(index === 7 || index === 8 || index === 9 || index === 10  ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $11.80
                    </p>
                    )}  
            {(index === 11 || index === 12 || index === 13  ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $11.80
                    </p>
                    )}  
            {(index === 14 || index === 15 || index === 16  ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $11.80
                    </p>
                    )}                                                   
          {(index === 17 || index === 18 || index === 19 || index === 20 || index === 21 || index ===  22) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $10.77
                    </p>  
          )}    
            {(index === 23 || index === 24 || index === 25 || index === 26 || index === 27 || index === 28 || index === 29 || index === 30 ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $11.80
                    </p>
                    )}                         
          {(index === 31 || index === 32 || index === 33) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $7.18
                    </p>
                    )}
          {(index === 34 || index === 35 || index === 36) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $7.86
                    </p>
                    )}
          {(index === 37 || index === 38 || index === 39) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $9.29
                    </p>
                    )}  
          {(index === 40 || index === 41 || index === 42 || index === 43|| index === 44  ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $12.51
                    </p>
                    )} 
         {(index === 45 || index === 46 || index === 47 ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $10.72
                    </p>
                    )}   
         {(index === 48 || index === 49 || index === 50 ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $7.15
                    </p>
                    )} 
          {(index === 51 || index === 52 || index === 53 || index === 54 || index === 55) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $10.05
                    </p>
                    )}      
          {(index === 56 || index === 57 || index === 58 ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $10.72
                    </p>
                    )}                                                                     
                    {(index === 59 || index === 60 || index === 61 || index === 62 || index === 63 ||index === 64 ||index === 65 || index === 66 ||index === 67 ||index === 68 || index === 69 || index === 70 || index === 71  ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $17.95
                    </p>
                    )}
                       {(index === 72 || index === 73 || index === 74) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $8.98
                    </p>
                    )}
        </div>
      </div>
    ))}
  </div>
</div>  

<div className="bg-white p-6 rounded-xl shadow-lg">
    <h1 className="flex items-center justify-center font-bold rounded-xl">Bridal Suit</h1>
    <div className="grid grid-cols-3 gap-4">
        {[
            "/Bridal Suit.jpg",
            "/Bridal-Suit (4).jpg",
            "/Bridal-Suit (5).jpg",
            "/Bridal-Suit (1).jpg",
            "/Bridal-Suit (2).jpg",
            "/Bridal-Suit (3).jpg",
        ].map((src, index) => (
            <div key={index} className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white p-4">
                <Image 
                    src={src} 
                    alt="Bridal Suit" 
                    width={300} 
                    height={300} 
                    className="w-full h-auto rounded-lg"
                    unoptimized 
                />
                <div className="px-4 py-2">
                    <h2 className="font-bold text-lg">Bridal Suits</h2>
                  
                    {(index === 0 || index === 4 || index === 5) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $71.68
                    </p>
                    )}
                    {(index === 1 || index === 2 || index === 3) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $53.76
                    </p>
                    )}
                </div>
            </div>
        ))}
    </div>
</div>

<div className="bg-white p-6 rounded-xl shadow-lg">
    <h1 className="flex items-center justify-center font-bold rounded-xl">Men's Clothing</h1>
    <div className="grid grid-cols-3 gap-4">
     {[
      "/Men's T-shirt.jpg",
      "/Men's Tshirt.jpg",
      "/Mens Tshirt.jpg",
      "/Men T-shirt.jpg",
      "/Men'stshirt.jpg",
      "/Tshirt.jpg",
      "/T-shirt.jpg",
      "/Men's T-shirt (2).jpg",
      "/T-shirt (3).jpg",
      "/Tshirt (2).jpg",
      "/T-shirt (2).jpg",
      "/T-shirt (4).jpg",
      "/T-shirt (5).jpg",
      "/T-shirt (6).jpg",
      "/T-shirt (7).jpg",
      "/T-shirt (8).jpg",
      "/T-shirt (9).jpg",
      "/T-shirt (10).jpg",
              
     ].map((src, index) => (
      <div key={index} className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white p-4">
        <Image 
          src={src} 
          alt="Men's T-shirt" 
          width={300} 
          height={300} 
          className="w-full h-auto rounded-lg"
          unoptimized 
        />
        <div className="px-4 py-2">
          <h2 className="font-bold text-lg">Men's T-shirt</h2>
           {(index === 0||index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 6 ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $53.76
                    </p>
                    )}
           {(index === 7 || index === 8 ) && (
            <p className="flex items-center text-xl text-red-500 font-bold">
              Price = $45
            </p>
          )}
           {(index === 9 || index === 10 || index === 11 ) && (
            <p className="flex items-center text-xl text-red-500 font-bold">
              Price = $46.7
            </p>
          )}
           {(index === 12 || index === 13 || index === 14 || index === 15 || index === 16 || index === 17 ) && (
            <p className="flex items-center text-xl text-red-500 font-bold">
              Price = $44
            </p>
          )}          
        </div>
      </div>
    ))}
  </div>
</div>

  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h1 className="flex items-center justify-center font-bold rounded-xl">Stationary</h1>
    <div className="grid grid-cols-3 gap-4">
     {[
        "/Black Gell Pen.jpg",
        "/Blue Gell Pen.jpg",
        "/Black Pointer.jpg",
        "/Bluue Pointer.jpg",
        "/Boll Pen.jpg",
        "/copy.jpg",
        "/Erasers.jpg",
        "/InkPen.jpg",
        "/Ink-Pen.jpg",
        "/Ink-Pen 2.jpg",
        "/Pencil-Box.jpg",
        "/Pencill Box.jpg",
        "/PencilColours.jpg",
        "/Pointers.jpg",
        "/Remmovers.jpg",
        "/Scales.jpg",
        "/Whito.jpg",
        "/Glue.jpg"
     ].map((src, index) => (
      <div key={index} className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white p-4">
        <Image 
          src={src} 
          alt="Stationary" 
          width={300} 
          height={300} 
          className="w-full h-auto rounded-lg"
          unoptimized 
        />
        <div className="px-4 py-2">
          <h2 className="font-bold text-lg">Stationary</h2>
          {(index === 0 || index === 1 ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $0.32
                    </p>
                    )} 
          {(index === 2 || index === 3 ) && (
                        <p className="flex items-center text-xl  text-red-500 font-bold">
                        Price = $0.13
                    </p>
                    )}   
           {(index === 4) && (
            <p className="flex items-center text-xl  text-red-500 font-bold">
              Price = 0.089
            </p>
           )}     
           {(index === 5) && (
            <p className="flex items-center text-xl  text-red-500 font-bold">
              Price = 0.089
            </p>
           )} 
        {(index === 6) && (
            <p className="flex items-center text-xl  text-red-500 font-bold">
              Price = 1.92
            </p>
           )}                         
        </div>
      </div>
    ))}
  </div>
</div>


<div>    
       {/* {Footer} */}
       <footer className="bg-gray-800 text-white py-10 mt-auto text-center border border-red-500">
      <div className="container mx-auto text-left">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h3 className="font-bold">Customer Care</h3>
            <ul>
              <li>Help Center</li>
              <li>How to Buy</li>
              <li>Corporate & Bulk Purchasing</li>
              <li>Returns & Refunds</li>
              <li>Dildar Shop</li>
              <li>Contact Us</li>
              <li>Purchase Protection</li>
              <li>Dildar Pick up Points</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Dildar.pk</h3>
            <ul>
              <li>About Us</li>
              <li>Digital Payments</li>
              <li>Dilsar Donates</li>
              <li>Dildar Blog</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>NTN Number : 4012118-6</li>
              <li>STRN Number : 1700401211818</li>
              <li>Online Shopping App</li>
              <li>Online Grocery Shopping</li>
              <li>Dildar Exclusive</li>
              <li>Dildar University</li>
              <li>Sell on Dildar</li>
              <li>Join Dildar Affiliate Program</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Download App</h3>
            <p>Happy Shopping</p>
            <div className="flex space-x-2 mt-2">
              <FaMobile />
              <p>Download App</p>
            </div>
            <div className="flex space-x-2 mt-2">
              <FaPlay /> <p>Apple App Download</p>
            </div>
            <div className="flex space-x-2 mt-2">
              <FaPlay /> <p>Android App Download</p>
            </div>
            <div className="flex space-x-2 mt-2">
              <FaPlay /> <p>Huawei App Download</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold">Payment Methods</h3>
          <div className="flex space-x-2 mt-2">
            <FaCcVisa /> <FaCcMastercard /> <FaPaypal /> <FaMoneyBillWave />
          </div>
          <div className="mt-4">
            <h3 className="font-bold">Verified by</h3>
            <p>Dildar.pk</p>
          </div>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <h3 className="font-bold">Follow Us:</h3>
          <FaFacebook /> <FaTwitter /> <FaInstagram /> <FaYoutube />
          <p>dildar.pkBlog</p>
        </div>
      </div>
      <p className="mt-4">&copy; 2025 Dildar.pk - All Rights Reserved</p>
    </footer>       
    </div>
    </div>
    
  );
};

export default HomePage;
// -------------------------------------------------
// Product Description Page Components (if needed)
// -------------------------------------------------
import { useRouter } from "next/router";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer"
    >
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
};

const Product: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="cursor-pointer"
    >
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
};

