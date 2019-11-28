const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://tpkprinting.now.sh"
    : "http://localhost:3000";

export default baseUrl;
