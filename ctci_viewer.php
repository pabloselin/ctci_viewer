<?php
/**
 * Plugin Name:       Visor de PDF CTCI
 * Plugin URI:        https://apie.cl
 * Description:       Visor de documentos en PDF basado en react-pdf
 * Version:           0.0.1
 * Author:            A Pie
 * Author URI:        https://apie.cl
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ctci
 */

define('CTCIVIEWER_VERSION', '0.0.1');

function ctci_enqueue_scripts() {
	global $post;

	if(is_singular('ctci_doc')) {
		$postid = $post->ID;
		wp_enqueue_script( 'ctci_viewer', plugin_dir_url( __FILE__ ) . '/build/index.js', ['wp-element'], time(), true);
		wp_localize_script( 'ctci_viewer', 'docinfo', ctci_output_fields($postid) );
	}
}

add_action( 'wp_enqueue_scripts', 'ctci_enqueue_scripts');
