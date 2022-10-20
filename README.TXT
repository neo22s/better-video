
=== Better Video ===
Contributors: deambulando
Donate link: https://paypal.me/chema/10EUR
Tags: video, playlist, video playlist, html5 video, start video, resume video, progress
Requires at least: 5.0
Tested up to: 5.9
Stable tag: 2.0.1
Requires PHP: 7.4
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Improves video capabilities for wordpress, stores progress and adds video playlist features.


== Description ==

Super fast player and playlist player using native HTML5 video player and jQuery. This will work also in WordPress. Uses browser local storage for most features.

If user is logged in we store video position in the database. So even if changes browser will save the progress.

= Features =

- Resume video from last position. Saves progress in DB and browser storage.
- On pause or window close, stores progress
-  Start playing video at custom time using ?t=SECONDS ex ?t=120 will start at 2 minutes

**Playlist Features**
- Create playlist video from a HTML5 list or JS array
- Resume on last played video
- Autoplay next video on video end
- Mark video as played
- Start playing from video via url parameter using ?start_video=ID_VIDEO
- Stored in user browser storage, not in DB


== Installation ==

Through WordPress admin:

1. Go to Plugins -> Add New
2. Search for "Better Video"
3. Install the plugin
4. Activate it

Through FTP:

1. Download the plugin
2. Unzip .zip and upload the folder to the `/wp-content/plugins/` directory
3. Activate the plugin through the 'Plugins' menu in WordPress


== Frequently Asked Questions ==

= How to use? =

To enable the video features just add a video from the post editor or add HTML video tag. You can have as many video tags as you want.

= Video Play list =

You can create a list on your editor and then in the side panel in advanced, anchor set it to "bvideo_playlist".

Also you can edit the HTML and create List with id = bvideo_playlist:

<ol id="bvideo_playlist">
    <li><a href="http://s3.amazonaws.com/akamai.netstorage/HD_downloads/earth_night_rotate_1080.mov">Animation: Rotating Earth at Night</a></li>
    <li><a href="http://s3.amazonaws.com/akamai.netstorage/HD_downloads/rbsp_launch_1080p.mp4">Radiation Belt Storm Probes Launch</a></li>
    <li><a href="http://s3.amazonaws.com/akamai.netstorage/HD_downloads/curiosity_lands.mov">Dropping in on Mars in High-Res</a></li>
    <li><a href="http://s3.amazonaws.com/akamai.netstorage/HD_downloads/GRAIL_launch_1080.mov">GRAIL Launches on Mission to Moon</a></li>
    <li><a href="http://s3.amazonaws.com/akamai.netstorage/HD_downloads/HLV_Launch_anim.mov">Space Launch System Animation</a></li>
</ol>


You can also add in your HTML/JS file a playlist array and will create your list magically, the size field it’s optional:

<script>
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
</script>

To add the JS you can use a plugin like https://es.wordpress.org/plugins/header-and-footer-scripts/


== Screenshots ==
1. Video player
2. Play list player

== Upgrade Notice ==
None.

== Changelog ==

= 2.0.1 =
* ajax stores video time for logged user 

= 1.0 =
* Initial version
