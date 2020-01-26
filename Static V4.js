try {
	var Container=document.querySelector('.content'),
		ErrorPage=document.querySelector('.error'),
		cadrComment =document.querySelector('.block'),
		noComment=document.querySelector('.noComment'),
		videoplayer =document.querySelector('.video'),
		SourceVdeo=document.querySelector('#SourceVideo'),
		dialog =document.querySelector('.Dialog'),
		// info video title tags desc
		infoV=document.querySelector('.infoVedo'),
		//slect comment order
 		OrderComment=document.querySelector('#OrderComment'),
 		_order="time",
 		//get data from locale storage 
 		GetData=JSON.parse(sessionStorage.getItem('myData')),
 		// vars for lang
 		lg=localStorage.getItem('lg'),
 		lgtrend=document.querySelector('.trendNumber'),
 		lggotoYtb=document.querySelector('.gotoYtb'),
 		lgSubscribe=document.querySelector('.Subscribe'),
 		lgdesc=document.querySelector('.desc'),
 		lgTagsV=document.querySelector('.TagsV'),
 		lginfoCh=document.querySelector('.infoCh'),
 		//comments
 		lgComment=document.querySelector('.Comment_word_child'),
 		lgFilter=document.querySelector('.Filter_word'),
 		lgopt=OrderComment.getElementsByTagName('option'),
 		descChn='',
		Location='',
		Joined='',
 		Style=document.createElement('style');
 		Style.setAttribute('type','text/css');
if (GetData=='' || GetData == undefined || GetData==null) {
	Container.style.display = 'none';
	ErrorPage.style.display='block';
} else {
	//Container Visible
	Container.style.display = 'inline-flex';
	ErrorPage.style.display='none';
	//variables 
		// get num trend
	var trendNumber=GetData['trend'],
		// Title video
		TitleVO=GetData['Title'].replace(/mrlm3gaze/gi,"\'"),
 		TitleV=decodeURIComponent(TitleVO),
 		// url video
 		urlV=GetData['url'],
 		urlYTB='https://www.youtube.com/watch?v=',
 		//channel name 
 		ch=GetData['nameChannel'].replace(/mrlm3gaze/gi,"\'"),
 		nameChannel=decodeURIComponent(ch),
		//channel name 
		urlChannel='https://www.youtube.com/channel/',
		LinkChannel=urlChannel + GetData['LinkChannel'].replace(/mrlm3gaze/gi,"\'"),
		chaLinInfo =GetData['LinkChannel'].replace(/mrlm3gaze/gi,"\'"),
 		// tags
		tagsV=GetData['tags'].replace(/mrlm3gaze/gi,"\'"),
		TagsV=decodeURIComponent(tagsV),
		myArray=TagsV.split(','),
		array ="",
 		// description video
 		dscrptn=GetData['desc'].replace(/mrlm3gaze/gi,"\'"),
 		desc=decodeURIComponent(dscrptn),
 		// date upload video
 		dateV=GetData['date'];
 		document.title=TitleV;
 		// language
		if (lg==null||lg==''||lg==undefined||lg=='en')
			{
				lgtrend=' On Trending';
				lggotoYtb=' Watch In Youtube ';
				lgSubscribe=' Subscribe ';
				lgdesc=' Decription ';
				lgTagsV=' Tags ';
				lginfoCh=' Channel Info ';
				descChn='Description : ';
				Location='Location : ';
				Joined='Joined : ';
				// comment
				lgComment.textContent='Comments';
				lgFilter.textContent='Filter By : ';
				lgopt[0].textContent='Latest';
				lgopt[1].textContent='Top Comments';

				// new style
				Style.innerHTML=`
					.Filter_word, #OrderComment {float: right;direction: ltr;}
					.Comment_word,.Comment_word i,.img_pro_chan,.nameChannel1 {float: left}
				`
			}
			else if(lg=='ar')
			{
				lgtrend=' على صفحة المحتوى الرائج  ';
				lggotoYtb=' المشاهدة على اليوتيب  ';
				lgSubscribe=' اشتراك ';
				lgdesc=' الوصف  ';
				lgTagsV=' علامات ';
				lginfoCh=' معلومات القناة ';	
				descChn=' الوصف : ';
				Location=' الدولة :';
				Joined=' انضم : ';
				//comment
				lgComment.textContent=' التعليقات ';
				lgFilter.textContent='ترتيب حسب  :';
				lgopt[0].textContent='الأخيرة ';
				lgopt[1].textContent='الأفضل ';

				// new style
				Style.innerHTML=`
					.Filter_word, #OrderComment {float: left;direction: rtl;}
					.Comment_word,.Comment_word i,.img_pro_chan,.nameChannel1{float: right}
				`
			}
document.getElementsByTagName("head")[0].appendChild(Style);
 		// functions 
document.addEventListener('load',getURL(_order)) 
OrderComment.addEventListener('change',changeOrder)
function changeOrder(_order){
 	cadrComment.innerHTML='';
 	getURL(OrderComment.options[OrderComment.selectedIndex].value);
 }
 //  get Video by Source 
 SourceVideo.src='https://www.youtube.com/embed/' + urlV;
function getURL(_order){
 		// variables
 	try {
	 	var url=`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&moderationStatus=published&order=${_order}&textFormat=html&videoId=${urlV}&key=AIzaSyBeP7xWS7fAr0-PpgaTPfuk4VXtBNKMm2g`,
	 	    req = new Request(url),
	 	    results,
	 	    articls;
	 	  // fetch 
		 	fetch(req)
		 	    .then(function(response) {
		 	    	results =response.json();
		 	     	results.then( result => {
		 	     		articls=result.items;
		 	     		   // for loop
		 	    		  for (var i = 0; i < articls.length ; i++) {
		 	    			var name = articls[i].snippet.topLevelComment.snippet.authorDisplayName,
		 	    				ukName="",
		 	    			    prof1= articls[i].snippet.topLevelComment.snippet.authorProfileImageUrl,
								prof = '',
		 	    			    auth = articls[i].snippet.topLevelComment.snippet.authorChannelUrl,
		 	    			    comm = decodeURIComponent(articls[i].snippet.topLevelComment.snippet.textDisplay),
		 	    			    like = articls[i].snippet.topLevelComment.snippet.likeCount,
		 	    			    date = (articls[i].snippet.topLevelComment.snippet.publishedAt).slice(0,10),
		 	    			    time = (articls[i].snippet.topLevelComment.snippet.publishedAt).slice(11,16),
		 	    			    _shorCm='',
		 	    			    favNm='',
		 	    			    divsion=document.createElement('div');
		 	    			    divsion.setAttribute('class', 'comment_container');
								//  if images are loaded
								 if (!prof1.startsWith('http') || prof1.onerror ) {
									     prof='https://lh3.googleusercontent.com/-CY3vr1blI90/XhJwZRC9U7I/AAAAAAAADDY/cSZmU7TvEWMk0vbBJ0LvqRowQn6EaVKcQCEwYBhgL/h120/imagenotfond.jpg';
								 } else {
										 prof=prof1;
								 }
								 // name unknown
								 if (name.length==0) {
								 	ukName='Unknown name';
								 } else {
								 	ukName=name;
								 }
								  // like and not likes
								 if (like == 0)
								  {
								 		favNm="favorite_border";
								  }
								  else if (like >= 1)
								 {
								 		favNm="favorite";
								 }		
								//add div 	
									divsion.innerHTML=`
											<a href="${auth}" class='profile_User' title="${ukName}">
												<img src="${prof}" class="profile" />
												<h4 class="name">${ukName}</h4>
											</a>
											<p class="commentTex" id="commnet${i+1}">${comm}
											</p>
											<div class="likes_time">
												<p class="date">${date + ' # ' + time}</p>
												<div class='likes' title="Number Likes ${like}">
												<i class="material-icons likesNm">${favNm}</i>
												<span class="counter"> ${like} </span>
												</div>
											</div>
											`;
								
		 	    			    cadrComment.appendChild(divsion);
		 	    		};
		 	    	  }
		 	    	);
		 	  }

	 	  );
		}catch(e) {
 			noComment.style.display = 'block';		
 		}
 }
// function get key from local storage 
function GetStorage(){
			for(var i = 0; i < myArray.length ; i++){
				if (tagsV == 'undefined' || tagsV == '') {
					array='No Tags ';
				} else {
					array +='<span class="Arry">' + ' @ ' + myArray[i] +'</span>';
				}
			infoV.innerHTML=`
			<p class="trendNumber"> # ${trendNumber + lgtrend}</p>
					<h3 class="title" title="${TitleV}"> ${TitleV} </h3>
					<div class="NameChannel">
						<a href="${LinkChannel}" class="linkchannel" target='blink' title="${nameChannel}">
							<i class="material-icons">account_circle</i> 
							<span> ${nameChannel} </span>
						</a>
						<a class="gotoYtb" href="${urlYTB + urlV}" title="${TitleV}" target="blink"> ${lggotoYtb} </a>
						<span onclick="SubscribeYoutube();" class="Subscribe" title="${nameChannel}"> ${lgSubscribe} </span>
					</div>
					<div class="description">
						<div class="descTitle">
						   <span class="desc" onclick="myClick();">${lgdesc}</span>
						   <span class="TagsV" onclick="myClick();">${lgTagsV}</span>
						   <span class="infoCh" onclick="myClick();">${lginfoCh} </span>
						   <span class="dateV">${dateV}</span>
						</div>	
						<div class="TagsTxt">${array}</div>
						<div class="DiscTxt">${desc}</div>
					</div>
				`;
	  	}
	}
GetStorage();
// tags and desc toggle
function myClick(){
  $( document ).ready(function() {
		$('.desc').click(function () {
			$('.DiscTxt').show(200);
			$('.TagsTxt').hide(200);
			$('.InfoChannel').hide(200);
			// check mode night 
			if (BackGround ==='' || BackGround==='white' || BackGround ===undefined || BackGround ===null)
			 {
				$(this).css({'background':'var(--main-bgB-color)','transition':'all 0.2s','color':'var(--main-bgW-color)'});
				$('.TagsV').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
				$('.infoCh').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
			} 
			else if (BackGround ==='dark')
			{
				$(this).css({'background':'var(--main-bgW-color)','transition':'all 0.2s','color':'var(--main-bgB-color)'});
				$('.TagsV').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgW-color)'});
				$('.infoCh').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgW-color)'});
			}
			
		});
		$('.TagsV').click(function () {
			$('.TagsTxt').show(200);
			$('.DiscTxt').hide(200);
			$('.InfoChannel').hide(200);
			// check mode night 
			if (BackGround ==='' || BackGround==='white' || BackGround ===undefined || BackGround ===null)
			 {
				$(this).css({'background':' var(--main-bgB-color)','transition':'all 0.2s','color':'var(--main-bgW-color)'});
				$('.desc').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
				$('.infoCh').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
			} 
			else if (BackGround ==='dark') 
			{
				$(this).css({'background':' var(--main-bgW-color)','transition':'all 0.2s','color':'var(--main-bgB-color)'});
				$('.desc').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgW-color)'});
				$('.infoCh').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgW-color)'});
			}
			
		});
		$('.infoCh').click(function () {
			$('.TagsTxt').hide(200);
			$('.DiscTxt').hide(200);
			$('.InfoChannel').show(200);
			// check mode night 
			if (BackGround ==='' || BackGround==='white' || BackGround ===undefined || BackGround ===null)
			 {
				$(this).css({'background':' var(--main-bgB-color)','transition':'all 0.2s','color':'var(--main-bgW-color)'});
				$('.desc').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
				$('.TagsV').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
			} 
			else if (BackGround ==='dark') 
			{
				$(this).css({'background':' var(--main-bgW-color)','transition':'all 0.2s','color':'var(--main-bgB-color)'});
				$('.desc').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgW-color)'});
				$('.TagsV').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgW-color)'});
			}
			
		});

});}myClick();
function SubscribeYoutube(){
		$('body').addClass('stop-scrolling')
		dialog.style.display="block";
		dialog.innerHTML=`
		<p class="DialogTitle TextDialog"> Leave Page </p>
		<p class="DialogMessage TextDialog"> Do you want to go to Youtube ?</p>
		<a href="${LinkChannel}?sub_confirmation=1" style="pointer-events: painted;">
			<button class="OK Button"onclick="dialog.style.display='none';$('body').removeClass('stop-scrolling')";>Yes </button>
		</a>
		<button class="Cancel Button" onclick="dialog.style.display='none';$('body').removeClass('stop-scrolling');" style="pointer-events: painted;"> No </button>
		`;

}
var BackGround=localStorage.getItem('bg'),
	gotoYtb=document.querySelector('.gotoYtb'),
	desc1=document.querySelector('.desc'),
	top_com=document.querySelector('.top_comment');
	myArray=document.querySelectorAll('.Arry');
if (BackGround ==='' || BackGround==='white' || BackGround ===undefined || BackGround ===null) {
		Container.style.background = 'var(--main-bgW-color)';
		Container.style.color = 'var(--main-bgB-color)';
		gotoYtb.style.background = 'var(--main-bgB-color)';
		desc1.style.background = 'var(--main-bgB-color)';
		desc1.style.color = 'var(--main-bgW-color)';
		top_com.style.background = '#f1f1f1';
		for(var i = 0; i < myArray.length ; i++){
				myArray[i].style.background = 'var(--main-bgB-color)';
				myArray[i].style.color = 'var(--main-bgW-color)';
			}
} else if (BackGround ==='dark'){
		Container.style.background = 'var(--main-bgB-color)';
		Container.style.color = 'var(--main-bgW-color)';
		gotoYtb.style.background = 'var(--main-bgW-color)';
		desc1.style.background = 'var(--main-bgW-color)';
		desc1.style.color = 'var(--main-bgB-color)';
		top_com.style.background = '#383838';
		for(var i = 0; i < myArray.length ; i++){
				myArray[i].style.background = 'var(--main-bgW-color)';
				myArray[i].style.color = 'var(--main-bgB-color)';
			}
	}
// get photo profile tochannel
 function GetThumbnailChnnel() {
 		var urlReq='https://www.googleapis.com/youtube/v3/channels?part=snippet&id='+ chaLinInfo +'&key=AIzaSyBeP7xWS7fAr0-PpgaTPfuk4VXtBNKMm2g',
 		req=new Request(urlReq),
 		results,
 		myItems;
 		fetch(req).then(function(res){
 			results=res.json();
 			results.then(result=>{
 				myItems=result.items[0];
 			var ChannelDesc=myItems.snippet.description,
 				ChannelCtry=myItems.snippet.country,
 				publishChan=myItems.snippet.publishedAt.substr(0,10),
 				imgprofile=myItems.snippet.thumbnails.high.url,
 				_ChanelName="",
 				_ChanelDesc="",
 				_ChanelCtry="",
 			    divInfo=document.createElement('div');
 				divInfo.setAttribute('class',"InfoChannel");
 				// 
				if (ChannelDesc==undefined || ChannelDesc==null|| ChannelDesc=='') {
 						_ChanelDesc='No Description for this Channel '
 				} else {
 						_ChanelDesc=ChannelDesc;
 				}
 				if (ChannelCtry==undefined || ChannelCtry==null|| ChannelCtry=='') {
 						_ChanelCtry='Unknown Location'
 				} else {
 						_ChanelCtry=ChannelCtry;
 				}
 				// 
 					divInfo.innerHTML=`
	     			<a href="${LinkChannel}" target="blink" title="${nameChannel}">
	     			<h4 class="Channel_Name">
	     				<img src="${imgprofile}"class="img_pro_chan"/>
	     				<span class="nameChannel1">${nameChannel}</span>
	     			</h4>
	     			</a>
	     			<p class="Channel_Desc">
	     				<span class="word_disc chanInf"> ${descChn}  </span>
	     				<pan class="_ChanelDesc">${_ChanelDesc}</span>
	     			</p>
	     			<span class="Channel_Ctry">
	     				<span class="word_ctry chanInf"> ${Location}  </span>
	     				<span class='country'>${_ChanelCtry}</span>
	     			</span>
	     				<br/>
	     			<span class="Channel_pub">
	     				<span class="word_join chanInf"> ${Joined}  </span>
	     				<span class='joined'>${publishChan}</span>
	     			</span>
	     		`;
	     		infoV.appendChild(divInfo);
 			})

 		})
 }
 GetThumbnailChnnel();
}
} catch(err) {
		console.log(err);
	}
