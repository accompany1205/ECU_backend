import jwt from "jsonwebtoken";

const userMiddleware = (req, res, next) => {
    if (!req.user) return res.status(401).json({error: 'Unauthorized'});

    const token = req.headers.authorization;
    const decodedToken = jwt.decode(token.split(' ')[1]);

    // if (req.params.id === req.user.id  || req.body.userId === req.user.id || req.params.userId === req.user.id) return next();
    if(decodedToken.id === req.user.id) return next();

    return res.status(405).json({error: 'Method Not Allowed'});
}

export default userMiddleware