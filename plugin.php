<?php
/**
 * Plugin Name: Custom JS and CSS for Gutenberg
 * Plugin URI: http://www.meceware.com/fp-js-css-gutenberg/
 * Author: Mehmet Celik
 * Author URI: http://www.meceware.com/
 * Version: 0.0.1
 * Description: Add custom Javascript and CSS code to the page using Gutenberg.
 * Text Domain: mcw_js_css_gutenberg
**/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Block Initializer
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
