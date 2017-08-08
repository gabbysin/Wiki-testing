const chai = require('chai');
const expect = require('chai').expect;
const spies = require('chai-spies');
chai.use(spies);
const {db, Page, User} = require('../models')

describe('Test Page Model', function () {
  let createdPage;
  //beforeEach will run everytime before the scope it blocks (i.e it statement)
  //pass done in beforeEach
  beforeEach((done) => {
    //{force: true} is necessary if we want to start w a new DB everytime
    Page.sync({force: true})
    .then(() => {
      return Page.create({
        title: 'Testing Page model',
        urlTitle: Page.route,
        content: 'We are testing Page model',
        status: 'open',
        tags: ['chai', 'mocha', 'unittest']
      })
    })
    .then((newPage) => {
      createdPage = newPage;
      done();
    })
  });

  describe('test title', () => {
    it('returns the correct title', () => {
      expect(createdPage.title).to.equal('Testing Page model')
    })
  })

  describe('test tags', () => {
    it('returns the correct tags', () => {
      expect(createdPage.tags).to.have.same.members(['chai', 'mocha', 'unittest'])
    })
  })

  describe('Test route inside Page', function () {
    it('returns the right route', function() {
      expect(createdPage.route).to.equal('/wiki/Testing_Page_model')
    });
  });

  describe('test renderedContent', () => {
    it('mark down the content', () => {
      expect(createdPage.renderedContent).to.equal('<p>We are testing Page model</p>\n')
    })
  });

  describe('test beforeValidate', () => {
    let pageBeforeValidate;
    beforeEach((done) => {
      Page.create({
        title: 'Testing% Title$',
        urlTitle: Page.route,
        content: 'testing findByTag',
        status: 'open',
        tags: ['chai', 'mocha', 'unittest']
      })
      .then((newPage) => {
        pageBeforeValidate = newPage;
        done();
      })
    })
    //for hooks we always need to pass done and call it in the end
    //beforeValidate is a hook that automatically happens at the same time of saving
    it('replaces space and non-alphanumeric characters with underscore', (done) => {
      expect(pageBeforeValidate.urlTitle).to.equal('Testing_Title');
      done();
    })
    //if the method returns a promise we need return the entire statement inside "it"
    it('never gets itself', () => {
      let arrLength;
      return pageBeforeValidate.findSimilar()
      .then(function(pageArr) {
        arrLength = pageArr;
      })
      expect(arrLength).to.equal(1)
    });
    it('gets other pages with any common tags');
    it('does not get other pages without any common tags');

  });
});
// describe('A different category');
