exports.restrictAccessTo = (...roles) => {
  return (req, res, next) => {
    //roles is an array of strings e.g ['admin', 'normal-user']
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have a permission to perform this action',
      });
    }
    next();
  };
};
