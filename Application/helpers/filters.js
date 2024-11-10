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

const createUserFilters = (query, isAdmin, userId) => {
  const filters = {};

  if (!isAdmin) {
    filters._id = userId;
  } else {
    for (const [key, value] of Object.entries(query)) {
      filters[key] = value;
    }
  }

  return filters;
};

const createCarFilters = (body) => {
  const filters = {};
  for (const [key, value] of Object.entries(body)) {
    if (
      key === "manufacturer" ||
      key === "brand" ||
      key === "color" ||
      key === "yearOfManufacture"
    ) {
      if (value !== "") {
        filters[key] = value;
      }
    } else if (key === "minPrice" || key === "maxPrice") {
      // Handle the price filter range
      if (!filters["price"] && value !== "") {
        filters["price"] = {}; // Initialize the price filter if not already present
      }

      if (key === "minPrice" && value !== "") {
        filters["price"].$gte = Number(value); // Ensure it's a number for min price
      }

      if (key === "maxPrice" && value !== "") {
        filters["price"].$lte = Number(value); // Ensure it's a number for max price
      }
    }
  }
  return filters;
};

const createOrderFilters = (query, user) => {
  const filters = {};

  // Allow admins to view all orders, restrict regular users to their own orders
  if (!user.isAdmin) {
    filters.userId = user.userId; // only show orders belonging to the user
  }

  for (const [key, value] of Object.entries(query)) {
    if (key === "totalCost") {
      const range = {};
      if (value.min) range.$gte = value.min;
      if (value.max) range.$lte = value.max;
      filters[key] = range;
    } else {
      filters[key] = value;
    }
  }

  return filters;
};

const createDepartmentFilters = (query) => {
  const filters = {};

  for (const [key, value] of Object.entries(query)) {
    if (key === "city") {
      filters["address.city"] = value; // Use dot notation for nested fields
    } else {
      filters[key] = value;
    }
  }

  return filters;
};

module.exports = {
  createUserFilters,
  createCarFilters,
  createDepartmentFilters,
  createOrderFilters,
};
