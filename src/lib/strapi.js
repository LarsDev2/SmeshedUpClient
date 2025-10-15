import qs from "qs";

const fetchApi = async (
  {
    endpoint,
    query = undefined,
    wrappedByKey = "data",
    wrappedByList = undefined,
  },
  options
) => {
  // Remove leading slash if any
  endpoint = endpoint.replace(/^\/+/, "");

  // Build the URL safely
  const url = new URL(
    `${import.meta.env.VITE_STRAPI_URL.replace(/\/$/, "")}/api/${endpoint}${query ? `?${qs.stringify(query, { encode: false })}` : ""}`
  );

  // Fetch the data
  const res = await fetch(url.toString(), options);

  if (!res.ok) {
    console.error("Failed to fetch:", url.toString(), res.status);
    return null;
  }

  let data = await res.json();

  if (wrappedByKey && data[wrappedByKey]) {
    data = data[wrappedByKey];
  }

  if (wrappedByList && Array.isArray(data) && data.length > 0) {
    data = data[0];
  }

  console.log(data); // keeps your debug logging
  return data;
};

// Keep your helper
const unwrapAtributes = (item) => {
  return { ...item, ...item.attributes };
};

// ✅ Export both named and default
export { unwrapAtributes };
export default fetchApi;
