import {Card} from "primereact/card";
import {Skeleton} from "primereact/skeleton";


export const PostCardSkeleton = () => {


    return <Card header={(options) => <div className={options.className + " border-none"}>
        <Skeleton width={"50%"}/>
    </div>} className={"w-full p-4 border-[1px] border-border"}>

        <div className={"flex flex-col gap-2"}>
            {Array.from([6, 4, 5, 4, 8,]).map((e, index) => {
                return <Skeleton key={index} width={`${e * 5}%`}/>
            })}
        </div>
        <div className={"flex items-center w-full gap-2 mt-4"}>
            <Skeleton size={"32px"} shape={"circle"}/>
            <Skeleton width={"15%"}/>
        </div>

    </Card>
}