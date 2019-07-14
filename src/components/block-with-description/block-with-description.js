const {
  Component,
  Fragment,
} = wp.element;

class BlockWithDescription extends Component {
  render() {
    return (
      <Fragment>
        { this.props.children }
        <div className = 'components-base-control mcw-js-css-desc'>{ this.props.description }</div>
      </Fragment>
    );
  }
}

export default BlockWithDescription;
