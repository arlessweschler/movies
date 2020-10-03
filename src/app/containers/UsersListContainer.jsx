import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UsersToolbar, UsersPage } from 'app_components/pages';
import {
  redirect,
  loadUsersList,
  clearUsersList
} from "redux_actions"

// маппинг редюсеров
const mapStateToProps = ({ usersList }) => {
  return {
    usersList
  };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      redirect,
      loadUsersList,
      clearUsersList
    }, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class UsersListContainer extends Component {

  constructor() {
    super();
    this.handleLoad = this.handleLoad.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  static fetchData(store) {
    return store.dispatch(loadUsersList());
  }

  componentDidMount() {
    const { usersList, actions } = this.props;
    const { listWasFetched } = usersList;
    if (!listWasFetched) actions.loadUsersList();
  }

  handleLoad() {
    this.props.actions.loadUsersList();
  }

  handleClear() {
    this.props.actions.clearUsersList();
  }

  handleRowClick(id) {
    this.props.actions.redirect({
      fromURL: '/users',
      toURL: `/users/${id}`
    });
  }

  render() {
    const { usersList } = this.props;
    const { list, isLoading, hasErrors } = usersList;

    const hasData = (typeof list !== 'undefined') && (list.length > 0);
    let usersPageData = {
      handleRowClick: this.handleRowClick
    };

    if (isLoading) usersPageData.message = 'Загрузка...';
    if (hasData) usersPageData.list = list;
    if (hasErrors) usersPageData.message = hasErrors.message;

    return (
      <React.Fragment>
        <UsersToolbar
          handleLoad={this.handleLoad}
          handleClear={this.handleClear}
        />
        {<UsersPage {...usersPageData} />}
      </React.Fragment>
    );
  }
};