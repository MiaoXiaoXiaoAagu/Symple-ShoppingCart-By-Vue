window.onload = function(){
    new Vue({
        el:'#my',
        data:{
            lists:[{name:'手机1', purchased:false},//所有购物信息 purchased选购状态 false未选购，true选购
                {name:'电脑2',purchased:true},
                {name:'化妆品3',purchased:false},
                {name:'包4',purchased:false},
                {name:'电脑5',purchased:true},
                {name:'化妆品6',purchased:false},
                {name:'包7',purchased:false},
                {name:'电脑8',purchased:true},
                {name:'化妆品9',purchased:false},
                {name:'包10',purchased:false},
                {name:'手机11', purchased:false},
                {name:'电脑12',purchased:true},
                {name:'化妆品13',purchased:false},
                {name:'包14',purchased:false},
                {name:'电脑15',purchased:true},
                {name:'化妆品16',purchased:false},
                {name:'包17',purchased:false},
                {name:'电脑18',purchased:true}
            ],
            name:"",//添加一条数据所使用的变量
            page:{//分页相关变量
                total:1,//总分页数
                showPageNum:1,//当前展示页码
                contentNum:10,//每一页的展示条数
            },
        },
        methods:{   //方法
            add:function(name){
                if (name ==='') return;
                this.lists.unshift({name:name,purchased:false});
                this.name="";
                this.paging();
            },
            del:function(index){
                let listIndex=this.serialNum(index)-1;
                this.lists.splice(listIndex,1);
                this.paging();
            },
            paging:function () {//分页
                //确定总页数
                this.page.total=Math.ceil(this.lists.length/this.page.contentNum);
                if(!this.page.total)
                {
                    this.page.total=1;
                }
                //确定当前展示页数
                this.page.showPageNum=this.page.showPageNum>this.page.total?this.page.total:this.page.showPageNum;
            },
            notPurchaseNum:function () {
                let total=0;
                this.lists.forEach(function (value) {
                    if(!value.purchased){total++}
                })
                return total;
            },
            serialNum:function (index) {
                return index+1+(this.page.showPageNum-1)*this.page.contentNum;
            },
            pageTurn:function (index) {//选择页数
                this.page.showPageNum=index;
                this.paging();
            },
            pagePre:function () {//向前翻页
                if(this.page.showPageNum>1){
                    this.page.showPageNum--;
                }
                this.paging();
            },
            pageNext:function () {//向后翻页
                if(this.page.showPageNum<this.page.total){
                    this.page.showPageNum++;
                }
                this.paging();
            }
        },
        created:function () {
            this.paging();
        },
        filters:{   //过滤器
            stateFilter:function(type){return type?"已采购":"未采购"}
        },
        computed:{
            showList:function () {
                //确定当前展示页数据
                let start=(this.page.showPageNum-1)*this.page.contentNum;
                return  this.lists.slice(start,start+this.page.contentNum);
            }
        }
    })
}
