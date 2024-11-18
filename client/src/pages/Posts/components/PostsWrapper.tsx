import {PostCard} from "./PostCard.tsx";
import {Button} from "primereact/button";

const items = [
    {title: "Post1"},
    {title: "Post2"},
    {title: "Post3"},
    {title: "Post4"},
    {title: "Post5"},
    {title: "Post6"},
    {title: "Post7"},
    {title: "Post8"},
    {title: "Post9"},
    {title: "Post10"}
]

export const PostsWrapper = () => {


    return <div className={"flex flex-col items-center gap-4"}>
            <div>
                <Button icon={"pi pi-pencil"} label={"New post"} size={"small"}/>
            </div>

            {
                items.map((e) => {
                    return <PostCard key={e.title} data={e}/>
                })
            }
        </div>

}