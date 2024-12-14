import {Skeleton} from "primereact/skeleton";
import {Divider} from "primereact/divider";


export const AccountSkeleton = () =>{


    return <>
        <div className={"flex flex-col items-center w-full h-full"}>
            <div className={"flex gap-10 w-full"}>
                <Skeleton shape="circle" size="8rem"></Skeleton>
                <div className={"flex flex-col self-center"}>
                    <div className={"flex flex-col"}>
                        <Skeleton className="mb-2" borderRadius="16px" width={"8rem"}></Skeleton>
                        <Skeleton className="mb-2" borderRadius="16px" width={"16rem"}></Skeleton>
                    </div>
                    <div className={"flex gap-2 mt-5"}>
                        <Skeleton className="mb-2" borderRadius="16px" width={"3rem"}></Skeleton>
                        <Skeleton className="mb-2" borderRadius="16px" width={"3rem"}></Skeleton>
                        <Skeleton className="mb-2" borderRadius="16px" width={"3rem"}></Skeleton>
                    </div>
                </div>

            </div>


            <div className={"w-full flex flex-col gap-4 mt-5"}>
                <Divider/>
                {
                    Array.from([1,2,3,4]).map((e)=>{
                        return   <div key={e} className={"flex flex-col gap-3 border-[1px] border-border rounded-lg p-4"}>
                            <Skeleton width={"10rem"} borderRadius="16px"/>
                            <div className={"flex flex-col gap-1"}>
                                <Skeleton width={"40rem"} borderRadius="16px" height={"0.5rem"}/>
                                <Skeleton width={"35rem"} borderRadius="16px" height={"0.5rem"}/>
                                <Skeleton width={"25rem"} borderRadius="16px" height={"0.5rem"}/>
                                <Skeleton width={"42rem"} borderRadius="16px" height={"0.5rem"}/>
                                <Skeleton width={"38rem"} borderRadius="16px" height={"0.5rem"}/>
                            </div>
                        </div>
                    })
                }


            </div>


        </div>


    </>


}