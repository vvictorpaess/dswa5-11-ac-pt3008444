module.exports = function (app) {
   var Contato = app.models.contato;
   var controller = app.controllers.contato;

   controller.listaContatos = function (req, res) {
      Contato.find()
         .exec()
         .then(
            function (contatos) {
               res.json(contatos);
            },
            function (erro) {
               console.error(erro);
               res.status(500).json(erro);
            }
         );
   };

   controller.obtemContato = function (req, res) {
      var _id = req.params.id;
      Contato.findById(_id)
         .exec()
         .then(
            function (contato) {
               if (!contato) throw new Error('Contato não encontrado');
               res.json(contato);
            },
            function (erro) {
               console.log(erro);
               res.status(404).json(erro);
            }
         );
   };

   controller.removeContato = function (req, res) {
      var _id = req.params.id;
      Contato.deleteOne({ _id: _id })
         .exec()
         .then(
            function () {
               res.end();
            },
            function (erro) {
               return console.error(erro);
            }
         );
   };

   controller.salvaContato = function (req, res) {
      var _id = req.body._id;
      if (_id) {
         Contato.findByIdAndUpdate(_id, req.body)
            .exec()
            .then(
               function (contato) {
                  res.json(contato);
               },
               function (erro) {
                  console.error(erro);
                  res.status(500).json(erro);
               }
            );
      } else {
         Contato.create(req.body).then(
            function (contato) {
               res.status(201).json(contato);
            },
            function (erro) {
               console.log(erro);
               res.status(500).json(erro);
            }
         );
      }
   };

   return controller;
};

/*var ID_CONTATO_INC = 3;

var contatos = [
    { _id: 1, nome: 'Fabio Teixeira', email: 'fabio.teixeira@ifsp.edu.br' },
    { _id: 2, nome: 'Fabiano Teixeira', email: 'fabiano.teixeira@ifsp.edu.br' },
    { _id: 3, nome: 'Melissa Teixeira', email: 'melissa.teixeira@ifsp.edu.br' }
]

module.exports = function() {
    var controller = {};
    controller.listaContatos = function(req, res) {
        res.json(contatos);
    };
    controller.obtemContato = function(req, res) {
        console.log('Selecionou o contato: ' + req.params.id);
        var idContato = req.params.id;
        var contato = contatos.filter(function(contato) {
            return contato._id == idContato;
        })[0];
        contato ? res.json(contato) : res.status(404).send('Contato não encontrado!');
    };
    controller.removeContato = function(req, res) {
        var idContato = req.params.id;
        contatos = contatos.filter(function(contato) {
            return contato._id != idContato;
        });
        res.send(204).end();
    };

    controller.salvaContato = function(req, res) {
        var contato = req.body;
        contato = contato._id ? atualiza(contato) : adiciona(contato);
        res.json(contato);
    };

    function adiciona(contatoNovo) {
        contatoNovo._id = ++ID_CONTATO_INC;;
        contatos.push(contatoNovo);
        return contatoNovo;
    }

    function atualiza(contatoAlterar) {
        contatos = contatos.map(function(contato) {
            if (contato._id == contatoAlterar._id) {
                contato = contatoAlterar;
            }
            return contato;
        });

        return contatoAlterar;
    }

    return controller;
};*/
