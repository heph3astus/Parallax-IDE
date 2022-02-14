'use strict';

const React = require('react');
const invariant = require('invariant');

const store = require('../store');

const AppBar = require('./appbar');
const SideBar = require('./sidebar');
const Editor = require('./editor');
const Terminal = require('./terminal');
const RxTx = require('./rxtx');

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column'
  },
  appbar: {
    height: '56px'
  },
  main: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flex: 1
  },
  editWindow: {
    width: '100%',
    height: 'calc(100% - 308px)',
    display: 'flex',
    flexGrow: 1,
    overflow: 'scroll'
  },
  sidebar: {
    flex: '0 0 13rem',
    order: -1,
    display: 'flex',
    zIndex: 4
  },
  overlay: {
    position: 'fixed',
    width: 0,
    height: 0,
    zIndex: 9999
  },
  infoComp: {
    position: 'fixed',
    bottom: '0px',
    padding: '10px',
    paddingLeft: '15px',
    width: 'calc(100% - 238px)',
  },
  editorComponent: {
    flexGrow: 1,
    width: '100%',
    paddingLeft: '15px'
  },
  beneathBar: {
    position: 'fixed',
    top: '10px',
    height: '100%',
    width: '100%'
  }
};

class Layout extends React.Component {
  componentDidMount(){
    const add = this.props.addMountpoint;
    invariant(add, 'Layout requires addMountpoint during componentDidMount.');
    add('overlay', React.findDOMNode(this._overlay));
  }

  componentWillUnmount(){
    const remove = this.props.removeMountpoint;
    invariant(remove, 'Layout requires removeMountpoint during componentWillUnmount.');
    remove('overlay');
  }

  render(){
    const { workspace, handlers } = this.props.app;
    return (
      <div style={styles.container}>
        <div style={styles.appbar}><AppBar/></div>
        <div style={styles.beneathBar}>
          <div style={styles.main}>
            <main style={styles.editWindow}>
              <div style={styles.editorComponent}><Editor handlers={handlers}/></div>
              <div style={styles.infoComp}>
                <Terminal store={store} handlers={handlers} />
                <RxTx handlers={handlers} />
              </div>
            </main>
            <div style={styles.sidebar}><SideBar workspace={workspace} handlers={handlers}/></div>
          </div>
        </div>
        <div ref={(ref) => this._overlay = ref} style={styles.overlay}></div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

Layout.propTypes = {
  addMountpoint: React.PropTypes.func.isRequired,
  removeMountpoint: React.PropTypes.func.isRequired
};

module.exports = Layout;
