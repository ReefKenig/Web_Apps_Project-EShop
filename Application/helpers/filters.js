const createFilter = (query) => {
  const filters = {};

  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      filters[key] = { $in: value };
    } else {
      filters[key] = value;
    }
  }

  return filters;
};

module.exports = createFilter;
