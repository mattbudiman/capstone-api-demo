function authorizeUser(req, res, next) {
    if(req.session && req.session.userId) {
        return next();
    }
    return res.status(401).end(JSON.stringify({message: 'Unauthorized'}));
}

function authorizeAgent(req, res, next) {
    if(req.session && req.session.userId && (req.session.isAgent || req.session.isSupervisor)) {
        return next();
    }
    return res.status(401).end(JSON.stringify({message: 'Unauthorized'}));
}

function authorizeSupervisor(req, res, next) {
    if(req.session && req.session.userId && req.session.isSupervisor) {
        return next();
    }
    return res.status(401).end(JSON.stringify({message: 'Unauthorized'}));
}

module.exports = {
    user: authorizeUser,
    agent: authorizeAgent,
    supervisor: authorizeSupervisor
};
