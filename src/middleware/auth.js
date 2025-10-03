const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    
    console.log(req.headers);
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token no middleware: '+token);

    if(!token){
        return res.status(401).json({message: 'Nenhum tocken, autorização negada!'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({message: 'Token inválido!'});
    }
};

