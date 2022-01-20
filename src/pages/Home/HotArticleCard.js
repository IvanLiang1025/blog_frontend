
import React from 'react';

import styles from './index.less';
import {Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions } from "@/redux/reducers/blog";
import { date2YMD } from '@/utils/dateUtils';
import { encodeUrlParam } from '@/utils/crypt';


const mapStateToProps = (state) => {
    return {
        hotList: state.myBlog.hotList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({
            fetchHotList: (payload) => actions.fetchHotList(payload)
        }, dispatch)
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class HotArticleCard extends React.Component{


    componentDidMount(){
        const {fetchHotList} = this.props;

        fetchHotList();
    }

    goToDetail = (id) => {
        this.props.history.push({
            pathname: `/blog/detail/${encodeUrlParam(id)}`,
            // query: encodeQuery({ id })
        })
    }

    renderItem = (data) => {
        return (
            <div className={styles.itemContainer} onClick={() =>this.goToDetail(data.articleId)} key={data.articleId}>
                <div className={styles.left}>
                    <img className={styles.picture} src="https://res-blog-public.s3.ca-central-1.amazonaws.com/default_avatar.jpg"></img>
                </div>
                <div className={styles.right}>
                    <div className={styles.name}>{data.title}</div>
                    <div>
                        <Icon type="calendar"></Icon>&nbsp;{date2YMD(data.createDate)}
                        &nbsp;<Icon type="eye"></Icon>&nbsp;{data.viewCount}
                    </div>
                </div>
            </div>
        )
    }

    render (){

        const {hotList} = this.props;

        return (
            <div className={styles.cardContainer}>
                <div className={styles.title}>
                   <Icon type="fire" style={{color: "#ffbf00"}}></Icon>  Hot Articles
                </div>
                <div>
                    {hotList && hotList.length > 0 && hotList.map((item, index) => {
                        return this.renderItem(item)
                    })}
                </div>
            </div>
        )
    }
}

export default HotArticleCard;
