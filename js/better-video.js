/**
 * Better Video and playlist jQuery plugin - improving the current html5 video player and adding a playlist
 * More info https://garridodiaz.com/html5-playlist-video-player/
 */
jQuery(document).ready(function( $ ) {
    
    //when we pause we store the current time
    $("video").on("pause", function(event) {
        // Save into local storage,if you change the browser will not work
        localStorage.setItem('bvideo-'+btoa(this.src), this.currentTime);

        //ajax call
        $.post(my_ajax_obj.ajax_url, {         //POST request
            _ajax_nonce: my_ajax_obj.nonce,     //nonce
            action: "store_video_time",            //action
            time: this.currentTime,                  //time
            video: this.src,                    //video url
            }
        );

    });

    //if you close the window and video playing store the current time
    $(window).on("unload", function(e) {
        $("video").each(function(index, value) {
            if ( ! this.paused ) {
                this.pause();
            }
        });
    });

    // first time the force time happens
    var first_time = true;

    //play video restores the video from the last point or from the query string using ?t=444
    $("video").on("play", function(event) {

        //only load the stored time the first time.
        if (first_time==true)
        {
            first_time = false;
            //using time provided via url only once!!
            var start_time = new URLSearchParams(window.location.search).get('t');
            var start_video = new URLSearchParams(window.location.search).get('start_video');

            if ( (start_time!==null && $.isNumeric(start_time)) &&  (start_video!==null && $.isNumeric(start_video)) ){
                if (start_time < this.duration) 
                    this.currentTime = start_time;
            }
            else{//init video at last stored time
                
                //first retrieve from localstorage
                var storedtime = localStorage.getItem('bvideo-'+btoa(this.src));
     
                //only ajax if storedtime is empty, saves queries
                if (storedtime == null){
                    var video_obj = this;
                    //ajax call
                    $.post(my_ajax_obj.ajax_url, {         //POST request
                        _ajax_nonce: my_ajax_obj.nonce,     //nonce
                        action: "get_video_time",            //action
                        video: this.src,                    //video url
                        },function(data) {                    //callback
                            if (data[0] < video_obj.duration) 
                                video_obj.currentTime = data[0];
                        }
                    );
                }
                // Get the time from localStorage and play if not at the end.
                else if (storedtime < this.duration){ 
                    this.currentTime = storedtime;
                }
            }
        }//end if first time

        this.play();
    });   

    /**
     * Playlist player for 1 video HTML tag
     */
    
    if ($('#bvideo_playlist').length )
    {
        var video_list = [];
        var current_url = btoa(window.location.href.split('?')[0].split('#')[0]);

        // 1st way to load the playlist comes from a plylist JS array
        if (typeof directLinkData !== 'undefined' || typeof video_playlist !== 'undefined')
        {
            //in case there's a default playlist array
            if (typeof video_playlist !== 'undefined'){
                video_list = video_playlist;            
            }

            // loading playlist from a pcloud array, in a public folder view page use the directLinkData array embeded in the HTML
            if (typeof directLinkData !== 'undefined')
            {
                //created the list of links
                var pcloud = directLinkData.content;
                var path   = 'https://filedn.eu/'+directLinkData.code+directLinkData.dirpath;

                for (i=0; i<pcloud.length; i++) 
                {
                    var temp = [];
                    temp["name"] = pcloud[i].name.slice(0, -4);
                    temp["link"] = path+pcloud[i].urlencodedname;
                    temp["size"] = pcloud[i].size;
                    video_list.push(temp);
                }

            }

            // from array video_list to a table
            var html_list = "";
            for (i=0; i<video_list.length; i++) {

                html_list+='<li>';

                if (is_played_video(video_list[i].link))
                    html_list+='&#10004;&nbsp;';

                html_list+='<a data-bvideo_id="'+i+'" href="'+video_list[i].link+'" title="'+video_list[i].name+'">'+video_list[i].name+'</a>';
                
                if (video_list[i].size!=undefined)
                {
                    video_size = (video_list[i].size!=undefined?fileSize(video_list[i].size):'-')
                    html_list+='<span style="float:right;"><a target="_blank" title="'+video_size+' Download" download href="'+video_list[i].link+'">💾</a></span>';
                }

                html_list+='</li>';
            }

            //print html
            $("#bvideo_playlist").html(html_list);
            $("#bvideo_playlist").parent().css(  {
                                          "height":$("video").height()+120,
                                          "overflow-y": "auto"
                                        });

        }

        // 2nd way to get a playlist load video_list array from a list instead than JS array    
        else if($('#bvideo_playlist').is('ol, ul'))
        {
            var video_list = [];
            $("#bvideo_playlist li a").each(function(e) { 
                a = $(this);
                a.attr('data-bvideo_id',e);
                var temp = [];
                    temp["name"] = this.text;
                    temp["link"] = this.href;
                    temp["size"] = a.data('size')!==undefined?a.data('size'):0;
                video_list.push(temp);
            });
        }

        // playlist video player
        if (typeof video_list !== 'undefined') 
        {
            //start video from parameeter ID....
            var start_video = new URLSearchParams(window.location.search).get('start_video');
            if (start_video!==null && $.isNumeric(start_video))
                id_current = start_video-1;//we start counting from 1 so we do not use the 0.
            else//init video at last play
                id_current = localStorage.getItem('bvideo-'+current_url);
            
            id_current = ($.isNumeric(id_current))?id_current:0;
            id_current = (id_current > video_list.length-1)?0:id_current;

            current_video = $('a[data-bvideo_id~="'+id_current+'"]');

            //current video playing
            localStorage.setItem('bvideo-'+current_url, id_current);

            //setup player to play current video
            $("video").attr({
                "id":"bvideo",
                "src": current_video.attr("href"),
                "data-bvideo_id":id_current//which video are we playing
            });
            
            //change title for video playing
            $('#bvideo_title').text(current_video.text());

            //highlight
            current_video.parent().css("background-color","#eeeeee");


            //on finished video play next
            $("video").on('ended', function(e){

                //current id,using attribute since data gets cached and we are updating it
                id = parseInt($(this).attr("data-bvideo_id"));

                //we mark this video as played
                mark_played_video(id);
                
                //what to play next
                id_next = (id == video_list.length-1)?0:id+1;

                //getting the source of the a
                src = $('a[data-bvideo_id~="'+id_next+'"]');

                $(this).attr({
                    "src": src.attr("href"),
                    "autoplay": "autoplay",
                    "data-bvideo_id":id_next //which video are we playing
                });

                //remember next video
                localStorage.setItem('bvideo-'+current_url, id_next);

                //change title for video playing
                $('#bvideo_title').text(src.text());

                //highlight whats currently playing
                //$(this).parent().prepend('▶️&nbsp;');
                $('#bvideo_playlist li').css("background-color","");
                src.parent().css("background-color","#eeeeee");
            });

            //sets the source of the video from an ahref
            $("#bvideo_playlist a[target!='_blank']").on("click", function(e) {

                //we prevent any default action, so we do not go to the url
                e.preventDefault();

                $("video").attr({
                    "src": $(this).attr("href"),
                    "autoplay": "autoplay",
                    "data-bvideo_id":$(this).data("bvideo_id") //which video are we playing
                });

                if ($('#bvideo_title').length )
                    location.href = "#bvideo_title"; 
                else
                    location.href = "#bvideo";   

                //remember last video
                localStorage.setItem('bvideo-'+current_url, $(this).data("bvideo_id"));

                //change title for video playing
                $('#bvideo_title').text($(this).text());

                //highlight whats currently playing
                //$(this).parent().prepend('▶️&nbsp;');
                $('#bvideo_playlist li').css("background-color","");
                $(this).parent().css("background-color","#eeeeee");
            });
        
        }

        /**
         * we mark a video as played, we use the btoa of the current url and we store the btoa of the video src
         * @param  id_video we get the src from the a
         */
        function mark_played_video(id_video)
        {
            //getting the source of the a
            a = $('a[data-bvideo_id~="'+id_video+'"]');
            src = a.attr("href");

            // if it was not in the array before, then store
            if(is_played_video(src) == false)
            {  
                var watched_videos;

                watched_videos = localStorage.getItem('bvideo-played-'+ current_url);

                if (watched_videos == null)
                    watched_videos = [];
                else
                    watched_videos = JSON.parse(watched_videos);

                watched_videos.push(btoa(src));
                localStorage.setItem('bvideo-played-'+ current_url, JSON.stringify(watched_videos));

                //icon marked played
                a.parent().prepend('&#10004;&nbsp;');
                //remove backgorund color
                a.parent().css("background-color","");
            }
        }

        /**
         * tells us if we have seen that video in this url
         * @param  string btoa src of the video
         * @return boolean    
         */
        function is_played_video(src)
        {
            watched_videos = localStorage.getItem('bvideo-played-'+ current_url);

            if (watched_videos == null)
                return false;

            watched_videos = JSON.parse(watched_videos);

            if( watched_videos.indexOf(btoa(src)) != -1 )
                return true;
            else
                return false;
        }
    
    }

})

//from https://stackoverflow.com/a/20463021
function fileSize(a,b,c,d,e)
{
    return (b=Math,c=b.log,d=1e3,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(e?2:0)+' '+(e?'kMGTPEZY'[--e]+'B':'Bytes')
}