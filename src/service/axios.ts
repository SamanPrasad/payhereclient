import axios from "axios";

export const client = axios.create({
  baseURL: "https://testnext-five-sigma.vercel.app/api",
});
