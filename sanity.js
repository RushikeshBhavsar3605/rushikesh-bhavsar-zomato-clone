import { createClient } from "@sanity/client";
//import { imageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import imageUrlBuilder from "@sanity/image-url";
const client = createClient({
  projectId: "1fjbh7i5",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2021-10-21", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

//1s8s88az

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
