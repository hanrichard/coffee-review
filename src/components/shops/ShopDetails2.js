
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

const enhance = compose(
  firebaseConnect([
    'todos' // sync /todos from firebase into redux
  ]),
  connect((state) => ({
    todos: state.firebase.ordered.todos
  })
)



export default enhance(ShopDetails2)