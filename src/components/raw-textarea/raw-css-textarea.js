// Import Base64
import { Base64 } from 'js-base64';
// Import classnames
import classnames from 'classnames';
// LESS
import less from 'less';

const {
  Component,
  Fragment,
} = wp.element;

const {
  TextareaControl,
  ButtonGroup,
  Button,
} = wp.components;

class RawCSSTextareaControl extends Component {
  constructor() {
		super( ...arguments );
		this.state = {
			err: false,
		};
  }

  render() {
    const cssStyleTypes = {
      css: 'CSS',
      sass: 'SASS',
      less: 'LESS',
    };

    const setError = err => this.setState( { err: err } );

    const minify = ( css ) => {
      if ( ! css ) return css;

      const minified = new CleanCSS( {} ).minify( css );
      if ( minified.styles ) {
        return minified.styles;
      }
      // console.error( 'minify error', minified );
      setError( true );
      return css;
    };

    const onParamUpdate = ( css ) => {
      this.props.params.min = Base64.encode( this.props.params.minEnabled ? minify( css ) : css );

      this.props.onParamsChange( this.props.params );
    };

    const onParamChange = ( css ) => {
      if ( ! css ) {
        onParamUpdate( css );
        return;
      }

      if ( this.props.params.type === 'sass' ) {
        // SASS
        Sass.compile( css, result => {
          if ( result.status ) {
            // console.error( 'sass error: ', result.formatted );
            setError( true );
          } else {
            setError( false );
          }

          onParamUpdate( ( ! result.status ) ? result.text : css );
        } );
      } else if ( this.props.params.type === 'less' ) {
        less.render( css ).then(
          function( output ) {
            setError( false );
            onParamUpdate( output.css );
          },
          function( error ) {
            // console.error( 'less error: ', error );
            setError( true );
            onParamUpdate( css );
          }
        );
      } else {
        setError( false );
        onParamUpdate( css );
      }
    };

    const onCSSChange = ( css ) => {
      this.props.onCSSChange( Base64.encode( css ) );

      onParamChange( css );
    };

    const onMinifyToggle = () => {
      this.props.params.minEnabled = ! this.props.params.minEnabled;
      onParamChange( Base64.decode( this.props.css ) );
    };

    const onStyleChange = ( type ) => {
      this.props.params.type = type;
      onParamChange( Base64.decode( this.props.css ) );
    };

    const styleType = ( Object.keys( cssStyleTypes ).indexOf( this.props.params.type ) > -1 ) ? this.props.params.type : 'css';

    return (
      <Fragment>
        <div className = { 'components-base-control mcw-textarea-comp' } >
          <label>{ this.props.label.replace( '{{type}}', cssStyleTypes[ styleType ] ) }</label>
          <ButtonGroup className = 'mcw-textarea-button-group' >
            <Button
              className = 'mcw-textarea-btn mcw-textarea-btn-margright'
              isSmall
              isPrimary = { this.props.params.minEnabled }
              aria-pressed = { this.props.params.minEnabled }
              onClick={ () => onMinifyToggle() }
              >
              { this.props.minifyLabel }
            </Button>
            { Object.keys( cssStyleTypes ).map( key => (
              <Button
                key = { key }
                className = 'mcw-textarea-btn'
                isSmall
                isPrimary = { styleType === key }
                aria-pressed = { styleType === key }
                onClick={ () => onStyleChange( key ) }
                >
                { cssStyleTypes[ key ] }
              </Button>
            ) ) }
          </ButtonGroup>
          <div className = { classnames( 'mcw-textarea-comp-inner', { 'mcw-textarea-comp-error' : this.state.err } ) } >
            <p className = { 'mcw-textarea-def' }>{ `<style type="text/css">` }</p>
            <TextareaControl
              rows = { 12 }
              value = { Base64.decode( this.props.css ) }
              onChange = { ( value ) => onCSSChange( value ) }
            />
            <p className = { 'mcw-textarea-def' }>{ `</style>` }</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default RawCSSTextareaControl;