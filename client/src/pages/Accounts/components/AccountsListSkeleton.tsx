import {Skeleton} from "primereact/skeleton";
import {memo} from "react";


export const AccountsListSkeleton = memo(() =>{


    return <div className={"flex flex-col gap-4 mt-4"}>
        {Array.from([1,2,3,4,5,6,7,8]).map((e:number)=>{
            return <div key={e} className={"flex gap-2"}>
                <Skeleton size="2.5rem" shape={"circle"}></Skeleton>
                <div className={"flex flex-col gap-2 mt-2"}>
                    <Skeleton width={"100px"} ></Skeleton>
                    <Skeleton width={"200px"} ></Skeleton>
                </div>

            </div>
        })}
    </div>


});