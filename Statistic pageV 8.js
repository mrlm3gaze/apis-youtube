try {
	var Container=document.querySelector('.content'),
		ErrorPage=document.querySelector('.error'),
		cadrComment =document.querySelector('.block'),
		noComment=document.querySelector('.noComment'),
		videoplayer =document.querySelector('.video'),
		SourceVideo=document.querySelector('#SourceVideo'),
		dialog =document.querySelector('.Dialog'),
		// info video title tags desc
		infoV=document.querySelector('.infoVedo'),
		TitleStatics=document.getElementById('title_statitic'),
		moreInfo=document.getElementById('more_info'),
		//slect comment order
 		OrderComment=document.querySelector('#OrderComment'),
 		_order="time",
 		//get data from locale storage 
 		GetData=JSON.parse(sessionStorage.getItem('trend_Data_?Vedio')),
 		// vars for lang
 		lg=localStorage.getItem('!Lan?gua_ge'),
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
		lgChanelDesc='',
 		lgChanelCtry='',
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
		if (lg==null||lg==''||lg==undefined||lg=='?:e')
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
				lgChanelDesc='No Description for this Channel ';
				lgChanelCtry='Unknown Location';
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
			else if(lg=='?:a')
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
				lgChanelDesc=' لا يوجد وصف للقناة ';
				lgChanelCtry='دولة غير معرفة ';
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

	 	var url=`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&moderationStatus=published&order=${_order}&textFormat=html&videoId=${urlV}&key=${apikey}`,
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
		 	    			    comm = articls[i].snippet.topLevelComment.snippet.textDisplay,
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
 }
// function get key from local storage 
function GetStorage(){
			for(var i = 0; i < myArray.length ; i++){
				if (tagsV == 'undefined' || tagsV == '') {
					array='No Tags ';
				} else {
					array +='<span class="Arry">' + ' @ ' + myArray[i] +'</span>';
				}
			moreInfo.innerHTML=`
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
						<div class="descText">${desc}</div>
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
			if (BackGround ==='' || BackGround==='0' || BackGround ===undefined || BackGround ===null)
			 {
				$(this).css({'background':'var(--main-bgB-color)','transition':'all 0.2s','color':'var(--main-bgW-color)'});
				$('.TagsV').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
				$('.infoCh').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
			} 
			else if (BackGround ==='1')
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
			if (BackGround ==='' || BackGround==='0' || BackGround ===undefined || BackGround ===null)
			 {
				$(this).css({'background':' var(--main-bgB-color)','transition':'all 0.2s','color':'var(--main-bgW-color)'});
				$('.desc').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
				$('.infoCh').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
			} 
			else if (BackGround ==='1') 
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
			if (BackGround ==='' || BackGround==='0' || BackGround ===undefined || BackGround ===null)
			 {
				$(this).css({'background':' var(--main-bgB-color)','transition':'all 0.2s','color':'var(--main-bgW-color)'});
				$('.desc').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
				$('.TagsV').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
			} 
			else if (BackGround ==='1') 
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
var BackGround=localStorage.getItem('!Bkg'),
	gotoYtb=document.querySelector('.gotoYtb'),
	desc1=document.querySelector('.desc'),
	top_com=document.querySelector('.top_comment');
	myArray=document.querySelectorAll('.Arry');
if (BackGround ==='' || BackGround==='0' || BackGround ===undefined || BackGround ===null) {
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
} else if (BackGround ==='1'){
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
 		var urlReq='https://www.googleapis.com/youtube/v3/channels?part=snippet&id='+ chaLinInfo +'&key='+ apikey,
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
 				_ChanelName="";
 			    divInfo=document.createElement('div');
 				divInfo.setAttribute('class',"InfoChannel");
 				// 
				if (ChannelDesc==undefined || ChannelDesc==null|| ChannelDesc=='') {
 						_ChanelDesc=lgChanelDesc;
 				} else {
 						_ChanelDesc=ChannelDesc;
 				}
 				if (ChannelCtry==undefined || ChannelCtry==null|| ChannelCtry=='') {
 						_ChanelCtry=lgChanelCtry;
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
	function getStaticVideo(){
 let staticUrl=`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${urlV}&key=${apikey}`,
			//create new object 
			xhr=new XMLHttpRequest(),
			responseData,items,positionText='beforeend',context,likes,dislikes,commentsCunter,views,
			newLikes,newDislikes,newComments,newViews;
		// request Data 
		xhr.onload=function(){
			if (this.status==200 &&this.readyState==4) {
				responseData=JSON.parse(this.response);
				items=responseData.items[0].statistics;
				//vaiables 
				likes=items.likeCount;
				dislikes=items.dislikeCount;
				commentsCunter=items.commentCount;
				views=items.viewCount;
				
				//fomat numbers
				newLikes=numberFomat(likes);
				newDislikes=numberFomat(dislikes);
				newViews=numberFomat(views);

				if (commentsCunter==undefined||commentsCunter==null ||commentsCunter=='0') {
					newComments='0';
				} else {
					newComments=numberFomat(commentsCunter);
				}				
				//progress likes
				var sum= parseInt(parseInt(likes)+parseInt(dislikes)); 
				var progressDisLikes=dislikes/sum * 100 +'%';
				var progressLikes=likes/sum * 100 +'%';
				context=`
					<p class="trendNumber"> # ${trendNumber + lgtrend}</p>
					<h3 class="title" title="${TitleV}"> ${TitleV} </h3>
					<div class='staticsVideo'>
						<span class='commentCount'>
							<i class="material-icons">comment</i>
							${newComments}
						</span>
						<div class="prog_likesdis-container">
							<div class='like_dislikes'>
								<span class='dislikeCount' title='${dislikes}'>
									<i class="material-icons">thumb_down_alt</i>
									${newDislikes}
								</span>
								<span class='likeCount' title='${likes}'>
									<i class="material-icons">thumb_up_alt</i>
									${newLikes}
								</span>
								</div>
							<div class='progLikes'>
								<div class='progresDislikes' style='width:${progressDisLikes}'></div>
								<div class='progresLikes' style='width:${progressLikes};left:${progressDisLikes}'></div>
							</div>
						</div>
						<span class='viewCount' title='${views}'>
							<i class="material-icons">visibility</i>
							${newViews}
						</span>
					</div>
				`;
				TitleStatics.insertAdjacentHTML(positionText,context);
			} else {
				context=`
					<p class="trendNumber"> # ${trendNumber + lgtrend}</p>
					<h3 class="title" title="${TitleV}"> ${TitleV} </h3>
				`;
				console.log('err');
				TitleStatics.insertAdjacentHTML(positionText,context);
			}
		}
		xhr.open('GET',staticUrl);
		xhr.send();		
	}
getStaticVideo();
//format Numbers
function numberFomat(number){
	if (number>=1000000000) {
		return (number/1000000000).toFixed(1).replace(/\.0$/,'') +'MD';
	} else if(number>=1000000){
		return (number/1000000).toFixed(1).replace(/\.0$/,'') +'M';
	}if(number>=1000){
		return (number/1000).toFixed(1).replace(/\.0$/,'') + 'K';
	}else{
		return number;
	}
}
} catch(err) {
		console.log(err)
	}
