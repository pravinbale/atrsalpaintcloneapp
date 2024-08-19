"use client";
import About from "./components/About";
import Banner from "./components/Banner";
import BecomeDealer from "./components/BecomeDealer";
import Blogs from "./components/Blogs";
import Category from "./components/Category";
import Colours from "./components/Colours";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Services from "./components/Services";

const Home = () => {
  return (
    <div className="container bg-white">
      <Header />
      <Banner/>
      <About />
      <Category />
      <Services />
      <Colours />
      <BecomeDealer />
      <Blogs />
      <Footer />
    </div>
  );
};

export default Home;
