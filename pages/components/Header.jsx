import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white py-6 px-16">
      <div className="flex items-center justify-between">
        <div className="font-bold text-2xl w-1/4">
          <div className="w-[150px] h-[80px] overflow-hidden">
            <figure className="relative w-full h-full">
              <img
                src="/assets/logo_img_1.webp"
                alt="default"
                className="object-cover w-full h-full"
              />
            </figure>
          </div>
        </div>
        <nav className="w-3/4">
          <ul className="flex justify-center items-center space-x-8">
            <li>
              <Link href="#about-section">About</Link>
            </li>
            <li>
              <Link href="#category-section">Category</Link>
            </li>
            <li>
              <Link href="#services-section">Services</Link>
            </li>
            <li>
              <Link href="#colours-section">Colours</Link>
            </li>
            <li>
              <Link href="#downloads-section">Downloads</Link>
            </li>
            <li>
              <Link href="#dealer-section">Become A Dealer</Link>
            </li>
            <li>
              <Link href="#blogs-section">Blogs</Link>
            </li>
            <li>
              <Link href="#contact-section">Contact</Link>
            </li>
            <li>
              <button className="bg-white text-blue-500 px-6 py-2 rounded-full">
                Enquire Now
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
