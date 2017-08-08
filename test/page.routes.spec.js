var supertest = require('supertest');
const chai = require('chai');
var expect = chai.expect; 
var app = require('../app');
var agent = supertest.agent(app); 
const {db, Page, User} = require('../models');

describe('http requests', function () {
  let createdPage1, createdpage2;
  beforeEach((done) => {
    Page.sync({force: true})
    .then(() => {
      return Page.create({
        title: 'Testing Routes 1',
        urlTitle: Page.route,
        content: 'So many routes so little time',
        status: 'open',
        tags: ['supertest', 'superwoman', 'superman', 'superdog']
      })
    })
    .then((newPage) => {
      createdPage1 = newPage;
      return Page.create({
        title: 'Testing Routes 2',
        urlTitle: Page.route,
        content: 'Not enough time',
        status: 'open',
        tags: ['supertest', 'superwoman', 'superman', 'superdog']
      }) 
    })
    .then((newpage2)=>{
      createdpage2 = newpage2;
      done();
    })
  });
  
  describe('GET /wiki/', function () {
    it('responds with 200', function(done){
      agent
      .get('/wiki/')
      .expect(200, done)
    });
  });

  describe('GET /wiki/add', function () {
    it('responds with 200', (done) => {
      agent
      .get('/wiki/add')
      .expect(200, done)
      });
  });

  describe('GET /wiki/:urlTitle', function () {
    it('responds with 404 on page that does not exist', (done) => {
      agent
      .get('/wiki/something-false')
      .expect(404, done);
    });
    it('responds with 200 on page that does exist', (done) =>{
      agent
      .get(`/wiki/${createdPage1.urlTitle}`)
      .expect(200, done)
    });
  });

  describe('GET /wiki/search/:tag', function () {
    it('responds with 200', (done) =>{
      agent
      .get(`/wiki/search/${createdPage1.tags[0]}`)
      .expect(200, done)
    });
  });

  describe('GET /wiki/:urlTitle/similar', function () {
    it('responds with 404 for page that does not exist', (done)=>{
      agent
      .get('/wiki/get-something/similar')
      .expect(404, done)
    });
    it('responds with 200 for similar page', (done)=>{
      agent
      .get(`/wiki/${createdPage1.urlTitle}/similar`)
      .expect(200, done);
    });
  });

  describe('POST /wiki', function () {
    it('responds with 302', (done)=>{
      agent
      .post('/wiki')
      .send({
        authorEmail: 'routing@gmail.com',
        authorName: 'uhhhh hello',
        title: 'Testing Route Post',
        urlTitle: Page.route,
        content: 'POST POST POST POST POST',
        status: 'open',
        tags: ['supertest', 'superwoman', 'superman', 'superdog']
      })
      .expect(302, done)
    });
  });

  describe('POST /wiki/:urlTitle/edit', ()=>{
    it('responds with 302', (done)=>{
      agent
      .post('/wiki/Testing_Title_1/edit')
      .send({

        title: 'Edited Title',
        content:'We edited this file!',
        urlTitle: 'Edited_Title'
      })
      .expect(302, done)
    })
  })

});