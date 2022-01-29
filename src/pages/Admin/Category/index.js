
import React from 'react';
import TableList from './TableList';


class Category extends React.PureComponent{

  render(){
    return (
      <TableList {...this.props}></TableList>
    )
  }
}

export default Category
