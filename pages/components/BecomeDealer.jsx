import React, { useState, useEffect } from "react";
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  "https://astralpaints.kwebmakerdigitalagency.com/graphql"
);

const GET_HOME_PAGE_DATA = gql`
  query {
    pages(where: { name: "Homepage" }) {
      nodes {
        homepage {
          homeJoinTitle
          homeJoinSubtitle
          homeJoinButton {
            title
            url
            target
          }
          homeJoinDescription
          homeJoinBackgroundImage {
            node {
              sourceUrl
            }
          }
        }
        seo {
          canonical
          metaKeywords
          metaDesc
          title
          opengraphType
          opengraphSiteName
          opengraphTitle
          opengraphDescription
          opengraphUrl
          schema {
            raw
          }
          opengraphImage {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

export default function BecomeDealer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.request(GET_HOME_PAGE_DATA);
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
    <div
      id="dealer-section"
      className="hero flex object-cover justify-center align-middle py-20 gap-y-6 text-white"
      style={{
        backgroundImage: `url(${data.homeJoinBackgroundImage.node.sourceUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <p className="text-lg">{data.homeJoinSubtitle}</p>
          <h1 className="font-extrabold py-2 text-3xl">{data.homeJoinTitle}</h1>
          <p className="mb-5">{data.homeJoinDescription}</p>
          <a
            href={data.homeJoinButton.url}
            target={data.homeJoinButton.target}
            className="btn bg-white rounded-full text-black text-sm font-bold py-2 px-6"
          >
            {data.homeJoinButton.title}
          </a>
        </div>
      </div>
    </div>
  );
}
