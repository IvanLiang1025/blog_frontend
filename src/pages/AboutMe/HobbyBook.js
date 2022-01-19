
import React from 'react';
import HTMLFlipBook from "react-pageflip";
// import styles from "./index.less"
import styles from "./book.less";

import CodingIcon from '@/assets/coding.svg';
import BookIcon from '@/assets/book.svg';
import SkiIcon from "@/assets/skiing.png";
import TravelIcon from "@/assets/travel.svg";
// import SakuraImg from "@/assets/sakura.gif";  
import CodeImg from "@/assets/programming.jpg"; 
import ReadingImg from "@/assets/reading.jpg";
import SkiImg from "@/assets/skiing.jpg";
import TravelImg from "@/assets/travel.jpg";



const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className={`${styles.page} ${styles.pageCover}`} ref={ref} data-density="hard">
            <div className="page-content">
                <h2>{props.children}</h2>
            </div>
        </div>
    );
});

const Page = React.forwardRef((props, ref) => {

    const {number, imgSrc} = props;

    const left = number % 2 === 1;

    return (
        <div className={`${styles.page} ${left? styles.left : styles.right}`} ref={ref}>
            <div className={styles.pageContent}>
                {/* <h2 className={styles.pageHeader}>Page header - {props.number}</h2> */}
                <div className={styles.pageImage}>
                    {imgSrc &&
                    <img src={imgSrc} className={styles.img}></img>
                    }
                </div>
                <div className={styles.pageText}>{props.children}</div>
                <div className={`${styles.pageFooter}`}>{props.number}</div>
            </div>
        </div>
    );
});



class HobbyBook extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            totalPage: 0,
        };
    }

    nextButtonClick = () => {
        this.flipBook.getPageFlip().flipNext();
    };

    prevButtonClick = () => {
        this.flipBook.getPageFlip().flipPrev();
    };

    onPage = (e) => {
        this.setState({
            page: e.data,
        });
    };

    componentDidMount() {
        console.log(this.flipBook);
        // this.setState({
        //     totalPage: this.flipBook.getPageFlip().getPageCount(),
        // });
    }

    

    render() {

        return (
            <div>
                <div>

                    <img width={80} src='https://www.animatedimages.org/data/media/345/animated-panda-image-0108.gif'></img>
                
                    {/* <img width={80} src='https://cdn.pixabay.com/photo/2014/04/03/10/00/panda-309548_1280.png'></img> */}
                    <div className={`${styles.msgBox} ${styles.fadeIn}`}>
                        <div className={styles.typing}> Click the page to flip.</div>
                    </div>
                    {/* <div className={styles.}></div> */}
                </div>
                <HTMLFlipBook
                    width={550}
                    height={733}
                    size="stretch"
                    minWidth={315}
                    maxWidth={1000}
                    minHeight={400}
                    maxHeight={1533}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    onFlip={this.onPage}
                    onChangeOrientation={this.onChangeOrientation}
                    onChangeState={this.onChangeState}
                    className={styles.bookContainer}
                    // className={styles.page}
                    ref={(el) => (this.flipBook = el)}
                >

                    <PageCover>My Favour</PageCover>
                    <Page number={1} imgSrc={CodeImg}>
                        <div className={styles.textHeader}>

                            <img className={styles.textIcon} src={CodingIcon}></img>
                            &nbsp;Programming
                        </div>
                        <div>
                            Curious about IT industry and attracted by programming, I have been learning various 
                            programming skills. 
                            Even though the road to become master is hard, I will never stop.
                    
                            
                        </div>
                    </Page>
                    <Page number={2} imgSrc={ReadingImg}>
                        <div className={styles.textHeader}>

                            <img className={styles.textIcon} src={BookIcon}></img>
                            &nbsp;Reading
                        </div>
                        <div>
                             Reading a good book is like making a new friend. I have been addicted to reading various books since I was a child.
                            
                        </div>
                    </Page>
                    <Page number={3} imgSrc={SkiImg}>
                        <div className={styles.textHeader}>

                            <img className={styles.textIcon} src={SkiIcon}></img>
                            &nbsp;Sports
                        </div>
                        <div>
                            I am a big fan of skiing. Going skking with my friends in winter is a nacessary 
                            activity for me.
                        </div>
                    </Page>
                    <Page number={4} imgSrc={TravelImg}>
                        <div className={styles.textHeader}>

                            <img className={styles.textIcon} src={TravelIcon}></img>
                            &nbsp;Travelling
                        </div>
                        <div>
                            Travelling enbales me to be exposed to different kinds of 
                            amazing culture customs and charming scenes. 
                        </div>
                    </Page>
                    {/* <Page number={2} >Lorem ipsum...</Page>
                    <Page number={3}>Lorem ipsum...</Page>
                    <Page number={4}>Lorem ipsum...</Page> */}
                    {/* <PageCover>THE END</PageCover> */}

                </HTMLFlipBook>

                {/* <div className="container">
                    <div>

                        <button type="button" onClick={this.prevButtonClick}>
                            Previous page
                        </button>

                        [<span>{this.state.page}</span> of
                        <span>{this.state.totalPage}</span>]

                        <button type="button" onClick={this.nextButtonClick}>
                            Next page
                        </button>

                    </div>
                    <div>

                        State: <i>{this.state.state}</i>, orientation: <i>{this.state.orientation}</i>

                    </div>
                </div> */}
            </div>
        );
    }
}

export default HobbyBook;