import {Skeleton} from "primereact/skeleton";


export const CommentsSkeleton = ()=>{



    return <div className={"flex flex-col gap-4 py-2"}>
        {Array.from([0,1,2]).map((e)=>{
            return <div className={"flex flex-col gap-2"}>

                <div className={"flex gap-2 items-center"}>
                    <Skeleton shape={"circle"}  height={"32px"} width={"32px"}/>
                    <Skeleton width={"100px"}/>
                </div>


                <div className={"flex flex-col gap-1 ms-4"}>
                    <Skeleton width={"400px"}/>
                    <Skeleton width={"80px"}/>
                </div>
            </div>
        })}
    </div>
}