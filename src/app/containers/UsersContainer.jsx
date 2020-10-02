import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadUsers, clearUsers } from "redux_actions"
import { UsersToolbar, UsersPage } from 'app_components/pages';
;

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

  static fetchData(store) {
    return store.dispatch(loadUsers());
  }

  componentDidMount() {
    const { users, actions } = this.props;
    const { listWasFetched } = users;
    if (!listWasFetched) actions.loadUsers();
  }

  handleLoad() {
    this.props.actions.loadUsers();
  }

  handleClear() {
    this.props.actions.clearUsers();
  }

  render() {
    const { users } = this.props;
    const { list, isLoading, hasErrors } = users;

    const hasData = (typeof list !== 'undefined') && (list.length > 0);
    let usersPageData = {};

    if (isLoading) usersPageData.message = 'Загрузка...';
    if (hasData) usersPageData.list = list;
    if (hasErrors) usersPageData.message = hasErrors.message;

    return (
      <React.Fragment>
        <UsersToolbar
          handleLoad={this.handleLoad.bind(this)}
          handleClear={this.handleClear.bind(this)}
        />
        {<UsersPage {...usersPageData} />}
      </React.Fragment>
    );
  }
};