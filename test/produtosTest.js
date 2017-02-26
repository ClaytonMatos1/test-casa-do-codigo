var express = require('../config/express')();
var request = require('supertest')(express);
var clearTableLivros = function (done) {
	var conn = express.infra.connectionFactory();
	conn.query('delete from livros', function (ex, result) {
		if (!ex) {
			done();
		}
	});	
}

describe('ProdutosController', function () {
	beforeEach(function (done) {
		clearTableLivros(done);
	});

	afterEach(function (done) {
		clearTableLivros(done);
	});

	it('#Listagem JSON', function (done) {
		request.get('/produtos')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('#Cadastro de novo livro com dados invalidos', function (done) {
		request.post('/produtos')
		.send({
			titulo : '',
			descricao : 'novo livro'
		})
		.expect(400, done);
	});

	it('#Cadastro de novo livro com dados validos', function (done) {
		request.post('/produtos')
		.send({
			titulo : 'Desenvolvimento nodejs',
			descricao : 'novo livro',
			preco : 32.90
		})
		.expect(302, done);
	});
});