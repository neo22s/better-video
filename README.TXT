=== Better Video & Playlist ===
Contributors: deambulando
Donate link: https://paypal.me/chema/10EUR
Tags: video, playlist, html5 video, start video, resume video
Requires at least: 5.0
Tested up to: 5.9
Stable tag: 1.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Improves video capabilities for wordpress and adds video playlist features.


== Description ==

Super fast player and playlist player using native HTML5 video player and jQuery. This will work also in WordPress. Uses browser local storage.

= Features =

    - Resume video from last position
    - On window close, stores position
    - Create playlist video from a HTML5 list or JS array
    - Resume on last played video
    - Autoplay next video on video end
    - Mark video as played
    - Start playing from video via url parameter using ?start_video=ID_VIDEO


== Installation ==

Through wordpress admin:

1. Go to Plugins -> Add New
1. Search for "Better Video"
1. Install the plugin
1. Activate it

Through FTP:

1. Download the plugin
1. Unzip .zip and upload the folder to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress


== Frequently Asked Questions ==

= How to use? =

Add HTML video tag and a List with id = bvideo_playlist:

<ol id="bvideo_playlist">
    <li><a href="http://s3.amazonaws.com/akamai.netstorage/HD_downloads/earth_night_rotate_1080.mov">Animation: Rotating Earth at Night</a><span style="float:right;"><a target="_blank" download="" href="http://s3.amazonaws.com/akamai.netstorage/HD_downloads/earth_night_rotate_1080.mov">55.00 MB</a></span></li>
    <li><a href="http://s3.amazonaws.com/akamai.netstorage/HD_downloads/rbsp_launch_1080p.mp4">Radiation Belt Storm Probes Launch</a></li>
    <li><a href="http://s3.amazonaws.com/akamai.netstorage/HD_downloads/curiosity_lands.mov">Dropping in on Mars in High-Res</a><span style="float:right;"><a target="_blank" download="" href="http://s3.amazonaws.com/akamai.netstorage/HD_downloads/curiosity_lands.mov">105.00 MB</a></span></li>
    <li><a href="http://s3.amazonaws.com/akamai.netstorage/HD_downloads/GRAIL_launch_1080.mov">GRAIL Launches on Mission to Moon</a></li>
    <li><a href="http://s3.amazonaws.com/akamai.netstorage/HD_downloads/HLV_Launch_anim.mov">Space Launch System Animation</a></li>
</ol>


You can also add in your HTML/JS file a playlist array and will create your list magically, the size field it’s optional:

var video_playlist = [
    {
        "name": "Animation: Rotating Earth at Night",
        "link": "http://s3.amazonaws.com/akamai.netstorage/HD_downloads/earth_night_rotate_1080.mov",
        "size": 55000000,
    },
    {
        "name": "Radiation Belt Storm Probes Launch",
        "link": "http://s3.amazonaws.com/akamai.netstorage/HD_downloads/rbsp_launch_1080p.mp4",
        "size": 475000000,
    },
    {
        "name": "Dropping in on Mars in High-Res",
        "link": "http://s3.amazonaws.com/akamai.netstorage/HD_downloads/curiosity_lands.mov",
        "size": 105000000,
    },
    {
        "name": "GRAIL Launches on Mission to Moon",
        "link": "http://s3.amazonaws.com/akamai.netstorage/HD_downloads/GRAIL_launch_1080.mov",
        "size": 1113000000,
    },
    {
        "name": "Space Launch System Animation",
        "link": "http://s3.amazonaws.com/akamai.netstorage/HD_downloads/HLV_Launch_anim.mov",
        "size": 642570000,
    },

];


== Screenshots ==


== Upgrade Notice ==
None.

== Changelog ==

= 2.0 =
* ajax stores video time for user 


= 1.0 =
* Initial version