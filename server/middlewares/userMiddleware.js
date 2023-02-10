const userMiddleware = (req, res, next) => {
    if (!req.user) return res.status(401).json({error: 'Unauthorized'});

    if (req.params.id === req.user.id  || req.body.userId === req.user.id || req.params.userId === req.user.id) return next();

    return res.status(405).json({error: 'Method Not Allowed'});
}

export default userMiddleware