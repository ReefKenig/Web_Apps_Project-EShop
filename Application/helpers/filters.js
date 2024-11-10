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
  
  const createCarFilters = (query) => {
    const filters = {};
  
    for (const [key, value] of Object.entries(query)) {
      if (key === "price" || key === "yearOfManufacture") {
        // Handle range-based filtering for price and yearOfManufacture
        const range = {};
  
        if (value.min) range.$gte = value.min;
        if (value.max) range.$lte = value.max;
  
        filters[key] = range;
      } else if (key === "brand") {
        // Handle exact match or array of brands
        if (Array.isArray(value)) {
          filters[key] = { $in: value }; // Allows filtering by multiple brands
        } else {
          filters[key] = value; // Allows filtering by a single brand
        }
      } else {
        // Add any other key-value pairs directly to the filter
        filters[key] = value;
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
  