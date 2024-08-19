import React, { useEffect, useState } from "react";

const Colours = () => {
  const [colours, setColours] = useState([]);
  const [homeColoursTitle, setHomeColoursTitle] = useState("");
  const [homeColoursSubtitle, setHomeColoursSubtitle] = useState("");
  const [homeColoursButton, setHomeColoursButton] = useState({});

  useEffect(() => {
    const fetchColourData = async () => {
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
                        homeColoursTitle
                        homeColoursSubtitle
                        homeColoursButton {
                          title
                          url
                          target
                        }
                      }
                    }
                  }
                  allColourCategory(where: { slug: "popular" }) {
                    nodes {
                      name
                      colours {
                        nodes {
                          title
                          slug
                          colourInfo {
                            selectColor
                            colourRgb
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
        setHomeColoursTitle(
          result.data.pages.nodes[0].homepage.homeColoursTitle
        );
        setHomeColoursSubtitle(
          result.data.pages.nodes[0].homepage.homeColoursSubtitle
        );
        setHomeColoursButton(
          result.data.pages.nodes[0].homepage.homeColoursButton
        );
        setColours(result.data.allColourCategory.nodes[0].colours.nodes);
      } catch (error) {
        console.error("Error fetching color data:", error);
      }
    };

    fetchColourData();
  }, []);

  return (
    <div id="colours-section" className="py-8 px-16">
      <h2 className="font-semibold py-2 text-lg">{homeColoursSubtitle}</h2>
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold">{homeColoursTitle}</h1>
        {homeColoursButton && (
          <button className="text-center rounded-full px-4 py-2 border text-green-400 border-green-400 mb-6">
            <a
              href={homeColoursButton.url}
              target={homeColoursButton.target}
              className="btn btn-primary"
            >
              {homeColoursButton.title}
            </a>
          </button>
        )}
      </div>

      <div className="flex flex-wrap flex-row-reverse justify-evenly items-center">
        {colours.map((colour, index) => (
          <div key={index} className="text-center mb-6 p-4">
            <div
              className="flex justify-center items-center w-44 h-44 mx-auto mb-2"
              style={{
                backgroundColor: colour.colourInfo.selectColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: colour.colourInfo.selectColor,
                  width: "100px",
                  height: "100px",
                }}
              ></div>
            </div>
            <h3 className="text-lg font-semibold">{colour.title}</h3>
            <p className="text-gray-600">
              Color Code: {colour.colourInfo.selectColor}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colours;
