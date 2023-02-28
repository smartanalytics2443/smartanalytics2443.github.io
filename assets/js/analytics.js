var method = 'Report.Run';
var params={};
var pageViews,InstanceViews=0;
var makeRealTimeRequest = (metrics,elements,callBack)=> {
     params = {
        "reportDescription": {
            "source": "realtime",
            "reportSuiteID": config.reportSuite,
            "metrics": [
                { "id": metrics }
            ], "elements": [
                { "id": elements }
            ],
            "dateGranularity": "minute:1",
            "dateFrom": "-15 minutes"
        }

       
    };
  callBack(params);
 

}


$(function(){
    // DOM Ready - do your stuff 
    getPageReport();
    getSiteReport();
    getLinkClicksReport();
 });


//Page Report
 var getPageReport=()=>{
     makeRealTimeRequest('pageviews','prop1',getPageViews);
     makeRealTimeRequest('pageviews','prop2',getPageViewsByUrl);
     makeRealTimeRequest('instances','geocity',getPageViewsGeoCity);
 }
 var getSiteReport=()=>{
    makeRealTimeRequest('instances','prop3',getSiteInstance);
    makeRealTimeRequest('instances','georegion',getSiteGeoRegions);
    makeRealTimeRequest('instances','page',getSitePages);
 }

 var getLinkClicksReport=()=>{
    makeRealTimeRequest('instances','prop17',getLinkText);
    makeRealTimeRequest('instances','page',getLinkPage);
    makeRealTimeRequest('instances','georegion',getLinkGeoREgion);
 }

 //pageviews
var getPageViews = (params)=>{
    var foo,line;
    MarketingCloud.makeRequest(config, method, params,function(res){
           let pageViewsData=res.responseJSON;
           let pageViewJson=res.responseJSON.report.data;
           document.getElementById('pageViewsContainer').innerText=pageViewsData.report.totals[0];
    
            foo =  loadBarChart('pageViewsBarChart',580,592,pageViewJson);
            line= loadLineChart('#pageViewsLineChart',560,180,pageViewJson);
          }) ;
          
    setInterval(() => {
    MarketingCloud.makeRequest(config, method, params,function(res){
       let pageViewsData=res.responseJSON;
       let pageViewJson=res.responseJSON.report.data;


       let pageViewPrevious=Number(document.getElementById('pageViewsContainer').innerText);
       let currentPageView=Number(pageViewsData.report.totals[0]);
       let actualCount=0;
       if(currentPageView>pageViewPrevious)
       {
         actualCount=currentPageView+(currentPageView*0.05);
         generateCounterNode('plus',actualCount-pageViewPrevious)
       }
       else if(currentPageView<pageViewPrevious)
       {
         actualCount=currentPageView-(currentPageView*0.05); 
         generateCounterNode('minus',pageViewPrevious-actualCount)
       }
       else
       {
         actualCount=currentPageView+1;
         generateCounterNode('plus',actualCount-pageViewPrevious)
       }
   
       document.getElementById('pageViewsContainer').innerText=Math.round(actualCount).toString();
    
       foo.updateBarChart(pageViewJson);
       line.updateLineChart(pageViewJson);
      }) ;
        }, 10000);
 }
 
 var getPageViewsByUrl = (params)=>{
    var foo;
    MarketingCloud.makeRequest(config, method, params,function(res){
       // console.log('getPageViewsByUrl',res.responseJSON); 
       let pageViewsData=res.responseJSON;
       let pageViewJson=res.responseJSON.report.data;

       foo =  loadDataByPageUrl('',pageViewJson);
    }) ;

    setInterval(() => {
        MarketingCloud.makeRequest(config, method, params,function(res){
          // console.log('getPageViewsByUrl',res.responseJSON); 
       let pageViewsData=res.responseJSON;
       let pageViewJson=res.responseJSON.report.data;
        
       foo.updateUrlChart(pageViewJson);
          }) ;
            }, 10000);
 } 
 
 var getPageViewsGeoCity = (params)=>{
 

 }

 //sitesection
var getSiteInstance = (params)=>{
   var foos;
    MarketingCloud.makeRequest(config, method, params,function(res){
   // console.log('getSiteInstance',res.responseJSON);
     let pageViewsData=res.responseJSON;
     let pageViewJson=res.responseJSON.report.data; 
        let siteInstanceData=res.responseJSON;

        
    
        
        document.getElementById('instanceViewsContainer').innerText=siteInstanceData.report.totals[0];
        foos = loadinstanceViewsBarChart('#locationViewsBarChart',580,350,pageViewJson);
    }) ;

    setInterval(() => {
      MarketingCloud.makeRequest(config, method, params,function(res){
        // console.log('getPageViewsByUrl',res.responseJSON); 
     let pageViewsData=res.responseJSON;
     let pageViewJson=res.responseJSON.report.data;
     let siteInstanceData=res.responseJSON;

     let pageViewPrevious=Number(document.getElementById('instanceViewsContainer').innerText);
     let currentPageView=Number(pageViewsData.report.totals[0]);
     let actualCount=0;
     if(currentPageView>pageViewPrevious)
     {
       actualCount=currentPageView;
       generateCounterInstance('plus',actualCount-pageViewPrevious)
     }
     else if(currentPageView<pageViewPrevious)
     {
       actualCount=currentPageView; 
       generateCounterInstance('minus',pageViewPrevious-actualCount)
     }
     document.getElementById('instanceViewsContainer').innerText=siteInstanceData.report.totals[0];
     foos.updateInstanceChart(pageViewJson);
        }) ;
          }, 10000);
 }
 
 var getSiteGeoRegions = (params)=>{
 
   var foolocation;
    MarketingCloud.makeRequest(config, method, params,function(res){
        let pageViewsData=res.responseJSON;
        let pageViewJson=res.responseJSON.report.data; 
         //   document.getElementById('locationViewsContainer').innerText=pageViewsData.report.data[0].breakdown.length;
       foolocation= loadlocationBarChart('#locationViewsBarChart',580,380,pageViewJson);
      // console.log('getPageViewsGeoCity',pageViewJson);
    }) ;

    setInterval(() => {
      MarketingCloud.makeRequest(config, method, params,function(res){
        // console.log('getPageViewsByUrl',res.responseJSON); 
     let pageViewsData=res.responseJSON;
     let pageViewJson=res.responseJSON.report.data;
      
     foolocation.updateLocationBarChart(pageViewJson);
        }) ;
          }, 10000);
 } 
 
 var getSitePages = ()=>{
 
    MarketingCloud.makeRequest(config, method, params,function(res){
       // console.log('getSitePages',res.responseJSON);
    }) ;
 }

 //linkClickReport
 var getLinkText = ()=>{
 
    MarketingCloud.makeRequest(config, method, params,function(res){
       // console.log('getLinkText',res.responseJSON);
    }) ;
 }
 
 var getLinkPage = ()=>{
 
    MarketingCloud.makeRequest(config, method, params,function(res){
      //  console.log('getLinkPage',res.responseJSON);
    }) ;
 } 
 
 var getLinkGeoREgion = ()=>{
 
    MarketingCloud.makeRequest(config, method, params,function(res){
        //console.log('getLinkGeoREgion',res.responseJSON);
    }) ;
 }

 var generateCounterNode=(counter,count)=>{
    var html='';
    counter=='plus'?html='<ion-icon class="upColor" name="arrow-round-up"></ion-icon> '+Math.round(count):html='<ion-icon class="downColor" name="arrow-round-down"></ion-icon> '+Math.round(count);
    document.getElementById('counterDenote').innerHTML=html;
 }
 var generateCounterInstance=(counter,count)=>{
    var html='';
    counter=='plus'?html='<ion-icon class="upColor" name="arrow-round-up"></ion-icon> '+Math.round(count):html='<ion-icon class="downColor" name="arrow-round-down"></ion-icon> '+Math.round(count);
    document.getElementById('counterInstances').innerHTML=html;
 }


