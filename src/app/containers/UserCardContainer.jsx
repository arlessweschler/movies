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

  static fetchData(store, urlParams) {
    const user_id = urlParams[0].split('/').pop();
    return store.dispatch(loadUserDetails(user_id));
  }

  state = {
    user_id: this.props.match.params.user_id
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const user_id_next = nextProps.match.params.user_id;

    if (prevState.user_id !== user_id_next) {
      return { user_id: user_id_next };
    } else {
      return null;
    }
  }

  // запрашиваем данные если они не были ранее запрошены или id пользователя в хранилище отличается от id пользователя в url
  componentDidMount() {
    const { userDetails, actions } = this.props;

    if (
      !userDetails.dataWasFetched ||
      (this.state.user_id !== userDetails.data.id)
    ) {
      actions.loadUserDetails(this.state.user_id);
    }
  }

  // запрашиваем новые данные если поменялся id пользователя
  componentDidUpdate(prevProps, prevState) {
    const user_id_next = this.state.user_id;

    if (prevState.user_id !== user_id_next) {
      this.props.actions.loadUserDetails(user_id_next);
    }
  }

  render() {
    const { userDetails } = this.props;
    const { data, isLoading, hasErrors } = userDetails;

    let userCardData = { data };

    if (isLoading) userCardData.message = 'Загрузка...';
    if (hasErrors) userCardData.message = hasErrors.message;

    return (
      <UserCardPage {...userCardData} />
    );
  }
};