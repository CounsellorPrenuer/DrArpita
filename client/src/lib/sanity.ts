
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
    projectId: "x9kurr32",
    dataset: "production",
    apiVersion: "2024-02-19",
    useCdn: true, // set to `false` to bypass the edge cache
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}
