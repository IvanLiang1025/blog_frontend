import React from 'react';
import styles from './index.less';
import { Row, Col, Icon, Tag } from 'antd';

import {actions as categoryActions} from "@/redux/reducers/category";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import { encodeQuery } from '@/utils/crypt';
import {Link} from "react-router-dom";





const mapStateToProps = (state) => {
    return {
        loading: state.myBlog.isLoading,
        categoryList: state.myCategory.data.list,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            fetchHomeCategoryList: (payload) => categoryActions.fetchHomeCategoryList(payload),
          }, dispatch),
    }
} 



@connect(mapStateToProps, mapDispatchToProps)
class CategoryCard extends React.Component {

    componentDidMount(){
        const {fetchHomeCategoryList} = this.props;
        fetchHomeCategoryList();
    }


    renderRow = (data) => {
        return (
            <div className={styles.categoryRow} key={data.categoryId} onClick={() => this.goToCategory(data.categoryId)}>
                <div>{data.name}</div>
                <div>
                    <Tag color="cyan">{data.articleCount}</Tag>
                </div>
            </div>
        )
    }

    goToCategory = (id) =>  {
        this.props.history.push({
            pathname: "/category",
            query: encodeQuery({id})
        })
    }

    render() {
        const {categoryList} = this.props;

        return (

            <div className={styles.categoryContainer} >
                <Row className={styles.titleRow}>
                    <Col span={12}>
                        <div>
                            <Icon type="folder-open" className={styles.iconStyle}></Icon>
                            Category
                        </div>

                    </Col>
                    <Col span={12}>
                        <div className={styles.moreLink} >
                            <span>
                            <Link to="/category">More <Icon type="double-right"></Icon></Link>
                            </span>
                        </div>
                    </Col>
                </Row>
                <div style={{borderTop: "2px solid #555"}}>
                    {
                        categoryList && categoryList.map((category, index) => {
                            return this.renderRow(category)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default CategoryCard;