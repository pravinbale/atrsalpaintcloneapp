import React, { useState, useEffect } from "react";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch(
          "https://astralpaints.kwebmakerdigitalagency.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                {
                  pages(where: { name: "Homepage" }) {
                    nodes {
                      homepage {
                        banners {
                          bannerImage {
                            node {
                              sourceUrl
                            }
                          }
                          bannersTitle
                          bannerDescription
                          bannerButton {
                            title
                            url
                            target
                          }
                        }
                      }
                    }
                  }
                }
              `,
            }),
          }
        );
        const result = await response.json();
        setBanners(result.data.pages.nodes[0].homepage.banners);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBannerData();
  }, []);

  const slides = banners.map((banner) => ({
    id: banner.bannerImage.node.sourceUrl,
    title: banner.bannersTitle,
    descr: banner.bannerDescription,
    btnTitle: banner.bannerButton.title,
    btnUrl: banner.bannerButton.url,
  }));

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="relative bg-white h-screen">
      {/* Indicators */}
      <ol className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <li
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 bg-white rounded-full cursor-pointer ${
              currentIndex === index ? "opacity-100" : "opacity-50"
            }`}
          />
        ))}
      </ol>

      {/* Carousel Slides */}
      <div className="overflow-hidden w-full h-full">
        <div
          className="flex transition-transform duration-300 h-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full h-full flex-shrink-0 relative flex items-center"
              style={{
                backgroundImage: `url(${slide.id})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-transparent bg-opacity-50 p-6 text-white w-1/2">
                <h2 className="text-4xl text-wrap font-extrabold mb-4">
                  {slide.title}
                </h2>
                <p className="mb-6">{slide.descr}</p>
                {slide.btnTitle && (
                  <a
                    href={slide.btnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-800 text-sm font-bold bg-white py-2 px-4 rounded-full"
                  >
                    {slide.btnTitle}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2"
      >
        <span aria-hidden="true">&lt;</span>
        <span className="sr-only">Previous</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2"
      >
        <span aria-hidden="true">&gt;</span>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default Banner;
