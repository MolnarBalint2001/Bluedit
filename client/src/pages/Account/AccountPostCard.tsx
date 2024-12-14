import {Panel} from "primereact/panel";
import {PostType} from "../../@types/post.type.ts";
import "./AccountPostCard.css";


type AccountPostCardProps = {
    postData:PostType
}
export const AccountPostCard = ({postData}:AccountPostCardProps) =>{


    return <Panel className={"account-post-card w-full"}  footer={new Date(postData.createdAt).toDateString()} header={postData.title}>
        {postData.content.slice(0,400)}
    </Panel>
}