/**
 * BLOCK: custom-js-css-gutenberg
 */

// Import translate
import __tr__ from '../translate';

const attributes = {
  // Header Javascript
  jsHeaderEnable: {
    type: 'boolean',
    default: false,
    label: __tr__( 'Enable Head Javascript' ),
  },

  jsHeader: {
    type: 'string',
    default: '',
    label: __tr__( 'Javascript Code' ),
    description: __tr__( 'This parameter is the javascript code between head tags.' ),
  },
  jsHeaderParams: {
    type: 'array',
    default: [ {
      minEnabled: false,
      min: '',
      type: 'js',
    } ],
  },

  jsHeaderUrl: {
    type: 'string',
    default: '',
    label: __tr__( 'Javascript URL' ),
    description: __tr__( 'This parameter adds the specified JS URL between head tags.' ),
  },

  jsHeaderUrlDep: {
    type: 'string',
    default: '',
    label: __tr__( 'Javascript URL Dependencies' ),
    description: __tr__( 'This parameter is the dependencies (comma seperated) for the JS URL.' ),
  },

  // Footer javascript
  jsFooterEnable: {
    type: 'boolean',
    default: false,
    label: __tr__( 'Enable Footer Javascript' ),
  },

  jsFooter: {
    type: 'string',
    default: '',
    label: __tr__( 'Javascript' ),
    description: __tr__( 'This parameter is the javascript code at the footer before closing body tag.' ),
  },
  jsFooterParams: {
    type: 'array',
    default: [ {
      minEnabled: false,
      min: '',
      type: 'js',
    } ],
  },

  jsFooterUrl: {
    type: 'string',
    default: '',
    label: __tr__( 'Javascript URL' ),
    description: __tr__( 'This parameter adds the specified JS URL at the footer before closing body tag.' ),
  },

  jsFooterUrlDep: {
    type: 'string',
    default: '',
    label: __tr__( 'Javascript URL Dependencies' ),
    description: __tr__( 'This parameter is the dependencies (comma seperated) for the JS URL.' ),
  },

  // Header CSS
  cssHeaderEnable: {
    type: 'boolean',
    default: false,
    label: __tr__( 'Enable Head CSS' ),
  },

  cssHeader: {
    type: 'string',
    default: '',
    label: __tr__( 'CSS' ),
    description: __tr__( 'This parameter is the CSS code between head tags.' ),
  },
  cssHeaderParams: {
    type: 'array',
    default: [ {
      minEnabled: false,
      min: '',
      type: 'css',
    } ],
  },

  cssHeaderUrl: {
    type: 'string',
    default: '',
    label: __tr__( 'CSS URL' ),
    description: __tr__( 'This parameter adds the specified CSS URL between head tags.' ),
  },

  cssHeaderUrlDep: {
    type: 'string',
    default: '',
    label: __tr__( 'CSS URL Dependencies' ),
    description: __tr__( 'This parameter is the dependencies (comma seperated) for the CSS URL.' ),
  },

  // Footer CSS
  cssFooterEnable: {
    type: 'boolean',
    default: false,
    label: __tr__( 'Enable Footer CSS' ),
  },

  cssFooter: {
    type: 'string',
    default: '',
    label: __tr__( 'CSS' ),
    description: __tr__( 'This parameter is the CSS code at the footer before closing body tag.' ),
  },
  cssFooterParams: {
    type: 'array',
    default: [ {
      minEnabled: false,
      min: '',
      type: 'css',
    } ],
  },

  cssFooterUrl: {
    type: 'string',
    default: '',
    label: __tr__( 'CSS URL' ),
    description: __tr__( 'This parameter adds the specified CSS URL at the footer before closing body tag.' ),
  },

  cssFooterUrlDep: {
    type: 'string',
    default: '',
    label: __tr__( 'CSS URL Dependencies' ),
    description: __tr__( 'This parameter is the dependencies (comma seperated) for the CSS URL.' ),
  },

  // Inline JS
  jsInline: {
    type: 'string',
    default: '',
    label: __tr__( 'Javascript (Inline)' ),
    description: __tr__( 'This parameter adds the specified javascript code to the place of this block.' ),
  },
  jsInlineParams: {
    type: 'array',
    default: [ {
      minEnabled: false,
      min: '',
      type: 'js',
    } ],
  },

  // Inline CSS
  cssInline: {
    type: 'string',
    default: '',
    label: __tr__( '{{type}} (Inline)' ),
    description: __tr__( 'This parameter adds the specified CSS code to the place of this block.' ),
  },
  cssInlineParams: {
    type: 'array',
    default: [ {
      minEnabled: false,
      min: '',
      type: 'css',
    } ],
  },

  // Meta
  metaEnable: {
    type: 'boolean',
    default: false,
    label: __tr__( 'Enable Meta Tag' ),
    description: __tr__( 'This parameter enables adding the specified code between meta tags at the head.' ),
  },

  meta: {
    type: 'string',
    default: '',
    label: __tr__( 'Meta Tag Content' ),
    description: __tr__( 'This parameter adds the specified code between meta tags at the head.' ),
  },
};

export default attributes;
