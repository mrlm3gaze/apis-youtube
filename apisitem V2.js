var card   =document.querySelector('#index_tub'),
		select =document.querySelector(".slection"),
		card2  =document.querySelector("#res_top"),
		vscroll=document.querySelector('#top'),
		country ='MA',
		info='',
        a, i, txtValue,
	    input = document.getElementById("myInput"),
	    filter = input.value.toUpperCase(),
	    li = card.getElementsByTagName("li"),
	    slider = document.querySelector('.slider'),
		off_on = document.querySelector('.on'),
	    checkbox = document.querySelector('input[type="checkbox"]');
//added events listener 
document.addEventListener('load',getTube(country,info));
//added slect
select.addEventListener("change", changed);
//get changed
function changed(country,info){
	card.innerHTML ='';
	card2.innerHTML ='';
	getTube(select.options[select.selectedIndex].value,info);
	//change color 
	if (localStorage.getItem('bg')=='' ||localStorage.getItem('bg')==undefined||localStorage.getItem('bg')==null ) 
	{
		
		for (var i =0; i < li.length; i++){
			li[i].classList.remove('elments2')
			li[i].classList.add('elments');
			
		}
	} 
	else if(localStorage.getItem('bg')=='dark' )
	{
		for (var i =0; i<li.length ; i++ ) {
			li[i].classList.add('elments2')
			li[i].classList.remove('elments');
		}
	}
	else if(localStorage.getItem('bg')=='white' )
	{
		for (var i =0; i < li.length; i++){
			li[i].classList.remove('elments2')
			li[i].classList.add('elments');
		}
	}
}
//get tube maroc
function getTube(country,info){
	var url=`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostpopular&regionCode=${country}&maxResults=50&key=AIzaSyBeP7xWS7fAr0-PpgaTPfuk4VXtBNKMm2g`;
	var req = new Request(url);
	var results;
	var articls;
	var UrlYoutube;
	fetch(req)
	    .then(function(response) {
	    	results =response.json();
	     	results.then( result => {
	     		articls=result.items;
	    		for (var i = 0; i < articls.length ; i++) {
	    			// cahnge color 
	    			if (localStorage.getItem('bg')=='' ||localStorage.getItem('bg')==undefined||localStorage.getItem('bg')==null ) 
						{

							for (var i =0; i < li.length; i++){
								li[i].classList.remove('elments2')
								li[i].classList.add('elments');
							}

						} 
						else if(localStorage.getItem('bg')=='dark' )
						{
							for (var i =0; i<li.length ; i++ ) {
								li[i].classList.add('elments2')
								li[i].classList.remove('elments');
							}	
						}
						else if(localStorage.getItem('bg')=='white' )
						{
							for (var i =0; i < li.length; i++){
								li[i].classList.remove('elments2')
								li[i].classList.add('elments');
							}
						}
	    				// create element li
	     			var DIV=document.createElement('li'),
	     				// date
	     			    dateSource=articls[i].snippet.publishedAt,
	     			    date  = dateSource.slice(0, 10) +" | " + dateSource.slice(11,16) ,
	     			    // title video
	     			    title = articls[i].snippet.title,
	     				title1 = title.replace(/['"]/gi, 'mrlm3gaze'),
	     				title2=encodeURIComponent(title1),
	     				// title channel
	     				Ctle  = (articls[i].snippet.channelTitle).slice(0,30),
	     				NmChOr=articls[i].snippet.channelTitle.replace(/["']/gi,'mrlm3gaze'),
	     				NmCh  =encodeURIComponent(NmChOr),
						//  link channel
						ChaLin=articls[i].snippet.channelId.replace(/["']/gi,'mrlm3gaze'),
						linCod=encodeURIComponent(ChaLin);
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
	     			//image onerror 
	     				if (articls[i].snippet.thumbnails.high.url.onerror) {
	     					imageUrl="https://kbem-recast.streamguys1.com/vendor/sgrecast/img/image-placeholder.png";
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
	     						 	 desc='☻لا يوجد وصف لهذا الفيديو ';
	     						 	 desc2=encodeURIComponent(desc);
	     						 }else {
	     						 	desc=articls[i].snippet.description;
	     						 	desc2=encodeURIComponent(desc).replace(/['"]/gi,'mrlm3gaze');
	     						 }
	     				}
	     			DIV.setAttribute('class',"elments")
	     			DIV.setAttribute('id',`myElem${i+1}`)
	     			DIV.innerHTML=`
	     			   		<div class="num_tend">${i+1} </div>
							<a href="/p/pageview.html" 
					onclick="localStorage.setItem('url','${articls[i].id}')
					localStorage.setItem('Title','${title2}');localStorage.setItem('tags','${tags}');localStorage.setItem('date','${date}');localStorage.setItem('desc','${desc2}');localStorage.setItem('nameChannel','${NmCh}');localStorage.setItem('LinkChannel','${linCod}');" target="_blink" >
								<h3 class="title_element" title="${title}">${title}</h3>
							</a>
							<div class="Name_Chan">
								<a href="https://www.youtube.com/channel/${articls[i].snippet.channelId}" target="_blink"><i class="material-icons">account_circle</i><strong class="name_c" title="${Ctle}">${Ctle}</strong>
								</a>
							</div>
							<a href="/p/pageview.html" 
					onclick="localStorage.setItem('url','${articls[i].id}')
					localStorage.setItem('Title','${title2}');localStorage.setItem('tags','${tags}');localStorage.setItem('date','${date}');localStorage.setItem('desc','${desc2}');localStorage.setItem('nameChannel','${NmCh}');localStorage.setItem('LinkChannel','${linCod}');" target="_blink" title="${title}">
								<div class="img_i">
									<span class="play"><i class="material-icons">play_circle_outline</i></span>
									<img src="${imageUrl}" class="img" alt="${title}"/>
								</a>
									<span class="pub">${date}</span>
									<div class="desc_p">
										<p class="desc">وصف الفيديو </p>
										<p class="para"> ${desc}</p>
									</div>
					      		</div>
					<a class="link" title="${title}" target="_blink" href="/p/pageview.html" 
					onclick="localStorage.setItem('url','${articls[i].id}')
					localStorage.setItem('Title','${title2}');localStorage.setItem('tags','${tags}');localStorage.setItem('date','${date}');localStorage.setItem('desc','${desc2}');localStorage.setItem('nameChannel','${NmCh}');localStorage.setItem('LinkChannel','${linCod}');">مشاهدة الفيديو  </a>
	     			`;
	    			card.appendChild(DIV);
	    		}
	    		
	    		if (info === undefined) {
	    			info='0';
	    		} else {
	    			info  = articls.length;
	    		}
	     	    var	SPAN= document.createElement('span');
	     		SPAN.innerHTML=`
	    			<span class="res"> النتائج  : ${info}</span>`;
	    			card2.appendChild(SPAN);
	     	})
	        
	    });
}
function myFunction() {
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
// change color 
	  checkbox.addEventListener('change', function () {
	    if (checkbox.checked) {
	    	localStorage.setItem('bg','dark')
			
			for (var i =0; i<li.length ; i++ ) {
				li[i].classList.add('elments2');
				li[i].classList.remove('elments');

			}
			// 
			slider.style.background = '#000';
			off_on.classList.add('on');
			off_on.classList.remove('off');
	      	
	    } else {
	    	localStorage.setItem('bg','white')
			for (var i =0; i < li.length; i++){
				li[i].classList.remove('elments2');
				li[i].classList.add('elments');
			}
			slider.style.background = '#ccc';
			off_on.classList.add('off');
			off_on.classList.remove('on');
	    }
	  });
	  // change color 
window.onload = function GetBg() {
	if (localStorage.getItem('bg')=='' ||localStorage.getItem('bg')==undefined||localStorage.getItem('bg')==null ) 
	{
		for (var i =0; i < li.length; i++){
			li[i].classList.remove('elments2')
			li[i].classList.add('elments');
			
		}
		slider.style.background = '#ccc';
		off_on.classList.add('off');
		off_on.classList.remove('on');
	} 
	else if(localStorage.getItem('bg')=='dark' )
	{
		for (var i =0; i<li.length ; i++ ) {
			li[i].classList.add('elments2')
			li[i].classList.remove('elments');

		}
		slider.style.background = '#000';
		off_on.classList.add('on');
		off_on.classList.remove('off');
		checkbox.checked=true;
	}
	else if(localStorage.getItem('bg')=='white' )
	{
		for (var i =0; i < li.length; i++){
			li[i].classList.remove('elments2')
			li[i].classList.add('elments');
		}
		
		slider.style.background = '#ccc';
		off_on.classList.add('off');
		off_on.classList.remove('on');
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
