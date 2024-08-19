"use client";
import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  "https://astralpaints.kwebmakerdigitalagency.com/graphql"
);

const GET_BLOGS = gql`
  query {
    blogs {
      nodes {
        featuredImage {
          node {
            sourceUrl
            slug
          }
        }
        slug
        title
        date
      }
    }
  }
`;
export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await client.request(GET_BLOGS);
        setBlogs(response.blogs.nodes);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="blogs-section" className=" mx-16 my-14">
      <div className="py-2 text-black">
        <h2 className="font-semibold text-lg py-2">Our Blog</h2>
        <h1 className="text-3xl font-extrabold">Latest</h1>
      </div>
      <div className="flex my-4 space-x-4 h-94 text-white">
        <div className="w-1/3">
          <div
            className="hero mb-4 h-44 object-cover bg-center "
            style={{
              backgroundImage: `url(${blogs[0].featuredImage.node.sourceUrl})`,
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content flex flex-col justify-end h-full p-4">
              <div className="text-wrap ms-4 pr-16">
                <p className="text-sm font-light">{blogs[0].date}</p>
                <p className="font-bold">{blogs[0].title}</p>
              </div>
            </div>
          </div>
          <div
            className="hero mb-4 h-44 object-cover bg-center "
            style={{
              backgroundImage: `url(${blogs[1].featuredImage.node.sourceUrl})`,
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content flex flex-col justify-end h-full p-4">
              <div className="text-wrap ms-4 pr-16">
                <p className="text-sm font-light">{blogs[1].date}</p>
                <p className="font-bold">{blogs[1].title}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hero w-1/3 object-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
          }}
        >
          <div className="hero-overlay bg-opacity-60 "></div>
          <div className="hero-content flex flex-col-reverse pb-6 justify-between h-full">
            <div className="max-w-md space-y-4">
              <div className="text-wrap ms-6 pr-16">
                <p className="text-sm font-light">{blogs[1].date}</p>
                <p className="font-bold">{blogs[1].title}</p>
              </div>
              <button className="btn bg-white rounded-full text-green-400 text-sm font-bold py-2 ms-6 px-6 self-start">
                Read More
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/3">
          <div
            className="hero mb-4 h-44 object-cover bg-center "
            style={{
              backgroundImage: `url(${blogs[2].featuredImage.node.sourceUrl})`,
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content flex flex-col justify-end h-full p-4">
              <div className="text-wrap ms-4 pr-16">
                <p className="text-sm font-light">{blogs[2].date}</p>
                <p className="font-bold">{blogs[2].title}</p>
              </div>
            </div>
          </div>
          <div
            className="hero mb-4 h-44 object-cover bg-center "
            style={{
              backgroundImage: `url(${blogs[3].featuredImage.node.sourceUrl})`,
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content flex flex-col justify-end h-full p-4">
              <div className="text-wrap ms-4 pr-16">
                <p className="text-sm font-light">{blogs[3].date}</p>
                <p className="font-bold">{blogs[3].title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
