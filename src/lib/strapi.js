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
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(
    `${import.meta.env.VITE_STRAPI_URL}/api/${endpoint}${query ? `?${qs.stringify(query, { encode: false })}` : ``
    }`
  );

  const res = await fetch(url.toString(), options);
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  console.log(data);
  return data;
};

const unwrapAtributes = (item) => {
  return { ...item, ...item.attributes };
};

// ✅ Export both named and default
export { unwrapAtributes };
export default fetchApi;
