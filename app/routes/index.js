module.exports = function(app) {
    app.get('/#/auth', function(req, res) {
    res.render('index', { "usuarioLogado" : req.user.login});
    });
};