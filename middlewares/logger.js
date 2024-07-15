const logger = (req, res, next) => {
  console.log(`Ruta consultada: ${req.url}`);
  next();
};

export default logger;
