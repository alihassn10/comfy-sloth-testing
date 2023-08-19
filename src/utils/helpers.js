export const formatPrice = (num) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num / 100);
};

export const getUniqueValues = (data, type) => {
  const uniqueValues = data.map((item) => item[type]);
  if (type === "colors") return ["all", ...new Set(uniqueValues.flat())];
  return ["all", ...new Set(uniqueValues)];
};
