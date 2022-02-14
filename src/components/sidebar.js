'use strict';

const React = require('react');

const Card = require('./card');

const styles = {
  card: {
    margin: 0,
    height: 'calc(100% - 136px)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px'
  }
};

class Sidebar extends React.Component {
  render(){
    const {
      children
    } = this.props;

    return (
      <Card style={styles.card}>
        {children}
      </Card>
    );
  }
}

module.exports = Sidebar;
