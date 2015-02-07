angular.module('baabtra').controller('AddcourseCtrl',['$scope','bbConfig','$rootScope','$http','$state','addCourseService','commonSrv','addCourseDomainSrv','manageTreeStructureSrv','branchSrv','RoleMenuMappingSrv','addCourseElementService','commonService','addCourseService',function($scope,bbConfig,$rootScope,$http,$state,addCourseService,commonSrv,addCourseDomainSrv,manageTreeStructureSrv,branchSrv,RoleMenuMappingSrv,addCourseElementService,commonService,addCourseService){


  /*login detils start*/

  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }

  if($rootScope.loggedIn==false){
    $state.go('login');
  }

  $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  $scope.cmp_id=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkCompanyId.$oid;
  /*login detils ends*/

if($state.params.courseId!=""){
  //this function loads course details by course Id
  $scope.courseId = $state.params.courseId;
  var promise = addCourseService.fnLoadCourseDetails($scope, $scope.courseId);
  promise.then(function(course){
    if(!angular.equals($scope.course.Duration.durationInMinutes, undefined)){

      $scope.totalCourseDuration = $scope.course.Duration.durationInMinutes;
    }
  });

}
else{
  $scope.courseId = "";
}



$scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
$scope.technologies={};//object to store selected technologies
$scope.technologies.values = [];//object to store selected technologies


    $scope.selectedPaymentType={id: "1",name: "Before The Course"};

    $rootScope.courseDetails={}; // for supressing errors lijin have commented this and you can uncomment below and
    $scope.ExitPoints={"exitPointList":{}}; // initializing exit point obj
			
$scope.totalCourseDuration=0; // course duration in minutes

$scope.ddlBindObject={0:{id: "1",name:"Days",mFactor:(1/1440),show:true},
                         1:{id: "2",name: "Months",mFactor:(1/43200),show:false},
                         2:{id: "3",name: "Hours",mFactor:1/60,show:true},
                         3:{id: "4",name: "Minutes",mFactor:1,show:true}};//mFactor is multiplication factor

// for dynamically change the visibility variable 'show' of all dropdown list datas
$scope.$watch('totalCourseDuration',function(){
  if($scope.totalCourseDuration!=undefined&&$scope.totalCourseDuration!=0)
  {
    $scope.ddlBindObject[1].show=($scope.totalCourseDuration>=43200);
    $scope.ddlBindObject[2].show=($scope.totalCourseDuration>=60);
    $scope.ddlBindObject[3].show=($scope.totalCourseDuration>=1);
  }
});
                    


// variable to store courseDuration
    $scope.courseDuration={};
    $scope.courseDuration.days=0;
    $scope.courseDuration.months=0;
    $scope.courseDuration.years=0;


//watch funtion to analyse change in courseDuration object
    $scope.$watch('courseDuration', function(newVal, oldVal){
        
        if(($scope.courseDuration.days!==0)||($scope.courseDuration.months!==0)||($scope.courseDuration.years!==0)){		
                            $scope.totalCourseDuration=(($scope.courseDuration.days*1)*24*60)+(($scope.courseDuration.months*30)*24*60)+(($scope.courseDuration.years*365)*24*60);
                     }
    	else{
    		$scope.totalCourseDuration=0;

    	}                 
    }, true);


	$scope.tlPopOver={};//obj for bulding context menu of timeline point
	$scope.tlPopOver.step3={colorClass:'bg-gold-dark'};
  addCourseElementService.FnGetCourseElements($scope.tlPopOver.step3,"");//calling course element function

  

$scope.currentState=$state.current.name;
$scope.nextPart = function(state){
    $scope.currentState=state;
    $state.go(state);
};

$scope.onDomainSelectionChanged = function(items) {
    $scope.selectedDomains =[];
    if (items) {
      for (var i = 0; i < items.length; i++) {
        $scope.selectedDomains.push(items[i].name);
      }
    }
    return $scope.selectedDomains;
  };

$scope.onBranchSelectionChanged = function(items) {
    $scope.selectedBranches=[];
    if (items) {
      for (var i = 0; i < items.length; i++) {
        $scope.selectedBranches.push(items[i].name);
      }
    }
  };

$scope.onRoleSelectionChanged = function(items) {
    $scope.selectedRole=[];
    if (items) {
      for (var i = 0; i < items.length; i++) {
        $scope.selectedRole.push(items[i].name);
      }
    }
  };

commonSrv.FnLoadGlobalValues($scope,"");

addCourseDomainSrv.FnLoadDomain($scope);

branchSrv.fnLoadBranch($scope,$scope.cmp_id);

RoleMenuMappingSrv.FnGetRoles($scope, $scope.cmp_id, "", "");

// Global Declaration Of variables

  $scope.domains = [];
  $scope.branchDetails =[];
  $scope.rolesDetails = [];
  $scope.selectedBranches =[];
  $scope.selectedRole = []

// Global Declaration Of variables end  

$scope.$watch('domainDetails', function(newVal, oldVal){
    if (!angular.equals($scope.domainDetails,undefined)) {
        $scope.data1=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.domainDetails,null),null);
        $scope.domains = angular.copy($scope.data1);
        convertObjectName($scope.domains, null);
    }
});

$scope.$watch('branches', function(newVal, oldVal){
    if (!angular.equals($scope.branches,undefined)) {
        $scope.data1=manageTreeStructureSrv.buildTree(manageTreeStructureSrv.findRoots($scope.branches,null),null);
        $scope.branchDetails = angular.copy($scope.data1);
        convertObjectName($scope.branchDetails, null);
    }
});


$scope.$watch('roles', function(newVal, oldVal){
    if (!angular.equals($scope.roles,undefined)) {
      angular.forEach($scope.roles,function(role){
        role.name=role.roleName;
      });
      $scope.rolesDetails = angular.copy($scope.roles);
    }
});


// *********************** STEP 1 ****************************************
$scope.course={};
$scope.course.Delivery = {};
$scope.course.Delivery.online=true;//setting delevery mode default option to true
$scope.course.Delivery.offline=true;//setting delevery mode default option to true
$scope.course.balanceAmount = 5;

var convertObjectName=function(menu,sub){
              if(sub==null){
                sub=0;
              }
              if(angular.equals(menu[sub],undefined)){
                return 0;
              }
                
              if(!angular.equals(menu[sub].childrenObj,undefined)){
                menu[sub].name=menu[sub]._id;
                menu[sub].id=menu[sub]._id;
                menu[sub].$$hashKey=menu[sub]._id+sub;
                delete menu[sub]._id;
                delete menu[sub].createdDate;
                delete menu[sub].parent;
                delete menu[sub].crmId;
                delete menu[sub].updatedDate;
                delete menu[sub].urmId;
                delete menu[sub].activeFlag;
                if(!angular.equals(menu[sub].children,null)){
                menu[sub].children=menu[sub].childrenObj;
                }
                else{
                  menu[sub].children=[];
                }
              }
              if(menu[sub].childrenObj.length){
               convertObjectName(menu[sub].childrenObj,null);
              }
              convertObjectName(menu,++sub);
            };

$scope.loadTechnologies = function(Query){
    return $scope.globalValues[0].values.approved;
};
$scope.loadTags =function(Query){
    return $scope.globalValues[1].values.approved;
};

$scope.completeStep1 = function(course){//created for build step1 object
/* Building courseDetails Start */
    var Technologies = [];
    var Tags = [];
    $scope.ItsTimeToSaveDataToDB = false;

    angular.forEach(course.Technologies, function(technology){
        Technologies.push(technology.text);
    });

    angular.forEach(course.Tags, function(tag){
        Tags.push(tag.text);
    });

    var courseToBeSave = angular.copy($scope.course);
    courseToBeSave.Tags = Tags;
    courseToBeSave.Duration = {durationInMinutes : 525600,DurationDetails : {"Year(s)" : 1}
    },
    courseToBeSave.Technologies = Technologies;
    courseToBeSave.updatedDate = Date();


    if(angular.equals($scope.courseId,"")){
      courseToBeSave.draftFlag = 0;
      courseToBeSave.activeFlag = 1;
      courseToBeSave.createdDate = Date();
      courseToBeSave.crmId = $scope.rm_id;
    }
    courseToBeSave.urmId = $scope.rm_id;

    if (!angular.equals(courseToBeSave.Name, undefined)) {
      var path='Course/courseImage';

      if(!angular.equals(course.Img,undefined)){
      var promise = addCourseService.fnCourseFileUpload(course.Img, path);
       promise.then(function(data){ // call back function for the fileupload
        courseToBeSave.courseImg = bbConfig.BWS+'files/'+path+'/'+data.data.replace('"','').replace('"','');
        $scope.ItsTimeToSaveDataToDB=true;
      });
     }
     else{
       $scope.ItsTimeToSaveDataToDB=true;
     }
       var unbindWatchOnThis=$scope.$watch('ItsTimeToSaveDataToDB',function(){
        if($scope.ItsTimeToSaveDataToDB){
          delete courseToBeSave.Img;
          addCourseService.saveCourseObject($scope, courseToBeSave, "", $scope.courseId);//saving to database
          unbindWatchOnThis(); // used to unbind this watch after triggering it once
        }
      });
      $scope.currentState="home.main.addCourse.step2";
      $state.go('home.main.addCourse.step2',{'courseId':$scope.courseId});
    };

/* Building courseDetails End */

};



// *********************** STEP 1 .End ***********************************
// *********************** STEP 2 ***********************************

// variable initaialisations
$scope.course.Fees = {};
$scope.course.Fees.free = true;
$scope.course.Fees.oneTime = true;
$scope.course.Fees.payment = {};
// Payment types
$scope.paymentType = {};
$scope.course.Fees.payment.mode = {id: "1",name: "Before The Course"};
$scope.paymentTypes=[{id: "1",name: "Before The Course"},
                     {id: "2",name: "During The Course"},
                     {id: "3",name: "After The Course"}];

    $scope.course.Fees.currency= {currency: "INR",name: "<i class=\"fa  fa-inr\"></i>"};
                
    $scope.feeIn=[{currency: "INR",name: "<i class=\"fa  fa-inr\"></i>"},
          {currency: "Dollar",name: "<i class=\"fa fa-dollar\"></i>"},
          {currency: "SR",name: "SR"}];
    // $scope.course.Duration={};

    // $scope.course.Duration.DurationDetails={"Year(s)":1,"Month(s)":2,"Week(s)":5};

// adding and deleing the contextmenus the context menu
  $scope.$watch(function(){return $scope.course.Fees.oneTime + $scope.course.Fees.payment.mode}, function(){
      console.log($scope.course.Fees.payment.mode);
      if(!angular.equals($scope.course.Fees.payment.mode,undefined)){
      if($scope.course.Fees.oneTime === true || angular.equals($scope.course.Fees.payment.mode.id,'2')){
          $scope.tlPopOver.step2 = {colorClass:'bg-baabtra-green'};
          addCourseElementService.FnGetCourseElements($scope.tlPopOver.step2,"Payment_checkpoint");//calling course element function
      }    
      else{
          $("#tlContextMenu").remove();
          $scope.tlPopOver.step2={};        
      }
    }
  });
 
$scope.completeStep2 = function(){
  console.log($scope.course);
  $scope.course
  if (!$scope.course.Fees.payment.oneTime) {
    delete $scope.course.Fees.payment.mode;
  }
  delete $scope.course._id
  addCourseService.saveCourseObject($scope, $scope.course, "", $scope.courseId);//saving to database
  $scope.currentState="home.main.addCourse.step3";
  $state.go('home.main.addCourse.step3',{'courseId':$scope.courseId});
};



// *********************** STEP 2 .End ***********************************

}]);