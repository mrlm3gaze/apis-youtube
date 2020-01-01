var Container=document.querySelector('.content'),
		ErrorPage=document.querySelector('.error')
		cadrComment =document.querySelector('.block'),
		videoplayer =document.querySelector('.video'),
		SourceVdeo=document.querySelector('#SourceVideo'),
		dialog =document.querySelector('.Dialog'),
		// info video title tags desc
		infoV=document.querySelector('.infoVedo'),
		//slect comment order
 		OrderComment=document.querySelector('#OrderComment'),
 		_order="time",
	 	// url video
 		urlV=localStorage.getItem('url'),
 		urlYTB='https://www.youtube.com/watch?v=';
 	// 

if (urlV=='' || urlV == undefined || urlV==null) {
	Container.style.display = 'none';
	ErrorPage.style.display='block';
} else {
	//Container Visible
	Container.style.display = 'inline-flex';
	ErrorPage.style.display='none';
	//variables 
	// Title video
 	var	TitleVO=localStorage.getItem('Title').replace(/mrlm3gaze/gi,"\'"),
 		TitleV=decodeURIComponent(TitleVO),
 		//channel name 
 		ch=localStorage.getItem('nameChannel').replace(/mrlm3gaze/gi,"\'"),
 		nameChannel=decodeURIComponent(ch),
		//channel name 
		urlChannel='https://www.youtube.com/channel/',
		LinkChannel=urlChannel + localStorage.getItem('LinkChannel').replace(/mrlm3gaze/gi,"\'"),
 		// tags
		tagsV=localStorage.getItem('tags').replace(/mrlm3gaze/gi,"\'"),
		TagsV=decodeURIComponent(tagsV),
		myArray=TagsV.split(','),
		array ="",
 		// description video
 		dscrptn=localStorage.getItem('desc').replace(/mrlm3gaze/gi,"\'"),
 		desc=decodeURIComponent(dscrptn),
 		// date upload video
 		dateV=localStorage.getItem('date');
 		document.title=TitleV;

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
	 	var url=`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&moderationStatus=published&order=${_order}&textFormat=plainText&videoId=${urlV}&key=AIzaSyBeP7xWS7fAr0-PpgaTPfuk4VXtBNKMm2g`,
	 	    req = new Request(url),
	 	    results,
	 	    articls;
	 	   
	 // if else
	
 	  // fetch 
	 	fetch(req)
	 	    .then(function(response) {
	 	    	results =response.json();
	 	     	results.then( result => {
	 	     		articls=result.items;
	 	    		for (var i = 0; i < articls.length ; i++) {
	 	    			var name = articls[i].snippet.topLevelComment.snippet.authorDisplayName,
	 	    			    prof1= articls[i].snippet.topLevelComment.snippet.authorProfileImageUrl,
							prof = '',
	 	    			    auth = articls[i].snippet.topLevelComment.snippet.authorChannelUrl,
	 	    			    comm = articls[i].snippet.topLevelComment.snippet.textDisplay,
	 	    			    like = articls[i].snippet.topLevelComment.snippet.likeCount,
	 	    			    date = (articls[i].snippet.topLevelComment.snippet.publishedAt).slice(0,10),
	 	    			    time = (articls[i].snippet.topLevelComment.snippet.publishedAt).slice(11,16),
	 	    			    divsion=document.createElement('div');
	 	    			    divsion.setAttribute('class', 'comment_container');
							//  if images are loaded
							 if (prof1.onerror) {
								     prof='http://viegenpharma.com/wp-content/uploads/2019/01/NoImageFound.png';
							 } else {
								if (prof1.onload) {
									 prof='https://cdn.vox-cdn.com/thumbor/ZxmV_ghHBzcQmbkEJSiENqSappQ=/0x0:867x617/1200x800/filters:focal(364x239:502x377)/cdn.vox-cdn.com/uploads/chorus_image/image/63701260/loadingicon.0.1487188944.0.jpg';
								} else {
									 prof=prof1
								}
							 }
							//add div 	
								divsion.innerHTML=`
										<a href="${auth}" class='profile_User' title="${name}">
											<img src="${prof}" class="profile" />
											<h4 class="name">${name}</h4>
										</a>
										<p class="commentTex">${comm} </p>
										<div class="likes_time">
											<p class="date">${date + ' # ' + time}</p>
											<div class='likes' title="Number Likes ${like}">
											<i class="material-icons">favorite</i>
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


			for(var i = 0; i < myArray.length ; i++){
				if (localStorage.getItem('tags') == 'undefined' || localStorage.getItem('tags') == '') {
					array='لا توجد علامات ';
				} else {
					array +='<span class="Arry">' + '@' + myArray[i] +'</span>';
				}
			infoV.innerHTML=`
					<h3 class="title" title="${TitleV}"> ${TitleV} </h3>
					<div class="NameChannel">
						<a href="${LinkChannel}" class="linkchannel" target='blink' title="${nameChannel}">
							<i class="material-icons">account_circle</i> 
							<span> ${nameChannel} </span>
						</a>
						<a class="gotoYtb" href="${urlYTB + urlV}" title="${TitleV}" target="blink"> Watch In Youtube </a>
						<span onclick="SubscribeYoutube();" class="Subscribe" title="${nameChannel}"> Subscribe </span>
					</div>
					<div class="description">
						<div class="descTitle">
						   <span class="desc" onclick="myClick();">Decription</span>
						   <span class="TagsV" onclick="myClick();">Tags</span>
						   <span class="dateV">${dateV}</span>
						</div>	
						<div class="TagsTxt">${array}</div>
						<div class="DiscTxt">${desc}</div>
					</div>
		`;
	  }
}
// tags and desc toggle
function myClick(){
$( document ).ready(function() {
		$('.desc').click(function () {
			$('.DiscTxt').show(200);
			$('.TagsTxt').hide(200);
			// check mode night 
			if (BackGround ==='' || BackGround==='white' || BackGround ===undefined)
			 {
				$(this).css({'background':'var(--main-bgB-color)','transition':'all 0.2s','color':'var(--main-bgW-color)'});
				$('.TagsV').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
			} 
			else if (BackGround ==='dark')
			{
				$(this).css({'background':'var(--main-bgW-color)','transition':'all 0.2s','color':'var(--main-bgB-color)'});
				$('.TagsV').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgW-color)'});
			}
			
		});
		$('.TagsV').click(function () {
			$('.TagsTxt').show(200);
			$('.DiscTxt').hide(200);
			// check mode night 
			if (BackGround ==='' || BackGround==='white' || BackGround ===undefined)
			 {
				$(this).css({'background':' var(--main-bgB-color)','transition':'all 0.2s','color':'var(--main-bgW-color)'});
				$('.desc').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgB-color)'});
				for(var k=0; k < Arry.length; k++){
						Arry[k].style.background = 'var(--main-bgB-color)';
						Arry[k].style.color = 'var(--main-bgW-color)';
					}

			} 
			else if (BackGround ==='dark') 
			{
				$(this).css({'background':' var(--main-bgW-color)','transition':'all 0.2s','color':'var(--main-bgB-color)'});
				$('.desc').css({'background':'transparent','transition':'all 0.2s','color':'var(--main-bgW-color)'});
				for(var k=0; k < Arry.length; k++){
						Arry[k].style.background ='var(--main-bgW-color)';
						Arry[k].style.color = 'var(--main-bgB-color)';
					}
			}
			
		});

});}myClick();
function SubscribeYoutube(){
	$('body').addClass('stop-scrolling')
	dialog.style.display="block";
	dialog.innerHTML=`
	<p class="DialogTitle TextDialog">مغادرة الصفحة</p>
	<p class="DialogMessage TextDialog"> هل تود المتابعة لليوتيب ؟</p>
	<a href="${LinkChannel}?sub_confirmation=1" style="pointer-events: painted;">
		<button class="OK Button"onclick="dialog.style.display='none';$('body').removeClass('stop-scrolling')";>نعم </button>
	</a>
	<button class="Cancel Button" onclick="dialog.style.display='none';$('body').removeClass('stop-scrolling');" style="pointer-events: painted;">لا </button>
	`;

}
var BackGround=localStorage.getItem('bg'),
	gotoYtb=document.querySelector('.gotoYtb'),
	desc=document.querySelector('.desc'),
	Arry=document.querySelector('.Arry');
if (BackGround ==='' || BackGround==='white' || BackGround ===undefined) {
		Container.style.background = 'var(--main-bgW-color)';
		Container.style.color = 'var(--main-bgB-color)';
		gotoYtb.style.background = 'var(--main-bgB-color)';
		desc.style.background = 'var(--main-bgB-color)';
		desc.style.color = 'var(--main-bgW-color)';
		for(var k=0; k < Arry.length; k++){
			Arry[k].style.background = 'var(--main-bgB-color)';
			Arry[k].style.color = 'var(--main-bgW-color)';
		}
} else if (BackGround ==='dark'){
		Container.style.background = 'var(--main-bgB-color)';
		Container.style.color = 'var(--main-bgW-color)';
		gotoYtb.style.background = 'var(--main-bgW-color)';
		desc.style.background = 'var(--main-bgW-color)';
		desc.style.color = 'var(--main-bgB-color)';
		for(var k=0; k < Arry.length; k++){
			Arry[k].style.background ='var(--main-bgW-color)';
			Arry[k].style.color = 'var(--main-bgB-color)';
		}
}
}
