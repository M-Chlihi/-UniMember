const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("REQUEST:", req.method, req.originalUrl);

    console.log("JWT roles:", req.roles);
    console.log("Allowed roles:", allowedRoles);
    if (!req?.roles) {
      return res.sendStatus(401);
    }

    const hasRole = req.roles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      return res.sendStatus(403);
    }

    next();
  };
};

module.exports = verifyRoles;
