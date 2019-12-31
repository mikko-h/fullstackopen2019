import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const UserList = (props) => (
  <div className='userlist-page'>
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {props.user.map(user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)

UserList.defaultProps = {
  user: []
}

UserList.propTypes = {
  user: PropTypes.arrayOf(PropTypes.shape({
    blogs: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(UserList)
