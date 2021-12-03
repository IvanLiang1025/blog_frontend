
import React from 'react';
import {
  Select
} from 'antd';

const {Option} = Select;

const userRoles = [
  {value: 0, label: 'Normal'},
  {value: 1, label: 'Admin'}
]

export function userRoleOptions() {
  return userRoles.map(item => {
    return (
      <Option key={item.value} value={item.value}>
        {item.label}
      </Option>
    )
  })
}

export function getRoleLabel(val){
  if(!val) return '';

  const r = userRoles.filter(item => item.value === val);
  if(r.length > 0) {
    return r[0].label
  }
  return ''
}

const blogFlags = [
  // {value: 1, label: 'Original'}
  "Original", "Reproduce"
]

export function getBlogFlagOptions () {
  return blogFlags.map(item => (
    <Option key={item} value={item}>
      {item}
    </Option>
  ))
}

const blogStatus = [
  {value: 0, label: "Save"},
  {value: 1, label: "Publish"}
]

export function getBlogStatusOptions () {
  return blogStatus.map(item => (
    <Option key={item.value} value={item.value}>
      {item.label}
    </Option>
  ))
}
export function getBlogStatusLabel(value){
  
  if(value === undefined || value === null) {
    return "";
  }
  const statusArr = blogStatus.filter(item => item.value === value);
  if(statusArr.length > 0) {
    return statusArr[0].label
  }
  return "";

}