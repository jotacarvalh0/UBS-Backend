const basicAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const [type, credentials] = authHeader.split(' ');
    if (type !== 'Basic') {
        return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Decodifica as credenciais (base64 -> "username:password")
    const [username, password] = Buffer.from(credentials, 'base64').toString().split(':');

    const staticUser = {
        username: "admin",
        password: "senha123"
    };

    if (username === staticUser.username && password === staticUser.password) {
        return next(); // Credenciais corretas, prosseguir
    } else {
        return res.status(401).json({ message: "Credenciais inválidas." });
    }
};

module.exports = { basicAuth };
