let ul = document.getElementById("index_tub"),
    	li = ul.getElementsByTagName("li"),
		vscroll=document.querySelector('#top'),
		switchMode=document.querySelector('.switchM'),
		innerNightM=document.querySelector('.NightM'),
		input = document.getElementById("myInput"),
    	nightMode=0,
		select =document.querySelector(".slection"),
		lang=document.getElementById('lang'),
		opt=lang.getElementsByTagName('option'),
		search=document.querySelector(".search"),
		country ='MA',
		info='',
		listItem=[],
		pos='beforeend',
		text,position=0,
		// vars lang
	    lg=localStorage.getItem('lg'),
	    lgWv='',
	    lgDsW='',
	    lgNds='',
	    tren=document.querySelector('.title'),
	    lgWlg=document.getElementById('word_lang'),
	    Style=document.createElement('style');
	    Style.setAttribute('type','text/css')
	     if (lg==null || lg==undefined || lg=='' || lg=='en') {
	     		opt[0].setAttribute("selected","0");
	     		opt[0].textContent='English';
	     		opt[1].textContent='Arabic';
	     		input.setAttribute('placeholder','Search');
	     		lgWlg.textContent='Language : ';
	     		tren.textContent='Tranding in : ';
	     		lgWv='Whatch Video';
	     		lgDsW='Description';
	     		lgNds='No Description ☻';
	     		// new style
	     		Style.innerHTML=`
	     			/*=======top=======*/
	     			.top > p,.slection,.top_res,.language,.word_lang {float: left;}
	     			#lang{direction: ltr;}
	     			.other_btn{float:right}
	     			/*====add by js======*/ 
	     			.img_i:hover .pub {right: 2px;}
	     			.pub{right:-100px}
	     			/**/
	     		`
	     } else if(lg=='ar'){
	     		opt[1].setAttribute("selected","1");
	     		opt[0].textContent='الانجلزية ';
	     		opt[1].textContent='العربية ';
	     		input.setAttribute('placeholder','بحث ');
	     		lgWlg.innerHTML='اللغة  : ';
	     		tren.textContent='المحتوى الرائج في : ';
	     		lgWv='مشاهدة الفيديو ';
	     		lgDsW=' الوصف ';
	     		lgNds='لايوجد وصف للفيديو  ☻';

	     		// new style
	     		Style.innerHTML=`
	     			/*=======top=======*/
	     			.top > p,.slection,.top_res,.language,.word_lang {float: right;}
	     			#lang{direction: rtl;}
	     			.other_btn{float:left}
	     			/*====add by js======*/ 
	     			.img_i:hover .pub {left: 2px;}
	     			.pub{left:-100px}
	     		`
	     }
document.getElementsByTagName("head")[0].appendChild(Style);
//added events listener 
document.addEventListener('load',getTube(country,info));
//added slect
select.addEventListener("change", changed);
// change country
function changed(country,info){
	ul.innerHTML ='';
	getTube(select.options[select.selectedIndex].value,info);
}
//get tube maroc
function getTube(country,info){
	var url=`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostpopular&regionCode=${country}&maxResults=50&key=AIzaSyBeP7xWS7fAr0-PpgaTPfuk4VXtBNKMm2g`,
	    req = new Request(url),
	    results,
	    articls,
	    UrlYoutube;
	fetch(req)
	    .then(function(response) {
	    	results =response.json();
	     	results.then( result => {
	     		articls=result.items;
	    		for (var i = 0; i < articls.length ; i++) {
	    				// create element li
	     			var DIV=document.createElement('li'),
	     				// date
	     			    dateSource=articls[i].snippet.publishedAt,
	     			    date  = dateSource.slice(0, 10) +" | " + dateSource.slice(11,16) ,
	     			    // title video
	     			    title = articls[i].snippet.title,
	     			    subTitle='',
	     				title1 = title.replace(/['"]/gi, 'mrlm3gaze'),
	     				title2=encodeURIComponent(title1),
	     				// title channel
	     				Ctle  = (articls[i].snippet.channelTitle).slice(0,30),
	     				NmChOr=articls[i].snippet.channelTitle.replace(/["']/gi,'mrlm3gaze'),
	     				NmCh  =encodeURIComponent(NmChOr),
						//  link channel
						ChaLin=articls[i].snippet.channelId.replace(/["']/gi,'mrlm3gaze'),
						linCod=encodeURIComponent(ChaLin),
	     				// tags
						tagsOr= articls[i].snippet.tags,
						tags=encodeURIComponent(tagsOr).replace(/["']/gi,'mrlm3gaze'),
	     				// info for ruselts
	     				info  = articls.length,
	     				// description
	     				desc  = '',
	     				desc2='',
	     				// thumbnails video
	     				imageUrl='';
					//if else
					// title
	     			if (articls[i].snippet.title.length > 60 ) {
	     					subTitle=title.substring(0, 60) + '...';
	     			} else {
	     					subTitle=title;
	     			}
	     			//image onerror 
	     				if (articls[i].snippet.thumbnails.high.url.onerror) {
	     					imageUrl="https://lh3.googleusercontent.com/-cqHslEVUe_c/XhJ1b0b5XLI/AAAAAAAADEo/hTcTlKdq5jgaH-DRm3fwsPUvZGOoV4S3ACEwYBhgL/h120/image-placeholder.png";
	     				}else{
	     					imageUrl=articls[i].snippet.thumbnails.high.url;
	     				}
	     			//descreption lenght > 200 char
	     				if ((articls[i].snippet.description).length > 300) {
	     						desc= (articls[i].snippet.description).substring(0, 300) + ' ...';
	     						desc2=encodeURIComponent(articls[i].snippet.description).replace(/['"]/gi,'mrlm3gaze');
	     				}else{
	     					    desc= articls[i].snippet.description;
	     					    var desc2=encodeURIComponent(desc).replace(/['"]/gi,'mrlm3gaze');
	     					    if (desc==="") {
	     						 	 desc=lgNds;
	     						 	 desc2=encodeURIComponent(desc);
	     						 }else {
	     						 	desc=articls[i].snippet.description;
	     						 	desc2=encodeURIComponent(desc).replace(/['"]/gi,'mrlm3gaze');
	     						 }
	     				}
	     				 text=`
	     				<li class="elments" id="${position}">
	     			   		<div class="num_tend"> ${i+1} </div>
							<a href="/p/pageview.html" title="${title}">
								<h3 class="title_element" id="${position}">${subTitle}</h3>
							</a>
							<div class="Name_Chan">
								<a href="https://www.youtube.com/channel/${articls[i].snippet.channelId}" target="_blink"><i class="material-icons">account_circle</i><strong class="name_c" title="${Ctle}">${Ctle}</strong>
								</a>
							</div>
							<a href="/p/pageview.html" id="${position}" title="${title}">
								<div class="img_i">
									<span class="play" id="${position}">
									  <i class="material-icons" id="${position}">play_circle_outline</i>
									  </span>
									<img src="${imageUrl}" class="img" alt="${title}" id="${position}"/>
								</a>
									<span class="pub"> ${date} </span>
									<div class="desc_p">
										<p class="desc"> ${lgDsW} </p>
										<p class="para"> ${desc}</p>
									</div>
					      		</div>
							<a class="link" href="/p/pageview.html" id="${position}" title="${title}"> ${lgWv} </a>
						</li>
	     			`;
	     			ul.insertAdjacentHTML(pos,text);
	    			position++;
      				listItem.push({'url':articls[i].id, 'Title':title2, 'tags':tags, 'date':date, 'desc':desc2, 'nameChannel':NmCh, 'LinkChannel':linCod, 'trend':i+1});
	    		}
	    		
	    		if (info === undefined) {
	    			info='0';
	    		} else {
	    			info  = articls.length;
	    		}

	     	})
	        
	    });
}
// slect Element and add local Storage 
ul.onclick = function ClickItem(event){
 	var Elemnent=event.target,
 		Item = Elemnent.getAttribute('id');
 		try {
	 		let url=listItem[Item].url,
	 			Title=listItem[Item].Title,
	 			tags=listItem[Item].tags,
	 			date=listItem[Item].date,
	 			desc=listItem[Item].desc,
	 			nameChannel=listItem[Item].nameChannel,
	 			LinkChannel=listItem[Item].LinkChannel,
	 			trend=listItem[Item].trend,

	 			obj={url:url, Title:Title, tags:tags, date:date, desc:desc, nameChannel:nameChannel, LinkChannel:LinkChannel, trend:trend};

	 			sessionStorage.setItem('myData',JSON.stringify(obj));

 		} catch(err){
 				console.log(err);
 		}
}
// serch
function myFunction() {
    var  filter, a, txtValue;
 
    filter = input.value.toUpperCase();
    for (var i = 0; i < li.length; i++) {
        a = li[i];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";

        } else {
            li[i].style.display = "none";
        }
    }
}
// scroll
$( window ).on('scroll',function() {
	if ($(window).scrollTop()>=150) {
		vscroll.style.position = 'fixed';
	} else {
		vscroll.style.position = 'relative';
	}
})
// change color 
switchMode.addEventListener("click", function(){
	nightMode++
if (nightMode==1) 
	{	
		localStorage.setItem('bg','dark')
		ul.style.background = '#1f1f1f';
		ul.style.color = '#c5c5c5';
		vscroll.style.background = '#292929'; 
		vscroll.style.color = '#fff';
		innerNightM.innerHTML='brightness_5';
		return nightMode == 2;
	} 
else if (nightMode==2)
{
	localStorage.setItem('bg','white')
	ul.style.background = '#f9f9f9';
	ul.style.color = '#484242';
	vscroll.style.background = '#fff'; 
	vscroll.style.color = '#484242';
	innerNightM.innerHTML='brightness_4';
	return nightMode=0;
}
});
// get background
window.onload = function GetBg() {
	if (localStorage.getItem('bg')=='' ||localStorage.getItem('bg')==undefined||localStorage.getItem('bg')==null || localStorage.getItem('bg')=='white') 
	{
		ul.style.background = '#f9f9f9';
		ul.style.color = '#484242';
		vscroll.style.background = '#fff'; 
		vscroll.style.color = '#484242';
		innerNightM.innerHTML='brightness_4';
		nightMode=0;

	} 
	else if(localStorage.getItem('bg')=='dark' )
	{
		ul.style.background = '#1f1f1f';
		ul.style.color = '#c5c5c5';
		vscroll.style.background = '#292929'; 
		vscroll.style.color = '#fff';
		innerNightM.innerHTML='brightness_5';
		nightMode=1;
	}
}
//lang
lang.addEventListener('change', ChangeLang)
function ChangeLang(){
	location.reload();
	if (lang.value=='en' || lang.value=='') {
		localStorage.setItem('lg',"en");
	} else if(lang.value=='ar'){
		localStorage.setItem('lg',"ar");
	}	
}
