import axios from "axios";
const baseURL = "https://document-analyzer-python-production.up.railway.app";

const clientBaseURL = axios.create({
  baseURL,
});

const clientEndPoints = {
  uploadDoc: "/document/upload",
  queryDoc: "/document/query",
};
export { clientBaseURL, clientEndPoints };
