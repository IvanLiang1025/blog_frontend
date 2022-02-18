import React, { Fragment } from 'react';
import { Row, Col, Icon } from 'antd';
import styles from "./index.less";
import { actions as categoryActions } from "@/redux/reducers/category";
import { actions as blogActions } from "@/redux/reducers/blog";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import BlogListView from '../Common/BlogListView';
import { decodeQuery } from '@/utils/crypt';
// import NavBar from '@/Components/NavBar';


const mapStateToProps = (state) => {
    return {
        categoryList: state.myCategory.data.list,
        blogList: state.myBlog.data.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            fetchHomeCategoryList: (payload, callback) => categoryActions.fetchHomeCategoryList(payload, callback),
            fetchHomeBlogList: (payload) => blogActions.fetchHomeBlogList(payload),
        }, dispatch)
    }
}


@connect(mapStateToProps, mapDispatchToProps)
class HomeCategory extends React.Component {


    state = {
        activeCategory: undefined,
    }


    componentDidMount() {
        const { fetchHomeCategoryList, fetchHomeBlogList, location } = this.props;
        const {query} = location;
        
        if(query){
           const {id} = decodeQuery(query);
           
           if(id) {
               fetchHomeCategoryList();
               this.setState({
                   activeCategory: id
               })
           }
        }else{
            fetchHomeCategoryList({}, (data) => {
                
                if(data && data.length>0 ){
                    this.setState({
                        activeCategory: data[0].categoryId
                    })
                }
            });
        }
        
    }

    handleCategoryClick = (categoryId) => {
        const {fetchHomeBlogList} = this.props;
        const {activeCategory} = this.state;


        if(activeCategory !== categoryId){
            fetchHomeBlogList({categoryId});

            this.setState({
                activeCategory: categoryId
            })
        }  
    }

    renderItem = (data) => {

        const {activeCategory} = this.state;

        return (
            <div key={data.categoryId} className={`${styles.tagContainer}`} onClick={() => this.handleCategoryClick(data.categoryId)}>
                <div className={`${activeCategory === data.categoryId ? styles.active : ""} ${styles.tag}`}>
                {/* <div className={`${styles.active} ${styles.tag}`}> */}
                    {data.name}
                </div>
                <div className={`${styles.count}`}>
                    {data.articleCount}
                </div>
            </div>
        )
    }

    render() {
        const { categoryList, blogList, } = this.props;
        
        return (

            <Fragment>
                <div className={styles.contentContainer}>
                <Row style={{marginBottom: 40}}>
                    <Col sm={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }}>
                        <div className={styles.categoryContainer}>
                            <div className={styles.titleRow}>
                                <Icon type="folder-open" className={styles.iconStyle}></Icon>
                                Category
                            </div>

                            <div className={styles.tagArea}>
                                {
                                    categoryList && categoryList.length > 0 
                                    && categoryList.map((category) => this.renderItem(category))
                                }
                                
                            </div>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ offset: 2, span: 20 }} lg={{ offset: 3, span: 18 }}>
                        <BlogListView forCategory categoryId={this.state.activeCategory}></BlogListView>
                    </Col>
                </Row>

            </div>
            </Fragment>
        )
    }
}

export default HomeCategory;