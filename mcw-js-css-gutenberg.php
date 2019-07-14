<?php
/**
 * Plugin Name: Custom JS and CSS for Gutenberg
 * Plugin URI: https://www.meceware.com/plugins/docs/custom-js-css-gutenberg/
 * Author: Mehmet Celik
 * Author URI: https://www.meceware.com/
 * Version: 1.0.2
 * Description: Add custom Javascript and CSS code to the page using Gutenberg.
 * Text Domain: mcw_custom_js_css_gutenberg
**/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists('McwCustomJsAndCssGutenberg') ) {
	class McwCustomJsAndCssGutenberg {
		// Plugin version
		private $version = '1.0.1';
		// Tag
		private $tag = 'mcw-custom-js-css-gutenberg';
		// Gutenberg block name
    private $blockName = 'meceware/custom-js-css-gutenberg';

		// Block attributes
    private $attributes = array(
      'jsHeaderEnable' => false,
      'jsHeaderParams' => array( array() ),
      'jsHeaderUrl' => '',
			'jsHeaderUrlDep' => '',

			'jsFooterEnable' => false,
      'jsFooterParams' => array( array() ),
      'jsFooterUrl' => '',
			'jsFooterUrlDep' => '',

			// Header CSS
      'cssHeaderEnable' => false,
      'cssHeaderParams' => array( array() ),
      'cssHeaderUrl' => '',
			'cssHeaderUrlDep' => '',

			// Footer CSS
      'cssFooterEnable' => false,
      'cssFooterParams' => array( array() ),
      'cssFooterUrl' => '',
			'cssFooterUrlDep' => '',

			// Meta
			'metaEnable' => false,
      'meta' => '',
    );
		// Block attributes are parsed or not
    private $blockAttributesReady = false;
    // Parsed block attributes
    private $blockAttributes = array();

		// Constructor
		public function __construct() {
			// BACKEND

			// Enqueue block editor css and js files
			add_action( 'enqueue_block_editor_assets', array( $this, 'OnEnqueueBlockEditorAssets' ) );

			// FRONTEND

			// WP Init action
			add_action( 'init', array( $this, 'OnInit' ) );

			// Enqueue header css and js
      add_action( 'enqueue_block_assets', array( $this, 'OnEnqueueBlockAssets' ) );
      // Add header css and js
      add_action( 'wp_head', array( $this, 'OnWpHead' ) );
      // Enqueue late footer css
      add_action( 'wp_footer', array( $this, 'OnWpFooter' ) );
      // Add footer css and js
      add_action( 'wp_footer', array($this, 'OnWpFooterLate'), 50 );
		}

		// Enqueue Gutenberg block assets for backend editor.
		public function OnEnqueueBlockEditorAssets() {
			wp_enqueue_script(
				$this->tag . '-sass-js',
				plugins_url( 'dist/sass/sass.sync.js', __FILE__ ),
				array(),
				'0.11.0',
				true
      );

			wp_enqueue_script(
				$this->tag . '-babel-js',
				plugins_url( 'dist/babel/babel.min.js', __FILE__ ),
				array(),
				'6.26.0',
				true
			);

			wp_enqueue_script(
				$this->tag . '-clean-css-js',
				plugins_url( 'dist/clean-css/cleancss-browser.js', __FILE__ ),
				array(),
				'4.2.1',
				true
			);

			wp_enqueue_script(
				$this->tag . '-block-js',
				plugins_url( 'dist/blocks.build.js', __FILE__ ),
				array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', $this->tag . '-sass-js', $this->tag . '-clean-css-js', $this->tag . '-babel-js' ),
				$this->version,
				true
			);

			wp_enqueue_style(
				$this->tag . '-block-editor-css',
				plugins_url( 'dist/blocks.editor.build.css', __FILE__ ),
				array( 'wp-edit-blocks' ),
				$this->version,
				'all'
			);
		}

		public function OnInit() {
      // Only load if Gutenberg is available.
      if ( ! function_exists( 'register_block_type' ) ) {
        return;
      }
      register_block_type( $this->blockName, array(
        'render_callback' => array( $this, 'OnRenderCallback' ),
      ) );
		}

		public function OnRenderCallback( $attributes, $content ) {
      // TODO: A Bug with Gutenberg and WordPress that the content is not rendered right
      // & char is encoded as &amp; at the output. Until it is fixed, this function callback is necessary.
      $content = wp_specialchars_decode( $content /* , ENT_QUOTES */ );
      return $content;
		}

		public function OnEnqueueBlockAssets() {
      // Head CSS
      $this->EnqueueStyles( 'mcw-head-', 'cssHeaderEnable', 'cssHeaderUrl', 'cssHeaderUrlDep' );
      // Head JS
      $this->EnqueueScripts( 'mcw-head-js-', 'jsHeaderEnable', 'jsHeaderUrl', 'jsHeaderUrlDep', false );
      // Footer JS
      $this->EnqueueScripts( 'mcw-footer-js-', 'jsFooterEnable', 'jsFooterUrl', 'jsFooterUrlDep', true );
    }

    public function OnWpHead() {
      // Echo meta tags
      $this->EchoMetaTags( 'metaEnable', 'meta' );

      // Echo css styles
      $this->EchoCSSStyles( 'cssHeaderEnable', 'cssHeaderParams' );

      // Echo JS scripts
      $this->EchoJSScripts( 'jsHeaderEnable', 'jsHeaderParams' );
    }

    public function OnWpFooter() {
      // Lazy css
      $this->EnqueueStyles( 'mcw-footer-css-', 'cssFooterEnable', 'cssFooterUrl', 'cssFooterUrlDep' );
    }

    public function OnWpFooterLate() {
      // Echo css styles
      $this->EchoCSSStyles( 'cssFooterEnable', 'cssFooterParams' );
      // Echo JS scripts
      $this->EchoJSScripts( 'jsFooterEnable', 'jsFooterParams' );
    }

		private function ParseBlocks( $content ) {
      $parser_class = apply_filters( 'block_parser_class', 'WP_Block_Parser' );
      if ( class_exists( $parser_class ) ) {
        $parser = new $parser_class();
        return $parser->parse( $content );
      } elseif ( function_exists( 'gutenberg_parse_blocks' ) ) {
        return gutenberg_parse_blocks( $content );
      } else {
        return false;
      }
		}

		private function GetAttributes() {
      if ( ! $this->blockAttributesReady ) {
        // Check Gutenberg functions
        if ( ! ( function_exists( 'has_blocks' ) && has_blocks( get_the_ID() ) ) ) {
          return;
        }

        // Get post
        global $post;
        if ( ! is_object( $post ) ) {
          return array();
        }

        $this->blockAttributesReady = true;

        // Parse blocks
        $blocks = $this->ParseBlocks( $post->post_content );
        if ( ! is_array( $blocks ) || empty( $blocks ) ) {
          return array();
        }

        foreach ( $blocks as $indexkey => $block ) {
          if ( ! is_object( $block ) && is_array( $block ) && isset( $block['blockName'] ) ) {
            if ( $this->blockName === $block['blockName'] ) {
              if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
                $this->blockAttributes[] = $block['attrs'];
              }
            }
          }
        }
      }

      return $this->blockAttributes;
		}

		private function GetFieldValue( $attr, $id ) {
			$default = isset( $this->attributes[ $id ] ) ? $this->attributes[ $id ] : null;
			return  isset( $attr[ $id ] ) ? $attr[ $id ] : $default;
		}

		private function GetEnqueueAssets( $enable, $url, $dep ) {
      $attrs = $this->GetAttributes();
      $output = array();

      if ( empty( $attrs ) ) {
        return $output;
      }

			foreach ( $attrs as $attr ) {
				// Set the default value
				$enabled = $this->GetFieldValue( $attr, $enable );

				if ( $enabled ) {
					$entry = array();
					$entry[ 'url' ] = $this->GetFieldValue( $attr, $url );
					$entry[ 'dep' ] = $this->GetFieldValue( $attr, $dep );

					$output[] = $entry;
				}
			}

			return $output;
    }

    private function EnqueueStyles( $id, $enable, $url, $dep ) {
      // Do not enqueue on admin
      if ( is_admin() ) {
        return;
      }

      // Enqueue CSS assets
      $assets = $this->GetEnqueueAssets( $enable, $url, $dep );

      $count = 0;
      foreach ( $assets as $asset ) {
        wp_enqueue_style( $id . $count, $asset[ 'url' ], array_filter( explode( ',', $asset[ 'dep' ] ) ) );
        $count++;
      }
    }

    private function EnqueueScripts( $id, $enable, $url, $dep, $footer ) {
      // Do not enqueue on admin
      if ( is_admin() ) {
        return;
      }

      // Enqueue CSS assets
      $assets = $this->GetEnqueueAssets( $enable, $url, $dep );

      $count = 0;
      foreach ( $assets as $asset ) {
        wp_enqueue_script( $id . $count, $asset[ 'url' ], array_filter( explode( ',', $asset[ 'dep' ] ) ), null, $footer );
        $count++;
      }
    }

    private function GetAssetCode( $enable, $params ) {
			$attrs = $this->GetAttributes();
      $output = array();

      if ( empty( $attrs ) ) {
        return $output;
      }

			foreach ( $attrs as $attr ) {
				// Set the default value
				$enabled = $this->GetFieldValue( $attr, $enable );

				if ( $enabled ) {
          $param = $this->GetFieldValue( $attr, $params );
          if ( is_array( $param ) && isset( $param[ 0 ] ) ) {
            if ( isset( $param[ 0 ]['min'] ) && ! empty( $param[ 0 ]['min'] ) ) {
              $output[] = $param[ 0 ]['min'];
            }
          }
				}
      }

			return $output;
    }

    private function EchoCSSStyles( $enable, $params ) {
      // Do not enqueue on admin
      if ( is_admin() ) {
        return;
      }

      // Add head css
      $styles = $this->GetAssetCode( $enable, $params );

      $css = '';
      foreach ( $styles as $style ) {
        $css .= $this->Decode( $style );
      }

      if ( ! empty( $css ) ) {
        echo '<style type="text/css">' . $css . '</style>';
      }
    }

    private function EchoJSScripts( $enable, $params ) {
      // Do not enqueue on admin
      if ( is_admin() ) {
        return;
      }

      // Add head css
      $scripts = $this->GetAssetCode( $enable, $params );

      $js = '';
      foreach ( $scripts as $script ) {
        $js .= $this->Decode( $script );
      }

      if ( ! empty( $js ) ) {
        echo '<script type="text/javascript">' . $js . '</script>';
      }
    }

    private function GetMetaTags( $enable, $meta ) {
      $attrs = $this->GetAttributes();
      $output = array();

      if ( empty( $attrs ) ) {
        return $output;
      }

      foreach ( $attrs as $attr ) {
        // Set the default value
        $enabled = $this->GetFieldValue( $attr, $enable );

        if ( $enabled ) {
          $param = $this->GetFieldValue( $attr, $meta );
          if ( isset( $param ) && ! empty( $param ) ) {
            $output[] = $this->Decode( $param );
          }
        }
      }

      return $output;
    }

    private function EchoMetaTags( $enable, $meta ) {
      // Do not enqueue on admin
      if ( is_admin() ) {
        return;
      }

      // Add head css
      $tags = $this->GetMetaTags( $enable, $meta );

      $output = '';
      foreach ( $tags as $tag ) {
        $output .= '<meta ' . $this->Decode( $tag ) . '/>';
      }

      echo $output;
    }

    private function Decode( $input ) {
      $codes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

      // Strip tags first
      $input = strip_tags( $input );

      // Check if input is null
      if ( $input == null ) {
        return '';
      }

      // Check if the string is valid
      if ( strlen( $input ) % 4 != 0 ) {
        return '';
      }

      $decoded[] = ( ( strlen( $input ) * 3 ) / 4 ) - ( strrpos( $input,'=' ) > 0 ? ( strlen( $input ) - strrpos( $input, '=' ) ) : 0 );
      $inChars = str_split( $input );
      $j = 0;
      $b = array();
      for ( $i = 0; $i < count( $inChars ); $i += 4 ) {
        $b[ 0 ] = strpos( $codes, $inChars[ $i ] );
        $b[ 1 ] = strpos( $codes, $inChars[ $i + 1 ] );
        $b[ 2 ] = strpos( $codes, $inChars[ $i + 2 ] );
        $b[ 3 ] = strpos( $codes, $inChars[ $i + 3 ] );
        $decoded[ $j++ ] = ( ( $b[ 0 ] << 2 ) | ( $b[ 1 ] >> 4 ) );

        if ( $b[ 2 ] < 64 ) {
          $decoded[ $j++ ] = ( ( $b[ 1 ] << 4 ) | ( $b[ 2 ] >> 2 ) );
          if ( $b[ 3 ] < 64 ) {
            $decoded[ $j++ ] = ( ( $b[ 2 ] << 6 ) | $b[ 3 ] );
          }
        }
      }

      $decodedStr = '';
      for( $i = 0; $i < count( $decoded ); $i++ )
      {
        $decodedStr .= chr( $decoded[ $i ] );
      }

      return $decodedStr;
    }
  }
}

new McwCustomJsAndCssGutenberg();