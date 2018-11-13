import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';

import { hashHistory } from 'react-router';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state= { errors: [] };
  }
  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
  }

  componentWillUpdate(nextProps){
    // if the user didn't exist before, but now does => redirect
   if(!this.props.data.user && nextProps.data.user) {
     hashHistory.push('/dashboard');
   }
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(query)(
graphql(mutation)(SignUpForm)
);
