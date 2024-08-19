"use client";
import React, { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  "https://astralpaints.kwebmakerdigitalagency.com/graphql"
);

const GET_HOME_ABOUT = gql`
  query {
    pages(where: { name: "Homepage" }) {
      nodes {
        homepage {
          homeAboutTitle
          homeAboutSubtitle
          homeAboutDescription
          homeAboutButton {
            target
            title
            url
          }
          homeAboutVideoImage {
            node {
              sourceUrl
            }
          }
          homeAboutVideoUrl
        }
      }
    }
  }
`;

export default function About() {
  const [homeAbout, setHomeAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.request(GET_HOME_ABOUT);
        setHomeAbout(data.pages.nodes[0].homepage);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const onVideoEnd = () => {
      setShowVideo(false);
    };

    const loadYouTubeAPI = () => {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        new window.YT.Player("video-frame", {
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                onVideoEnd();
              }
            },
          },
        });
      };
    };

    if (showVideo) {
      loadYouTubeAPI();
    }
  }, [showVideo]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const videoUrl = homeAbout?.homeAboutVideoUrl
    ? `${homeAbout.homeAboutVideoUrl}?autoplay=1`
    : "https://www.youtube.com/embed/pgc5IUc6HNc?autoplay=1";

  const videoThumbnail =
    homeAbout?.homeAboutVideoImage.node.sourceUrl ||
    "https://via.placeholder.com/1280x720";

  return (
    <div
      id="about-section"
      className="flex flex-col px-16 md:flex-row w-full h-screen mt-5"
    >
      <div className="md:w-1/2 flex items-center justify-center bg-white p-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {homeAbout?.homeAboutSubtitle || "Default Title"}
          </h2>
          <h2 className="text-3xl font-extrabold mb-4">
            {homeAbout?.homeAboutTitle || "Default Subtitle"}
          </h2>
          <p className="mb-8">
            {homeAbout?.homeAboutDescription || "Default description text."}
          </p>
          {homeAbout?.homeAboutButton && (
            <a
              href={homeAbout.homeAboutButton.url}
              target={homeAbout.homeAboutButton.target}
              rel="noopener noreferrer"
              className="bg-white border text-sm  font-bold text-red-500 rounded-full py-2 px-4 border-red-500"
            >
              {homeAbout.homeAboutButton.title}
            </a>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 flex items-center justify-center bg-white p-4">
        <div className="relative w-full h-full">
          {!showVideo ? (
            <div className="relative">
              <img
                src={videoThumbnail}
                alt="Video Thumbnail"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                aria-label="Play Video"
              >
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168L9.752 7.168a1 1 0 00-1.586.832v6.16a1 1 0 001.586.832l5-4a1 1 0 000-1.664z"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <iframe
              id="video-frame"
              className="w-full h-full"
              src={videoUrl}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
