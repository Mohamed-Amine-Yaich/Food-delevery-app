import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "3rff82l9",
  dataset: "production",
  useCdn: true, // true optimiz caches things on the edge network /`false` if you want to ensure fresh data
  apiVersion: "2021-10-21",
});

//provide us the builder that we can use to get url from the image that are added to sanity
const builder = imageUrlBuilder(client);

//creating the helper function that use the builder
export const urlFor = sourse => builder.image(sourse);

export default client

//must add exeption for cors policy (witch url can talk with )
//CORS origins : hosts that can connect to the project API