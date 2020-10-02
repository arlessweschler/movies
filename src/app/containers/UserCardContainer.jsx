import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadUsersList, clearUsersList } from "redux_actions";

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
export default class UserCardContainer extends Component {

  render() {
    console.log('UserCardContainer.render()');

    return (
      <React.Fragment>
        Карточка пользователя
      </React.Fragment>
    );
  }
};