/**
 * BLOCK: FullPage Wrapper
 */

/* Import Base64 */
import { Base64 } from 'js-base64';

const {
  Fragment,
  Component,
} = wp.element;

class CustomJsAndCssSave extends Component {
  constructor() {
    super( ...arguments );
	}

  render() {
    const { attributes: {
      jsInlineParams,
      cssInlineParams,
    } } = this.props;

		return (
      <Fragment>
        { ( cssInlineParams[ 0 ].min ) && ( cssInlineParams[ 0 ].min.length !== 0 ) && (
          <style type="text/css">{ Base64.decode( cssInlineParams[ 0 ].min ) }</style>
        ) }
        { ( jsInlineParams[ 0 ].min ) && ( jsInlineParams[ 0 ].min.length !== 0 ) && (
          <script type="text/javascript">{ Base64.decode( jsInlineParams[ 0 ].min ) }</script>
        ) }
      </Fragment>
		);
  }
}

export default CustomJsAndCssSave;
