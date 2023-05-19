<?php
/**
	* Plugin Name: Better Video & Playlist
	* Plugin URI: https://garridodiaz.com/html5-playlist-video-player/
	* Description: Improves video capabilities for wordpress and adds video playlist features.
	* Version: 2.0.2
	* Author: Chema Garrido
	* Author URI: https://garridodiaz.com
	* License: GPL2
*/

add_action( 'wp_enqueue_scripts', 'bbpl_assets');
add_action( 'wp_ajax_bbpl_store_video_time', 'bbpl_store_video_time' );
add_action( 'wp_ajax_bbpl_get_video_time', 'bbpl_get_video_time' );

/* enqueue scripts and style from parent theme */        
function bbpl_assets() {
	wp_enqueue_script( 'better-video', plugin_dir_url( __FILE__ ) . 'js/better-video.js', array('jquery'), '2.0.2', true );

	wp_localize_script(
		'better-video',
		'my_ajax_obj',
		array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'nonce'    => wp_create_nonce( 'better-video' ),
		)
	);
}


/**
 * Handles AJAX requests.
 */
function bbpl_store_video_time() {

	// Handle the ajax request here
	check_ajax_referer( 'better-video' );
	$return = FALSE;

	//only store for loged in users
	if (is_user_logged_in() ){
		global $current_user;
		$time = sanitize_text_field($_POST['time']);
		$video = sanitize_url($_POST['video']);

		if (is_numeric($time) AND wp_http_validate_url($video))
			$return = update_user_meta($current_user->ID,'bvideo-'.md5($video),$time);
	}

	wp_send_json($return);
}


function bbpl_get_video_time() {
	// Handle the ajax request here
	check_ajax_referer( 'better-video' );
	$return = 0;

	//only store for loged in users
	if (is_user_logged_in() ){
		global $current_user;
		$video = sanitize_url($_POST['video']);
		if (wp_http_validate_url($video))
			$return = get_user_meta($current_user->ID,'bvideo-'.md5($video));
	}

	wp_send_json($return);
}



?>
