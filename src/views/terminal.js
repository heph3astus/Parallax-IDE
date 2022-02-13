'use strict';

const React = require('react');
const { createContainer } = require('sovereign');

const Scroller = require('../lib/scroller');

const TransmitPane = require('../components/transmit-pane');

const styles = {
  outputConsole: {
    height: '200px',
    padding: '10px',
    margin: '0',
    overflow: 'scroll',
    whiteSpace: 'pre',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)'
  }
};

class TermnialView extends React.Component {

  componentWillReceiveProps(nextProps){
    const { output, offset } = nextProps;
    this.scroller.setLines(output, offset);
    this.scroller.requestRefresh();
  }

  componentDidMount() {
    const outputElement = React.findDOMNode(this.outputConsole);
    this.scroller = new Scroller(outputElement);
    outputElement.addEventListener('scroll', this.scroller.scroll, false);
  }

  componentWillUnmount() {
    const outputElement = React.findDOMNode(this.outputConsole);
    outputElement.removeEventListener('scroll', this.scroller.scroll, false);
  }

  shouldComponentUpdate(nextProps){
    const { connected, input } = this.props;
    return (connected !== nextProps.connected || input !== nextProps.input);
  }

  render(){
    const {
      handlers,
      connected,
      input
    } = this.props;

    const {
      transmitInput
    } = handlers;

    return (
      <div>
        <TransmitPane connected={connected} text={input} onChange={transmitInput} />
        <pre ref={(ref) => this.outputConsole = ref} style={styles.outputConsole} />
      </div>
    );
  }
}

module.exports = createContainer(TermnialView, {
  getStores({ store }){
    return {
      store
    };
  },

  getPropsFromStores({ store }){
    const { transmission, device } = store.getState();
    const { input, output, offset } = transmission;
    const { connected } = device;

    return {
      connected,
      input,
      output,
      offset
    };
  }
});
