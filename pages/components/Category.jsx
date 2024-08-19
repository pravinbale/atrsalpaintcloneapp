import React, { useState, useEffect } from "react";
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  "https://astralpaints.kwebmakerdigitalagency.com/graphql"
);

const GET_CATEGORIES_DATA = gql`
  query {
    pages(where: { name: "Homepage" }) {
      nodes {
        homepage {
          homeCategoryTitle
          homeCategorySubtitle
          categories {
            link
            title
            image {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

const CategoryCard = ({ category }) => (
  <div
    className="w-full h-full flex items-end bg-cover text-white bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${category.image.node.sourceUrl})` }}
  >
    <p className="m-4 text-3xl">{category.title}</p>
  </div>
);

function Category() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.request(GET_CATEGORIES_DATA);
        setData(response.pages.nodes[0].homepage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div id="category-section" className="mx-16 bg-white">
      <div className="my-4">
        <h2 className="font-semibold py-2 text-lg">
          {data.homeCategorySubtitle}
        </h2>
        <h1 className="text-3xl font-extrabold">{data.homeCategoryTitle}</h1>
      </div>
      <div className="flex">
        {/* Left Column */}
        <div className="flex-1 flex flex-col bg-red-300 mr-6">
          <div className="flex-1 flex items-center justify-center">
            <img
              src={data.categories[0].image.node.sourceUrl}
              alt="Category Image"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="h-20 flex items-center justify-between px-6 bg-red-200">
            <h2 className="text-xl">{data.categories[0].title}</h2>
            <div className="flex-shrink-0">
              <button className="text-sm font-bold bg-white text-orange-500 rounded-full py-2 px-4">
                Read More
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {data.categories.slice(1).map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
