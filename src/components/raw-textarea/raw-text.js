// Import Base64
import { Base64 } from 'js-base64';

const {
  Component,
  Fragment,
} = wp.element;

const {
  TextControl,
} = wp.components;

class RawTextControl extends Component {
  render() {
    return (
      <Fragment>
        <div className = { 'components-base-control mcw-textarea-comp' } >
          <label>{ this.props.label }</label>
          <div className = { 'mcw-textarea-comp-inner' } >
            <p className = { 'mcw-textarea-def' }>{ this.props.beginning }</p>
            <TextControl
              type = 'string'
              placeholder = 'name="viewport" content="width=device-width,initial-scale=1.0"'
              value = { Base64.decode( this.props.value ) }
              onChange = { ( value ) => this.props.onChange( Base64.encode( value ) ) }
            />
            <p className = { 'mcw-textarea-def' }>{ this.props.ending }</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default RawTextControl;
