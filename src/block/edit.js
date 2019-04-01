// Import Base64
import { Base64 } from 'js-base64';
// Import CSS Raw Textarea Control
import RawCSSTextareaControl from '../components/raw-textarea/raw-css-textarea';
// Import JS Raw Textarea Control
import RawJSTextareaControl from '../components/raw-textarea/raw-js-textarea';
// Import Raw Text Control
import RawTextControl from '../components/raw-textarea/raw-text';
// Block with description
import BlockWithDescription from '../components/block-with-description/block-with-description';
// Import modal
import ModalSettings from '../components/modal/modal';
// Import translate
import __tr__ from '../translate';
// Import Icon
import Icon from '../icon';
// Import attributes
import BlockAttributes from './attributes';

const {
  Fragment,
  Component,
} = wp.element;

const {
  InspectorControls,
} = wp.editor;

const {
	PanelBody,
	TextControl,
  ToggleControl,
} = wp.components;

class CustomJsAndCssEdit extends Component {
  constructor() {
		super( ...arguments );
  }

  render() {
    const { attributes: {
      // Header Javascript
      jsHeaderEnable,
      jsHeader,
      jsHeaderParams,
      jsHeaderUrl,
      jsHeaderUrlDep,

      // Footer javascript
      jsFooterEnable,
      jsFooter,
      jsFooterParams,
      jsFooterUrl,
      jsFooterUrlDep,

      // Header CSS
      cssHeaderEnable,
      cssHeader,
      cssHeaderParams,
      cssHeaderUrl,
      cssHeaderUrlDep,

      // Footer CSS
      cssFooterEnable,
      cssFooter,
      cssFooterParams,
      cssFooterUrl,
      cssFooterUrlDep,

      // Inline JS
      jsInline,
      jsInlineParams,

      // Inline CSS
      cssInline,
      cssInlineParams,

      // Meta
      metaEnable,
      meta,
    }, setAttributes } = this.props;

    const src = `
  function deneme () {
    var foo = 'bar'
    var baz = 'qux'
    this.foo = foo + baz
  }
  console.log('deneme');
`;

  // const { code, error } = uglify.minify(src);
  // console.log(code);
  // console.log(this.props.attributes);
  // Babel.transform(d, { presets: ['es2015'] }).code

    const jsControls = (
      <PanelBody title = { __tr__( 'Javascript' ) } initialOpen = { false } >
        <BlockWithDescription description = { BlockAttributes.jsInline.description } >
          <RawJSTextareaControl
            label = { BlockAttributes.jsInline.label }
            js = { jsInline }
            params = { jsInlineParams[ 0 ] }
            onJSChange = { ( value ) => setAttributes( { jsInline: value } ) }
            onParamsChange = { ( value ) => setAttributes( { jsInlineParams: [ { minEnabled: value.minEnabled, min: value.min, type: value.type } ] } ) }
            minifyLabel = { __tr__( 'Min' ) }
          />
        </BlockWithDescription>

        <ToggleControl
          label = { BlockAttributes.jsHeaderEnable.label }
          checked = { jsHeaderEnable }
          onChange = { ( value ) => setAttributes( { jsHeaderEnable: value } ) }
        />
        { ( jsHeaderEnable ) && (
          <ModalSettings
            buttonText = { __tr__('Javascript Options (Head)') }
            modalTitle = { __tr__('Javascript Options (Head)') }
            modalButtonText = { __tr__( 'Save/Close' ) }
          >
            <BlockWithDescription description = { BlockAttributes.jsHeader.description } >
              <RawJSTextareaControl
                label = { BlockAttributes.jsHeader.label }
                js = { jsHeader }
                params = { jsHeaderParams[ 0 ] }
                onJSChange = { ( value ) => setAttributes( { jsHeader: value } ) }
                onParamsChange = { ( value ) => setAttributes( { jsHeaderParams: [ { minEnabled: value.minEnabled, min: value.min, type: value.type } ] } ) }
                minifyLabel = { __tr__( 'Min' ) }
              />
            </BlockWithDescription>

            <BlockWithDescription description = { BlockAttributes.jsHeaderUrl.description } >
              <TextControl
                type = 'string'
                label = { BlockAttributes.jsHeaderUrl.label }
                placeholder = 'https://'
                value = { jsHeaderUrl }
                onChange = { ( value ) => setAttributes( { jsHeaderUrl: value } ) }
              />
            </BlockWithDescription>

            <BlockWithDescription description = { BlockAttributes.jsHeaderUrlDep.description } >
              <TextControl
                type = 'string'
                label = { BlockAttributes.jsHeaderUrlDep.label }
                placeholder = 'jquery'
                value = { jsHeaderUrlDep }
                onChange = { ( value ) => setAttributes( { jsHeaderUrlDep: value } ) }
              />
            </BlockWithDescription>
          </ModalSettings>
        ) }

        <ToggleControl
          label = { BlockAttributes.jsFooterEnable.label }
          checked = { jsFooterEnable }
          onChange = { ( value ) => setAttributes( { jsFooterEnable: value } ) }
        />
        { ( jsFooterEnable ) && (
          <ModalSettings
            buttonText = { __tr__('Javascript Options (Footer)') }
            modalTitle = { __tr__('Javascript Options (Footer)') }
            modalButtonText = { __tr__( 'Save/Close' ) }
          >
            <BlockWithDescription description = { BlockAttributes.jsFooter.description } >
              <RawJSTextareaControl
                label = { BlockAttributes.jsFooter.label }
                js = { jsFooter }
                params = { jsFooterParams[ 0 ] }
                onJSChange = { ( value ) => setAttributes( { jsFooter: value } ) }
                onParamsChange = { ( value ) => setAttributes( { jsFooterParams: [ { minEnabled: value.minEnabled, min: value.min, type: value.type } ] } ) }
                minifyLabel = { __tr__( 'Min' ) }
              />
            </BlockWithDescription>

            <BlockWithDescription description = { BlockAttributes.jsFooterUrl.description } >
              <TextControl
                type = 'string'
                label = { BlockAttributes.jsFooterUrl.label }
                placeholder = 'https://'
                value = { jsFooterUrl }
                onChange = { ( value ) => setAttributes( { jsFooterUrl: value } ) }
              />
            </BlockWithDescription>

            <BlockWithDescription description = { BlockAttributes.jsFooterUrlDep.description } >
              <TextControl
                type = 'string'
                label = { BlockAttributes.jsFooterUrlDep.label }
                placeholder = 'jquery'
                value = { jsFooterUrlDep }
                onChange = { ( value ) => setAttributes( { jsFooterUrlDep: value } ) }
              />
            </BlockWithDescription>
          </ModalSettings>
        ) }
      </PanelBody>
    );

    const cssControls = (
      <PanelBody title = { __tr__( 'CSS' ) } initialOpen = { false } >
        <BlockWithDescription description = { BlockAttributes.cssInline.description } >
          <RawCSSTextareaControl
            label = { BlockAttributes.cssInline.label }
            css = { cssInline }
            params = { cssInlineParams[ 0 ] }
            onCSSChange = { ( value ) => setAttributes( { cssInline: value } ) }
            onParamsChange = { ( value ) => setAttributes( { cssInlineParams: [ { minEnabled: value.minEnabled, min: value.min, type: value.type } ] } ) }
            minifyLabel = { __tr__( 'Min' ) }
          />
        </BlockWithDescription>

        <ToggleControl
          label = { BlockAttributes.cssHeaderEnable.label }
          checked = { cssHeaderEnable }
          onChange = { ( value ) => setAttributes( { cssHeaderEnable: value } ) }
        />
        { ( cssHeaderEnable ) && (
          <ModalSettings
            buttonText = { __tr__('CSS Options (Head)') }
            modalTitle = { __tr__('CSS Options (Head)') }
            modalButtonText = { __tr__( 'Save/Close' ) }
          >
            <BlockWithDescription description = { BlockAttributes.cssHeader.description } >
              <RawCSSTextareaControl
                label = { BlockAttributes.cssHeader.label }
                css = { cssHeader }
                params = { cssHeaderParams[ 0 ] }
                onCSSChange = { ( value ) => setAttributes( { cssHeader: value } ) }
                onParamsChange = { ( value ) => setAttributes( { cssHeaderParams: [ { minEnabled: value.minEnabled, min: value.min, type: value.type } ] } ) }
                minifyLabel = { __tr__( 'Min' ) }
              />
            </BlockWithDescription>

            <BlockWithDescription description = { BlockAttributes.cssHeaderUrl.description } >
              <TextControl
                type = 'string'
                label = { BlockAttributes.cssHeaderUrl.label }
                placeholder = 'https://'
                value = { cssHeaderUrl }
                onChange = { ( value ) => setAttributes( { cssHeaderUrl: value } ) }
              />
            </BlockWithDescription>

            <BlockWithDescription description = { BlockAttributes.cssHeaderUrlDep.description } >
              <TextControl
                type = 'string'
                label = { BlockAttributes.cssHeaderUrlDep.label }
                placeholder = 'theme-css'
                value = { cssHeaderUrlDep }
                onChange = { ( value ) => setAttributes( { cssHeaderUrlDep: value } ) }
              />
            </BlockWithDescription>
          </ModalSettings>
        ) }

        <ToggleControl
          label = { BlockAttributes.cssFooterEnable.label }
          checked = { cssFooterEnable }
          onChange = { ( value ) => setAttributes( { cssFooterEnable: value } ) }
        />
        { ( cssFooterEnable ) && (
          <ModalSettings
            buttonText = { __tr__('CSS Options (Footer)') }
            modalTitle = { __tr__('CSS Options (Footer)') }
            modalButtonText = { __tr__( 'Save/Close' ) }
          >
            <BlockWithDescription description = { BlockAttributes.cssFooter.description } >
              <RawCSSTextareaControl
                label = { BlockAttributes.cssFooter.label }
                css = { cssFooter }
                params = { cssFooterParams[ 0 ] }
                onCSSChange = { ( value ) => setAttributes( { cssFooter: value } ) }
                onParamsChange = { ( value ) => setAttributes( { cssFooterParams: [ { minEnabled: value.minEnabled, min: value.min, type: value.type } ] } ) }
                minifyLabel = { __tr__( 'Min' ) }
              />
            </BlockWithDescription>

            <BlockWithDescription description = { BlockAttributes.cssFooterUrl.description } >
              <TextControl
                type = 'string'
                label = { BlockAttributes.cssFooterUrl.label }
                placeholder = 'https://'
                value = { cssFooterUrl }
                onChange = { ( value ) => setAttributes( { cssFooterUrl: value } ) }
              />
            </BlockWithDescription>

            <BlockWithDescription description = { BlockAttributes.cssFooterUrlDep.description } >
              <TextControl
                type = 'string'
                label = { BlockAttributes.cssFooterUrlDep.label }
                placeholder = 'theme-css'
                value = { cssFooterUrlDep }
                onChange = { ( value ) => setAttributes( { cssFooterUrlDep: value } ) }
              />
            </BlockWithDescription>
          </ModalSettings>
        ) }
      </PanelBody>
    );

    const metaControls = (
      <PanelBody title = { __tr__( 'Meta' ) } initialOpen = { false } >
        <ToggleControl
          label = { BlockAttributes.metaEnable.label }
          checked = { metaEnable }
          onChange = { ( value ) => setAttributes( { metaEnable: value } ) }
        />
        { ( metaEnable ) && (
          <BlockWithDescription description = { BlockAttributes.meta.description } >
            <RawTextControl
              label = { BlockAttributes.meta.label }
              beginning = { `<meta` }
              ending = { `/>` }
              value = { Base64.decode( meta ) }
              onChange = { ( value ) => setAttributes( { meta: Base64.encode( value ) } ) }
            />
          </BlockWithDescription>
        ) }
      </PanelBody>
    );

    return (
      <Fragment>
        <InspectorControls>
          { jsControls }
          { cssControls }
          { metaControls }
        </InspectorControls>

        <div className = 'mcw-js-css-wrapper'>
          <div className = 'mcw-js-css-selector-icon'>{ Icon }</div>
          <div className = 'mcw-js-css-selector'>{ __tr__( 'Custom JS/CSS' ) }</div>
        </div>
      </Fragment>
    );
  }
}

export default CustomJsAndCssEdit;