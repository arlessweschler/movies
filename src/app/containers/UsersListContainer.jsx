import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadUsersList, clearUsersList } from "redux_actions"
import { UsersToolbar, UsersPage } from 'app_components/pages';
;

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
      loadUsersList,
      clearUsersList
    }, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class UsersListContainer extends Component {

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

  render() {
    const { usersList } = this.props;
    const { list, isLoading, hasErrors } = usersList;

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