const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// const asyncHandler = () => { }
// const asyncHandler = (func) => { }
// const asyncHandler = (function) => async() =>{}

// try catch approch for async wrapper

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
