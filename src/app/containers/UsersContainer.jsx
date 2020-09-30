import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UsersPage } from 'app_components/pages';

import {
  loadUsers,
  clearUsers
} from "redux_actions";


// маппинг редюсеров
const mapStateToProps = ({ users }) => {
  return {
    users
  };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      loadUsers,
      clearUsers
    }, dispatch)
  };
};


@connect(mapStateToProps, mapDispatchToProps)
export default class UsersContainer extends Component {

  constructor() {
    super();
    this.handleLoad = this.handleLoad.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {
    console.log('-- UsersContainer, componentDidMount');
    this.props.actions.loadUsers();
  }

  handleLoad() {
    this.props.actions.loadUsers();
  }

  handleClear() {
    this.props.actions.clearUsers();
  }

  render() {
    console.log('\n-- UsersContainer, render');
    const { users } = this.props;
    const { list } = users;

    return (
      <div>
        <h2>UsersContainer content</h2>

        <button onClick={this.handleLoad}>
          Загрузить список
        </button>
        <button onClick={this.handleClear}>
          Очистить список
        </button>

        {
          list.length
            ? <UsersPage data={list} />
            : ''
        }
      </div>
    );
  }
};