import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, ButtonGroup } from 'reactstrap';

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

  static fetchData(store, params) {
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

    console.log('\n-- UsersContainer.render(), users:', users);

    const hasData = (typeof list !== 'undefined') && (list.length > 0);
    let content = '';

    if (isLoading) {
      content = (<p>Загрузка...</p>)
    }

    if (hasData) {
      content = (<UsersPage data={list} />);
    }

    if (hasErrors) {
      content = (<p>{hasErrors.message}</p>);
    }

    return (
      <div>
        <h2>UsersContainer content</h2>
        <ButtonGroup className="pt-2 pb-4">
          <Button className="btn-success"
            onClick={this.handleLoad}
          >
            Загрузить список
          </Button>

          <Button className="btn-warning"
            onClick={this.handleClear}
          >
            Очистить список
          </Button>
        </ButtonGroup>
        
        {content}
      </div>
    );
  }
};