/**
 * BLOCK: FullPage Wrapper
 */

const {
  Component,
  Fragment,
} = wp.element;

const {
  Button,
  Modal,
} = wp.components;

class ModalSettings extends Component {
  constructor() {
    super( ...arguments );
    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { isOpen } = this.state;

    return (
      <Fragment>
        <Button
          className = 'mcw-modal-button'
          isDefault
          onClick = { () => this.setState( { isOpen: true } ) }
        >
          { this.props.buttonText }
        </Button>
        { isOpen &&
          <Modal
            title = { this.props.modalTitle }
            shouldCloseOnClickOutside = { false }
            className = 'mcw-modal-component'
            onRequestClose = { () => {
              this.setState( { isOpen: false } );
            } }
          >
            { this.props.children }
            <Button
              isDefault
              isPrimary
              onClick = { () => this.setState( { isOpen: false } ) }
            >
              { this.props.modalButtonText }
            </Button>
          </Modal>
        }
      </Fragment>
    );
  }
}

export default ModalSettings;
