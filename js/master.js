var sURL = "https://api.instagram.com/v1/users/self/media/recent/?count=4&access_token=7640512853.a95ebde.5047c855f9f54935a53a70c9ea651c24";
		//var sURL = "https://api.instagram.com/v1/users/self/media/recent/?count=4&access_token=1762250453.2149165.58f3208c90c94d4e94056a5a290d56bc";
var inf = {"datos" : []};
var i = 0;var x = 0;var lng = 0; var iDatos = 0;
var iGlobal = 0;

function traeDatos(link){
	$("#verMas").css("display", "none");
	$.ajax({
		method : "GET",
		url    : link,
		async  : false
	}).done(function(data){

		var lng = data.data.length;
		i=0;

		do{
			var id = data.data[i].id;
			var urlImg = data.data[i].images.standard_resolution.url;
			var caption = ((data.data[i].caption != undefined || data.data[i].caption != null) ? data.data[i].caption.text : "");
	    	
	    	inf.datos.push({"sURL" : urlImg, "footer" : caption});
					
			$("#contCarousel").append("<div class=' gal carousel-item' id='_"+x+"'><img class='d-block w-100' src='"+urlImg+"' alt='Second slide'></div>");
			$("#contGaleria").append('<div class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-5 imagen p-0" id="'+id+'" onclick="ver('+x+')" data-target="#exampleModalCenter" data-toggle="modal"></div>');
			$("#"+id).css({"background-image":"url('"+urlImg+"')"});
			i += 1;
			x += 1;

		}while(i < lng);

		sURL = data.pagination.next_url;
		inf.sig = inf.sig = sURL

		$("#verMas").css("display", "block");
	    
	    if(lng < 4)
			$("#verMas").css("display", "none");
	})
}

function ver(p){
	iGlobal = p;
			
	$("#footer").text(inf.datos[p].footer);

	var lActivs = $(".gal");
		
		for(var j = 0; j < lActivs.length; j++)
		{
			if(lActivs[j].classList.contains("active"))
				break;
		}
		if(lActivs[j] != undefined){
			var id = lActivs[j].id;
		
		
		$('#'+id).removeClass("active");	
		}
		$('#_'+p).addClass("active");
}
		
function evalua(op){

 	iGlobal = ((op == 1) ? iGlobal + 1 : iGlobal -1);

 	if(iGlobal == -1){
		iGlobal = inf.datos.length-1;

		$("#footer").text(inf.datos[iGlobal].footer);
		//return;
	}
	


	if(inf.datos[iGlobal] == undefined || inf.datos[iGlobal] == null ){
		if(inf.sig != undefined)
			traeDatos(inf.sig);
		else
			iGlobal = 0;
	}

	$("#footer").text(inf.datos[iGlobal].footer);
}

$(document).ready(function(){
    
    $(".navbar-nav li").click(function(){
        $('.navbar-nav li.active').removeClass('active');
        $(this).addClass('active');
    });

    traeDatos(sURL);
		
})

