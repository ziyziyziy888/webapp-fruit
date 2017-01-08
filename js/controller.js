
myapp.controller("myController",function($scope,$rootScope){
	$rootScope.isLogin=false;
	$scope.exit=function(){
		localStorage.removeItem("userID");
		$rootScope.isLogin=false;
	}
})


myapp.controller("mainController",["$scope","$http","myService","$location",function($scope,$http,myService,$location){	
	//挂载的商品总数和总价钱的数据
	$scope.allNum=0;
	$scope.allPrice=0;
	//里面保存了目前商品总数和总价钱的对象
	var numObj=myService.makeNum();
	//数据的更新
	$scope.allNum=numObj.allNum;
	$scope.allPrice=numObj.allPrice;
	
	//加入购物车的方法，传入的是这件商品的id和单价
	$scope.add=function(id,price,name){
		//操作购物车的东东
		myService.controlGood(id,price,name);
		//获取购物车里商品的总数和总价
		var numObj=myService.makeNum();
		//数据的更新
		$scope.allNum=numObj.allNum;
		$scope.allPrice=numObj.allPrice;
	}
	
	$scope.toDetail=function(id){
		$location.path("detail/"+id)
	}
	
	
	
	$http({
		url:"json/goods.json",
		method:"get"
	}).success(function(data){
		$scope.dataList=data;
	})

	
}])
myapp.controller("detailController",["$scope","$routeParams","$http","myService",function($scope,$routeParams,$http,myService){
	//挂载的商品总数和总价钱的数据
	$scope.allNum=0;
	$scope.allPrice=0;
	//里面保存了目前商品总数和总价钱的对象
	var numObj=myService.makeNum();
	//数据的更新
	$scope.allNum=numObj.allNum;
	$scope.allPrice=numObj.allPrice;
	
	
	$scope.add=function(id,price){
		//操作购物车的东东
		myService.controlGood(id,price);
		//获取购物车里商品的总数和总价
		var numObj=myService.makeNum();
		//数据的更新
		$scope.allNum=numObj.allNum;
		$scope.allPrice=numObj.allPrice;
	}
	
	$scope.remove=function(id){
		myService.removeGood(id);
		var numObj=myService.makeNum();
		//数据的更新
		$scope.allNum=numObj.allNum;
		$scope.allPrice=numObj.allPrice;
	}	
	$http({
		url:"json/goods.json",
		method:"get"
	}).success(function(data){
		var textArr=["微乎甚微(低于 5%)","含量低(5 ~ 10%)","平均水平(10 ~ 20%)","含量高(20~40%)","富含(高于40%)"]
		for (var i =0;i<data.length;i++) {
			if(data[i].id==$routeParams.id){
				$scope.data=data[i];
				$scope.infos=[
					{name:"胡萝卜素",val:data[i].hlb,text:textArr[data[i].hlb]},
					{name:"VC",val:data[i].vc,text:textArr[data[i].vc]},
					{name:"叶酸",val:data[i].ys,text:textArr[data[i].ys]},
					{name:"钾",val:data[i].jia,text:textArr[data[i].jia]},
					{name:"纤维素",val:data[i].qws,text:textArr[data[i].qws]},
				]
			}
		}
	})
}])
myapp.controller("buycarController",["$scope","myService",function($scope,myService){
	$scope.buycar=myService.getCar();
	
	var numObj=myService.makeNum();
		//数据的更新
	$scope.allNum=numObj.allNum;
	$scope.allPrice=numObj.allPrice;
	
	
	$scope.add=function(id,price,name){
		//操作购物车的东东
		myService.controlGood(id,price,name);
		//获取购物车里商品的总数和总价
		var numObj=myService.makeNum();
		//数据的更新
		$scope.allNum=numObj.allNum;
		$scope.allPrice=numObj.allPrice;
		$scope.buycar=myService.getCar();
	}
	
	$scope.reduce=function(id,price,name,type){
//		//操作购物车的东东
		myService.controlGood(id,price,name,type);
		//获取购物车里商品的总数和总价
		var numObj=myService.makeNum();
		//数据的更新
		$scope.allNum=numObj.allNum;
		$scope.allPrice=numObj.allPrice;
		$scope.buycar=myService.getCar();
	}
	
	$scope.clear=function(){
		$scope.buycar=[];
		localStorage.removeItem("buycar")
		$scope.allNum=0;
		$scope.allPrice=0;
	}
}])


myapp.controller("registerController",["$scope","$http","$location",function($scope,$http,$location){
	$scope.register=function(){
		$http({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			method:"get",
			params:{
				status:"register",
				userID:$scope.uname,
				password:$scope.upass
			}
		}).success(function(data){
			if(data==1){
				alert("ok");
				$location.path("login")
			}else{
				alert("fail")
			}
		})
	}
}])

myapp.controller("loginController",["$scope","$http","$location","$rootScope",function($scope,$http,$location,$rootScope){
	
	$scope.login=function(){
		$http({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			method:"get",
			params:{
				status:"login",
				userID:$scope.uname,
				password:$scope.upass
			}
		}).success(function(data){
			if(data.userID){
				alert("ok");
				$rootScope.userID=data.userID;
				localStorage.userID=data.userID;
				$rootScope.isLogin=true;
				$location.path("main")
			}else{
				alert("fail")
			}
		})
	}	
}])



