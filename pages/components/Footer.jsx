import React from "react";
import { GrLocation } from "react-icons/gr";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { CiYoutube } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <div
        id="contact-section"
        className="bg-blue-700 text-white px-16"
        style={{
          backgroundImage: `url('/assets/footer-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div id="contact-section" className="text-white px-16">
          <div className="mt-4 ">
            <div className="flex justify-center my-5">
              <span className="font-extrabold text-3xl  rounded-md mt-12 p-1">
                Group Company
              </span>
            </div>

            <div className="flex justify-around px-10 py-12">
              <div className="w-[150px] h-[80px] overflow-hidden">
                <figure className="relative w-full h-full">
                  <img
                    src="/assets/logo_img_1.webp"
                    alt="default"
                    className="object-cover w-full h-full"
                  />
                </figure>
              </div>
              <div className="w-[150px] h-[80px] overflow-hidden">
                <figure className="relative w-full h-full">
                  <img
                    src="/assets/logo_img_2.jfif"
                    alt="default"
                    className="object-cover w-full h-full"
                  />
                </figure>
              </div>
              <div className="w-[150px] h-[80px] overflow-hidden">
                <figure className="relative w-full h-full">
                  <img
                    src="/assets/logo_img_3.jfif"
                    alt="default"
                    className="object-cover w-full h-full"
                  />
                </figure>
              </div>

              <div className="w-[150px] h-[80px] overflow-hidden">
                <figure className="relative w-full h-full">
                  <img
                    src="/assets/logo_img_4.jpeg"
                    alt="default"
                    className="object-cover w-full h-full"
                  />
                </figure>
              </div>
              <div className="w-[150px] h-[80px] overflow-hidden">
                <figure className="relative w-full h-full">
                  <img
                    src="/assets/logo_img_5.png"
                    alt="default"
                    className="object-cover w-full h-full"
                  />
                </figure>
              </div>
            </div>

            <hr className="my-4 " />

            <div className="flex justify-between ">
              <div className="w-1/3">
                <div className="h-32 flex items-center">
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
                <div className="h-60">
                  <h3 className="font-bold text-orange-200">Reach Us</h3>
                  <ul className="mt-6 space-y-6">
                    <li>
                      <div className="flex items-center">
                        <GrLocation className="text-3xl" />
                        <p className="text-sm ms-4">
                          #417-418,11th Cross, 4th Phase, Peenya Industrial
                          Area, Banglore - 560 058
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex">
                        <IoCallOutline className="text-2xl" />
                        <p className="text-sm ms-4">+91-80-42552555</p>
                      </div>
                    </li>
                    <li>
                      <div className="flex">
                        <AiOutlineMail className="text-2xl" />
                        <p className="text-sm ms-4">info@gem-paints.com</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-2/3">
                <div className="h-32 flex justify-evenly items-center">
                  <div className="ps-0 ms-0">
                    <h4 className="font-bold text-orange-200">
                      Sign Up To Newsletter
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                  </div>
                  <div className="border rounded-full text-sm">
                    <input
                      type="email"
                      className="grow bg-transparent outline-none py-4 px-6"
                      placeholder="Enter Email Address"
                    />
                    <button className="bg-blue-600  border py-4 px-4 rounded-full">
                      Enquire Now
                    </button>
                  </div>
                </div>
                <div className="h-60 flex justify-evenly items-start">
                  <div>
                    <h3 className="font- text-orange-200">About</h3>
                    <ul className="mt-4 space-y-4">
                      <li>About Astral</li>
                      <li>Paint Journey</li>
                      <li>Group Companies</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-200">Category</h3>
                    <ul className=" mt-4 space-y-4">
                      <li>Interior Paints</li>
                      <li>Exterior Paints</li>
                      <li>Undercoats</li>
                      <li>Painting Tools</li>
                      <li>Water Proofing</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-200">Services</h3>
                    <ul className="mt-4 space-y-4">
                      <li>Wall Painting</li>
                      <li>Water Solutions</li>
                      <li>Painting</li>
                      <li>Colour Shades</li>
                    </ul>
                  </div>
                  <div className="text-orange-200">
                    <h3 className="font-bold ">Downloads</h3>
                    <ul className="mt-4 space-y-4">
                      <li>Become A Dealer</li>
                      <li>Blogs</li>
                      <li>Contacts</li>
                      <li>
                        <div className="flex items-center justify-between space-x-2">
                          <div className=" border  p-2 rounded-3xl">
                            <CiFacebook />
                          </div>
                          <div className=" border  p-2 rounded-3xl">
                            <IoLogoInstagram />
                          </div>
                          <div className=" border  p-2 rounded-3xl">
                            <CiYoutube />
                          </div>
                          <div className=" border  p-2 rounded-3xl">
                            <FaXTwitter />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-12 flex px-16 justify-between items-center text-sm  bg-blue-500">
        <p>Terms & conditios</p>
        <p>All Rights reserved</p>
        <p>privacy Policy</p>
      </div>
    </>
  );
}
