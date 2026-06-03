import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '4d1526e6b0114941b5b759cb667a82bfbefaafd2', queries,  });
export default client;
  