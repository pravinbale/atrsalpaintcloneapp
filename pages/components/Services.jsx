"use client";
import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  "https://astralpaints.kwebmakerdigitalagency.com/graphql"
);

const GET_HOME_SERVICES = gql`
  query {
    pages(where: { name: "Homepage" }) {
      nodes {
        homepage {
          homeServicesTitle
          homeServicesSubtitle
        }
      }
    }
  }
`;

export default function Services() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.request(GET_HOME_SERVICES);
        setData(result.pages.nodes[0].homepage);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { homeServicesTitle, homeServicesSubtitle } = data;

  return (
    <>
      <div id="services-section" className="px-16 my-4 bg-white">
        <div className="py-2">
          <h2 className="font-semibold py-2">{homeServicesSubtitle}</h2>
          <h1 className="text-3xl font-extrabold">{homeServicesTitle}</h1>
        </div>
        <div className="flex justify-between items-center ">
          <div className="card card-compact w-[30%] bg-red-300  my-4 mx-2 ">
            <figure>
              <img src="/assets/services-img-1.avif" alt="default" />
            </figure>
            <div className="card-body space-y-2  px-8 py-4 ">
              <h2 className="card-title font-bold text-xl">Wall Painting</h2>
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <div className="card-actions justify-end">
                <button className="btn bg-white rounded-full text-sm font-bold py-2 px-4">
                  Read More
                </button>
              </div>
            </div>
          </div>

          <div className="card card-compact  w-[30%] bg-red-300  my-4 mx-2 ">
            <figure>
              <img src="/assets/services-img-2.jpg" alt="default" />
            </figure>
            <div className="card-body space-y-2  px-8 py-4 ">
              <h2 className="card-title font-bold text-xl">Water Solution</h2>
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <div className="card-actions justify-end">
                <button className="btn bg-white rounded-full text-sm font-bold py-2 px-4">
                  Read More
                </button>
              </div>
            </div>
          </div>

          <div className="card card-compact  w-[30%] bg-red-300  my-4 mx-2 ">
            <figure>
              <img src="/assets/services-img-3.avif" alt="default" />
            </figure>
            <div className="card-body space-y-2  px-8 py-4 ">
              <h2 className="card-title font-bold text-xl">Painting</h2>
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <div className="card-actions justify-end">
                <button className="btn bg-white rounded-full text-sm font-bold py-2 px-4">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
