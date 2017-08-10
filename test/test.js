describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          /*
            箭头函数：
            this指向的固定化，并不是因为箭头函数内部有绑定this的机制，
            实际原因是箭头函数根本没有自己的this，
            导致内部的this就是外层代码块的this。
            如果不是箭头函数：
            this将指向global
           */
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      // test运行环境在global，所以this指向到global，如果在浏览器运行，this指向window
      this.should.deepEqual(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            /*
            在绑定obj时，obj是undefined，所以this就指向了global
             */
            this.should.equal(global)
          }
          return _say.bind(obj)
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          /*
          bind 当绑定对象被调用时，该参数会作为原函数运行时的 this 指向
           */
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})