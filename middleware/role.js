module.exports = (roles = []) => {
    if(typeof roles === "string") roles = [roles];
    return (req, res, next) => {
        if(!req.user) return res.status(403).render("403");
        if(roles.length && !roles.includes(req.user.role)) return res.status(403).render("403");
        next();
    };
};