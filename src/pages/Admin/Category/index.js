
import React from 'react';
import TableList from './TableList';


class Blog extends React.PureComponent{

  render(){

    return (
      <TableList {...this.props}></TableList>
    )

    
  }
}

export default Blog
