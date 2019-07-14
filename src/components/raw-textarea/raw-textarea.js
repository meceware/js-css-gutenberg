// Import Base64
import { Base64 } from 'js-base64';

const {
  Component,
  Fragment,
} = wp.element;

const {
  TextareaControl,
} = wp.components;

class RawTextareaControl extends Component {
  render() {
    return (
      <Fragment>
        <div className = { 'components-base-control mcw-textarea-comp' } >
          <label>{ this.props.label }</label>
          <div className = { 'mcw-textarea-comp-inner' } >
            <p className = { 'mcw-textarea-def' }>{ this.props.beginning }</p>
            <TextareaControl
              rows = { 12 }
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

export default RawTextareaControl;
