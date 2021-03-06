## Description
ScrollMaster is an infinite-scrolling image website that uses the Unsplash API. You can enter search terms into the search bar at the top of the page, and the next API fetch will add images matching your query to the bottom of the image feed.

## Getting Started
1. You will need an API key for Unsplash API.
2. Set the API_KEY environment variable to your unsplash API:
  * Option A: go to next.config.js, uncomment line 4, and enter your API key as the value for the environment variable named `API_KEY`
  * Option B: in your shell, set `API_KEY=your_value_here`
3. Run `npm install`
4. Run `npm run build`
5. Run `npm run start`
6. Open [http://localhost:3000](http://localhost:3000) with your browser.

## About
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
