
var sURL = "https://api.instagram.com/v1/users/self/media/recent/?count=4&access_token=1762250453.2149165.58f3208c90c94d4e94056a5a290d56bc";

function getMedia(URL)
{
	$.ajax({
		method : "GET",
		url    : URL
	}).done(function(data){
		var iMax = 0;
		var len = data.data.length; 

		for(var i = 0; i < len; i ++)
		{
			var imgH = data.data[i].images.standard_resolution.height;
	
			var resize = ((imgH * 46.33) / 100);
			resize = resize.toFixed(1);

			if(resize > iMax)
				iMax = resize;
	
			var faltante = ((resize - iMax) * -1);
		}
			
		var id = data.pagination.next_max_id;
		$("#contGaleria").append('<div class="col-xs-12" id="cont_' + id + '"></div>');

		for(var i=0; i < len; i++)
		{
			var url = data.data[i].images.standard_resolution.url;
			var imgH = data.data[i].images.standard_resolution.height;
			var tipo = data.data[i].type;
				
			var resize = ((imgH * 46.33) / 100);
			resize = resize.toFixed(1);

			var img = ((tipo == "video") ? "<a href='" + data.data[i].link + "'><img src='assets/images/icons/play.png' class='img-responsive play' /><img class='img-responsive'" + tipo + "' src='" + url + "'/></a>" : "<img class='img-responsive' src='" + url + "'/>")
			if(resize < iMax)
			{
				var faltante = ((resize - iMax) * -1) / 2;
				img = '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-3 contImg" style="padding-top:' + faltante + 'px; padding-bottom:' + faltante + 'px;" > ' + img + '</div>';
			}
			else
				img = '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-3 contImg"> ' + img + ' </div>';

			$("#cont_"+id).append(img);
		}
			if(data.data.length < 4)
				$("#loadMore").remove();

			sURL = data.pagination.next_url;
		})
}

$(document).ready(function(){
    
    $(".navbar-nav li").click(function(){
        $('.navbar-nav li.active').removeClass('active');
        $(this).addClass('active');
    })

    getMedia(sURL);
})

