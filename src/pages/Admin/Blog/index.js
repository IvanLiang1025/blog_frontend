
import React from 'react';
// import Dashboard from '../Dashboard';
import BlogList from './BlogList';
import AdminLayout from '@/pages/Layout/AdminLayout';


class Blog extends React.PureComponent{

  render(){
  
    return(
      // <div>heeh</div>
        <BlogList {...this.props}></BlogList>
    )
  }
}

export default Blog
