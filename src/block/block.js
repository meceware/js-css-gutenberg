/**
 * BLOCK: custom-js-css-gutenberg
 *
 * Custom JS and CSS for Gutenberg
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// Import translate
import __tr__ from '../translate';
// Import Icon
import Icon from '../icon';
// Import attributes
import attributes from './attributes';
// Import Edit
import edit from './edit';
// Import Save
import save from './save';

// Internal block libraries
const {
  registerBlockType,
} = wp.blocks;

registerBlockType( 'meceware/custom-js-css-gutenberg', {
  // Title
  title: __tr__( 'Custom JS/CSS' ),
  // Description
  description: __tr__( 'Add custom JS and CSS code to the page.' ),
  // Icon
  icon: Icon,
  // Category
  category: 'formatting',
  // Keywords
  keywords: [
    __tr__( 'Custom JS/CSS' ),
    __tr__( 'js css' ),
    __tr__( 'meceware' ),
  ],
  // Supports
  supports: {
    align: false,
    alignWide: false,
    anchor: false,
    customClassName: false,
    className: false,
    html: true,
    inserter: true,
    multiple: true,
    reusable: false,
  },

  // Attributes
  attributes: attributes,

  // Edit render
  edit: edit,

  // Save render
  save: save,
} );
