var UserRole = (function () {
    // 定义一个UserRole类型的构造器
    var UserRole = function (options) {
        // this.options = options || {}; 
        this.init(options || {}); // 初始化操作
        this.bind();
    };
    var html = '<div class="container">' +
        '<ul class="ul-left">' +
        // '<li>系统管理</li>'+
        // '<li>部门经理</li>'+
        // '<li>部门主管</li>'+
        // '<li>销售经理</li>'+
        // '<li>财务灰机</li>'+
        // '<li>财务出纳</li>'+
        '</ul>' +
        '<ul class="middle">' +
        '<a href="#" class="add">添加</a>' +
        '<a href="#" class="del">删除</a>' +
        '</ul>' +
        '<ul class="ul-right">' +

        '</ul>' +
        '<div><a class="save">保存</a><a class="close">关闭</a></div>'
    '</div>'

    // 
    UserRole.prototype = {
        init: function (options) {
            this.options = options;
            this.dom = document.createElement('div');
            this.dom.className = "mask";
            document.body.appendChild(this.dom);
            this.dom.innerHTML = html;
            this.dom.style.display = this.options.show ? "block" : "none";
            this.status = this.options.show ? 0 : 1;

            this.save = this.dom.querySelector('.save'); // 找到dom中的save按钮
            this.close = this.dom.querySelector('.close'); // 找到dom中的close按钮

            this.left = this.dom.querySelector('.ul-left');
            this.right = this.dom.querySelector('.ul-right');

            var data = this.options.data || [];
            for (let i = 0; i < data.length; i++) {
                this.left.innerHTML += "<li  data-value='" + data[i].value + "'>" + data[i].text + "</li>";
            }

            this.items = this.left.querySelectorAll('li');

            // console.log(this.items.length);

            this.add = this.dom.querySelector('.add');// 找到dom中的add按钮
            this.del = this.dom.querySelector('.del');// 找到dom中的删除按钮

        },

        show: function () {
            this.dom.style.display = "block";
            this.status = 0;
        },
        hide: function () {
            this.dom.style.display = "none";
            this.status = 1;
        },
        bind: function () {
            var _this = this;
            this.close.onclick = function () {
                _this.hide();
            };
            if (this.options.onSave) {
                // 方法一
                // this.save.onclick = function () {   
                //     _this.options.onSave.call(_this);
                // }
                //方法er
                this.save.onclick = this.options.onSave.bind(_this);

            };

            for (let i = 0; i < _this.items.length; i++) {
                _this.items[i].onclick = this.itemsClick;
            };

            this.add.onclick = this._operClick.bind(this, this.add);
            this.del.onclick = this._operClick.bind(this, this.del);
            // this.del.onclick = function (one, two) {
            //     var selected = one.querySelectorAll('li.selected'); // 找到ul中所有被选中的元素
            //     for (let i = 0; i < selected.length; i++) {
            //         two.appendChild(selected[i]);

            //     }
            // };
        },
        itemsClick: function () {
            if (this.className.indexOf("selected") != -1) {
                this.className = "";
            } else {
                this.className = "selected"
            }
        },
        _operClick: function (target) {
            var one,two;
            if(target.className.indexOf('add')!=-1){
                one = this.left;
                two = this.right;
            }else{
                one = this.right;
                two = this.left;
            }
            var selected = one.querySelectorAll('li.selected'); // 找到ul中所有被选中的元素
            for (let i = 0; i < selected.length; i++) {
                two.appendChild(selected[i]);
            }

        },
        getValue:function () {  
            var values = [];
            var selected = this.right.querySelectorAll('li');
            for(var i = 0; i<selected.length;i++){
                values.push (selected[i].getAttribute('data-value'));
            }
            return values;
        }
    };

    return UserRole;
})();