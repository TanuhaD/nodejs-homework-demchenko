const mongooseHandleError = (error, data, next) => {
  error.status = 400;
  next();
};
module.export = mongooseHandleError;
