import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const UserInfo = ({ user }) => user === undefined ? null : (
  <div className="userinfo-page">
    <h2>{user.name}</h2>
    <h3>added blogs</h3>
    <ul>
      {user.blogs.map(blog =>
        <li key={blog.id}>{blog.title}</li>)}
    </ul>
  </div>
)

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    blogs: PropTypes.array.isRequired
  })
}

const mapStateToProps = ({ user }, { id }) => ({
  user: user.find(user => user.id === id)
})

export default connect(mapStateToProps)(UserInfo)
