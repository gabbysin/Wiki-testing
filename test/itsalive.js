const expect = require('chai').expect
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

// describe('addition', function(){
//   function addition(num1, num2){
//     return num1 + num2;
//   }
//   it('adds 2 and 2', function(){
//     let sum = addition(2, 2);
//     expect(sum).to.equal(4);
//   })
// });
//
// describe('using Done to wait for it block', function(){
//   it('make sure setTimeout took 1000ms', function(done){
//     var start = new Date();
//     setTimeout(function (){
//       var duration = new Date() - start;
//       expect(duration).to.be.closeTo(1000, 50);
//       done();
//     }, 1000);
//   })
// })
//
// describe('how spies work', function(){
//   it('spy on the number of times forEach ran', function(){
//     let testArr = ['x', 'y', 'z'];
//     function logNth(val, idx){
//       console.log(`Logging elem #${idx}:${val}`);
//     }
//     logNth = chai.spy(logNth);
//     testArr.forEach(logNth);
//     expect(logNth).to.have.been.called.exactly(testArr.length);
//   })
// });
