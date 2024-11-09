const carFields = [
  "manufacturer",
  "brand",
  "color",
  "yearOfManufacture",
  "price",
];
const userFields = [
  "firstName",
  "lastName",
  "isAdmin",
  "orderHistory",
  "shoppingCart",
];
const departmentFields = ["city"];
const orderFields = ["userId", "items", "orderStatus", "totalCost"];

const collectionFields = {
  users: userFields,
  cars: carFields,
  orders: orderFields,
  departments: departmentFields,
};

const createFilter = (query, collectionName) => {
  const filters = {};
  const validFields = collectionFields[collectionName];

  for (const [key, value] of Object.entries(query)) {
    if (validFields.includes(key)) {
      if (Array.isArray(value)) {
        filters[key] = { $in: value };
      } else {
        filters[key] = value;
      }
    }
  }

  return filters;
};

module.exports = createFilter;
