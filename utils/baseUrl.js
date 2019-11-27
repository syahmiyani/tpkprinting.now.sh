const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://tpkprinting.now.sh"
    : "http://localhost:3000";

export default baseUrl;
