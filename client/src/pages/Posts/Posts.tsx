import {PostsWrapper} from "./components/PostsWrapper.tsx";
import {Statistics} from "./components/Statistics/Statistics.tsx";
import {Divider} from "primereact/divider";
import "./Posts.css";
import {Discover} from "./components/Discover/Discover.tsx";

const Posts = () =>{


    return (
        <>
            <Statistics/>
            <Divider/>
            <Discover/>
            <Divider/>
            <PostsWrapper/>
        </>
    );


}


export default Posts;