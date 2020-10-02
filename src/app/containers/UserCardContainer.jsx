import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadUserDetails, clearUserDetails } from "redux_actions";
import { UserCardPage } from 'app_components/pages';

// маппинг редюсеров
const mapStateToProps = ({ userDetails }) => {
  return {
    userDetails
  };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      loadUserDetails,
      clearUserDetails
    }, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class UserCardContainer extends Component {

  static fetchData(store) {
    return store.dispatch(loadUserDetails());
  }

  componentDidMount() {
    const { userDetails, actions } = this.props;
    const { dataWasFetched } = userDetails;
    if (!dataWasFetched) actions.loadUserDetails();
  }

  render() {
    const { userDetails } = this.props;
    const { data, isLoading, hasErrors } = userDetails;

    let userCardData = { data };

    if (isLoading) userCardData.message = 'Загрузка...';
    if (hasErrors) userCardData.message = hasErrors.message;

    return (
      <React.Fragment>
        <UserCardPage {...userCardData} />
      </React.Fragment>
    );
  }
};