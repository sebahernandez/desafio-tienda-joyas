const hateoas = (data, totalItems, limits, page, order_by) => {
  const results = data.map((item, index) => {
    return {
      name: item.nombre,
      href: `/joyas/joya/${item.id}`,
    };
  });

  const response = {
    totalJoyas: data.length,
    stockTotal: totalItems,
    results,
    links: {
      self: `/joyas?limits=${limits}&page=${page}&order_by=${order_by}`,
      next: `/joyas?limits=${limits}&page=${
        parseInt(page) + 1
      }&order_by=${order_by}`,
      prev:
        page > 1
          ? `/joyas?limits=${limits}&page=${
              parseInt(page) - 1
            }&order_by=${order_by}`
          : null,
    },
  };

  return response;
};

export default hateoas;
