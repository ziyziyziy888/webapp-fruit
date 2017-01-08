
myapp.factory("myService",function(){
	return {
		//计算购物车里商品的总数量和总价钱
		controlGood:function(id,price,name,type){
			//获取到购物车
			var buycar=this.getCar();
//			如果购物车里没有东西的话,就添加新的商品
			if(!buycar.length){				
				buycar.push(this.makeNew(id,price,name));
				localStorage.buycar=JSON.stringify(buycar)
			}else{
				//为false的时候就代表购物车里没有这个商品
				var flag=false;
				//为了看一看购物车里有没有这个商品，有的话让数量+1；
				for (var i=0;i<buycar.length;i++) {
					if(buycar[i].id==id){
						if(type){
							buycar[i].num--;
							if(buycar[i].num==0){
								buycar.splice(i,1);
							}
						}else{
							buycar[i].num++;	
						}						
						localStorage.buycar=JSON.stringify(buycar);
						flag=true;
						break;
					}
				}
				//如果购物车里没有这件商品，还是去往进放一个新的商品
				if(!flag){
					buycar.push(this.makeNew(id,price,name));
					localStorage.buycar=JSON.stringify(buycar)
				}
			}
		},
		makeNum:function(){
			var buycar=this.getCar();
			var obj={};
			obj.allNum=0;
			obj.allPrice=0;
			if(buycar.length){
				for (var i=0;i<buycar.length;i++) {
					obj.allNum+=buycar[i].num;
					obj.allPrice+=buycar[i].num*buycar[i].price;
				}
			}
			return obj;
		},
		getCar:function(){//获取本地存储里的购物车
			var buycar=localStorage.buycar?JSON.parse(localStorage.buycar):[];
			return buycar;
		},
		makeNew:function(id,price,name){//创造一个新的商品
			var obj={};
				obj.id=id;
				obj.num=1;
				obj.name=name;
				obj.price=price;
				return obj;
		},
		removeGood:function(id){
			var buycar=this.getCar();
			if(buycar.length){
				for (var i=0;i<buycar.length;i++) {
					if(buycar[i].id==id){
						buycar.splice(i,1)
						localStorage.buycar=JSON.stringify(buycar);
					}					
				}
			}
		}
	}
})
