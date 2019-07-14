// Import Base64
import { Base64 } from 'js-base64';
// Import classnames
import classnames from 'classnames';
// Import Uglify
import uglify from 'uglifyjs-browser';

const {
  Component,
  Fragment,
} = wp.element;

const {
  TextareaControl,
  ButtonGroup,
  Button,
} = wp.components;

class RawJSTextareaControl extends Component {
  constructor() {
    super( ...arguments );
    this.state = {
      err: false,
    };
  }

  render() {
    const jsStyleTypes = {
      js: 'JS',
      babel: 'Babel',
    };

    const setError = err => this.setState( { err: err } );

    const minify = ( js ) => {
      if ( ! js ) {
        return js;
      }

      const result = uglify.minify( js );

      if ( result.error ) {
        setError( true );
        // console.error( 'uglify error', result.error );
        return js;
      }

      return result.code;
    };

    const onParamUpdate = ( js ) => {
      this.props.params.min = Base64.encode( this.props.params.minEnabled ? minify( js ) : js );

      this.props.onParamsChange( this.props.params );
    };

    const onParamChange = ( js ) => {
      if ( ! js ) {
        onParamUpdate( js );
        return;
      }

      if ( this.props.params.type === 'babel' ) {
        try {
          setError( false );
          onParamUpdate( Babel.transform( js, { presets: [ [ 'es2015', { modules: false } ] ] } ).code );
        } catch ( ex ) {
          // console.error('babel error: ' + ex.message);
          setError( true );
          onParamUpdate( js );
        }
      } else {
        setError( false );
        onParamUpdate( js );
      }
    };

    const onJSChange = ( js ) => {
      this.props.onJSChange( Base64.encode( js ) );

      onParamChange( js );
    };

    const onMinifyToggle = () => {
      this.props.params.minEnabled = ! this.props.params.minEnabled;
      onParamChange( Base64.decode( this.props.js ) );
    };

    const onTypeChange = ( type ) => {
      this.props.params.type = type;
      onParamChange( Base64.decode( this.props.js ) );
    };

    const styleType = ( Object.keys( jsStyleTypes ).indexOf( this.props.params.type ) > -1 ) ? this.props.params.type : 'js';

    return (
      <Fragment>
        <div className = { 'components-base-control mcw-textarea-comp' } >
          <label>{ this.props.label }</label>
          <ButtonGroup className = 'mcw-textarea-button-group' >
            <Button
              className = 'mcw-textarea-btn mcw-textarea-btn-margright'
              isSmall
              isPrimary = { this.props.params.minEnabled }
              aria-pressed = { this.props.params.minEnabled }
              onClick = { () => onMinifyToggle() }
            >
              { this.props.minifyLabel }
            </Button>
            { Object.keys( jsStyleTypes ).map( key => (
              <Button
                key = { key }
                className = 'mcw-textarea-btn'
                isSmall
                isPrimary = { styleType === key }
                aria-pressed = { styleType === key }
                onClick = { () => onTypeChange( key ) }
              >
                { jsStyleTypes[ key ] }
              </Button>
            ) ) }
          </ButtonGroup>
          <div className = { classnames( 'mcw-textarea-comp-inner', { 'mcw-textarea-comp-error': this.state.err } ) } >
            <p className = { 'mcw-textarea-def' }>{ '<script type="text/javascript">' }</p>
            <TextareaControl
              rows = { 12 }
              value = { Base64.decode( this.props.js ) }
              onChange = { ( value ) => onJSChange( value ) }
            />
            <p className = { 'mcw-textarea-def' }>{ '</script>' }</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default RawJSTextareaControl;
