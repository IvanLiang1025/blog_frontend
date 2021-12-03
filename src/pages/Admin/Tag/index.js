
import React from 'react';
import Dashboard from '../Dashboard';
import TagList from './TagList';


class Blog extends React.PureComponent{

  render(){
    console.log(this.props)

    return (
      <Dashboard>
        <TagList />
      </Dashboard>
    )
  }
}

export default Blog
