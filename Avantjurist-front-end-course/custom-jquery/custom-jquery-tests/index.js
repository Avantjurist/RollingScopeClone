window.$ = (function() {
    var JQueryObj = function(selector) {
        this.arr = document.querySelectorAll(selector);
        Object.defineProperty(this, 'length', {
            get: function() {
                return this.length;
            }
        })
    }

    function $(selector) {
        var obj = new JQueryObj(selector);
        return obj;
    }

    JQueryObj.prototype.each = function(func) {
        for (var i = 0; i < this.arr.length; i++) {
            var obj = func.call(this.arr[i], i, this.arr[i]);
            if (obj == false) {
                return this;
            }
        }
        return this;
    }

    JQueryObj.prototype.addClass = function(className) {
        if (typeof className == "string") {
            this.each(function(i, item) {
                item.classList.add.apply(item.classList, className.split(' '));
            })
        } else {
            this.each(function(i, item) {
                var res = className(i, item.className);
                item.className = res;
            });
        }
        return this;
    }

    JQueryObj.prototype.append = function(content) {
        if (typeof content == "string") {
            this.each(function(i, item) {
                item.innerHTML = item.outerHTML + content;
            });
        } else {
            this.each(function(i, item) {
                item.innerHTML = item.outerHTML + content.outerHTML;
            });
        }
        return this;
    }

    JQueryObj.prototype.html = function(content) {
        if (arguments.length == 0) {
            return this.arr[0].innerHTML;
        }

        this.each(function(i, item) {
            item.innerHTML = content
        });
    }

    JQueryObj.prototype.attr = function(name, val) {
        if (arguments.length == 1) {
            return this.arr[0].attributes[name].value;
        } else {
            this.each(function(i, item) {
                item.setAttribute(name, val);
            });
        }
    }

    JQueryObj.prototype.children = function(className) {
        if (arguments.length == 0) {
            return this.arr[0].children;
        } else {
            var childrens = this.arr[0].children;
            var res = [];
            for (var i = 0; i < childrens.length; i++) {
                if (childrens[i].classList.contains(className.slice(1))) {
                    res.push(childrens[i]);
                }
            }
            return res;
        }
    }

    JQueryObj.prototype.css = function(propertyName) {
      if(typeof propertyName == "string"){
        return this.arr[0].style[propertyName];
      }
      else{
        this.each(function(i, item){
          Object.assign(item.style, propertyName);
        });
      }
    }

    JQueryObj.prototype.data = function(key, value){
      if(arguments.length == 2){
        this.each(function(i, item){
          item.dataset[key] = value;
        })
      }
      else if(arguments.length == 1 && typeof key == "string"){
        return this.arr[0].dataset[key];
      }
      else if(arguments.length == 1 && typeof key == "object"){
        this.each(function(i, item){
          Object.assign(item.dataset, key);
        })
      }
      else{
        return this.arr[0].dataset;
      }
    }

    JQueryObj.prototype.on = function(events, selector, callback){
      if(arguments.length == 2){
        callback = selector;
        this.each(function(i, item){
          item.addEventListener(events,callback);
        });
      }
      else{
        this.each(function(i, item){
          item.addEventListener(events, function(e){
            if(e.target.matches(selector)){
              callback(e);
            }
          });
        });
      }
    }

    JQueryObj.prototype.one = function(events, callback){
      this.each(function(i, item){
        item.addEventListener(events, function(e){
          e.target.removeEventListener(e.type, arguments.callee);
          callback(e);
        });
      });
    }

    return $;

})();
