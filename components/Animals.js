/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

function Animals() {
  const [favoriteAnimal, setFavoriteAnimal] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [adjectiveA, setAdjectiveA] = useState("");

  const adjectives = [
    "adorable",
    "majestic",
    "noisy",
    "friendly",
    "cute",
    "fierce",
    "hardy",
    "energetic",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    setAdjectiveA(adjective);

    async function getFirstImageUrl(html) {
      const imageUrls = html.match(/https?:\/\/.+?\.jpg/g) || [];
      return imageUrls[0];
    }

    async function scrapePage() {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=animal+${adjective}+${favoriteAnimal}&cx=${process.env.REACT_APP_SEARCH_ENGINE_ID}&key=${process.env.REACT_APP_API_KEY}`
      );
      const html = await response.text();
      const firstImageUrl = await getFirstImageUrl(html);
      console.log(firstImageUrl);
      setImageUrl(firstImageUrl);
    }

    scrapePage();
  };

  return (
    <div>
      <header class="bg-white dark:bg-gray-900 relative">
        <nav class="border-t-4 border-blue-500">
          <div class="container flex items-center justify-between px-6 py-3 mx-auto">
            <div>
              <a
                class="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                href="#"
              >
                For the Love of Animals
              </a>
            </div>

            <a
              class="my-1 text-sm font-medium text-gray-500 rtl:-scale-x-100 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 lg:mx-4 lg:my-0"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </nav>

        <div class="container px-6 py-16 mx-auto ">
          <div class="items-center lg:flex">
            <div class="w-full lg:w-1/2">
              <div class="lg:max-w-lg">
                <h1 class="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                  My Favourite <span class="text-blue-500">Animal Search</span>
                </h1>

                <p class="mt-4 text-gray-600 dark:text-gray-400">
                  What is your favourite Animal?{" "}
                  <span class="font-medium text-blue-500 uppercase">
                    {adjectiveA} {favoriteAnimal}
                  </span>{" "}
                </p>
                <form class=" " onSubmit={handleSubmit}>
                  <div class="flex flex-col mt-8 space-y-3 lg:space-y-0 lg:flex-row">
                    <input
                      id="search"
                      type="text"
                      class="capitalize px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                      placeholder="Lets Search...."
                      required
                      minLength="2"
                      maxLength="20"
                      value={favoriteAnimal}
                      onChange={(e) => setFavoriteAnimal(e.target.value)}
                    />

                    <button
                      type="submit"
                      class="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              {imageUrl && (
                <img
                  class="w-full h-full max-w-md"
                  src={imageUrl}
                  alt={favoriteAnimal}
                />
              )}
              {!imageUrl && (
                <img
                  class="w-full h-full max-w-md"
                  src="https://i.pinimg.com/564x/12/85/57/12855781333601a8938e4ad008f2816c.jpg"
                  //   src="https://source.unsplash.com/random/350x350"
                  alt="art"
                />
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Animals;
