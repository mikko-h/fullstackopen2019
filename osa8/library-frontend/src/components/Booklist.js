import React from 'react'

const Booklist = ({ books, filter}) => (
  <table>
    <tbody>
      <tr>
        <th></th>
        <th>
          author
        </th>
        <th>
          published
        </th>
      </tr>
      {books
        .filter(a => filter ? a.genres.includes(filter) : true)
        .map(a =>
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default Booklist
