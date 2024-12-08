import {memo} from "react";
import {Card} from "primereact/card";
import Calendar from 'react-calendar';
import {useAppSelector} from "../../../../store/hooks.ts";
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../../config/routes.ts";
import {getApi} from "../../../../config/api.ts";
import {useQuery} from "react-query";
import {months} from "../../../../utils/months.ts";

export const Statistics = memo(() =>{

    const user = useAppSelector(state=>state.auth.user);
    const navigate = useNavigate();

    const fetchPostStatistics = async () =>{
        const response = await getApi().get("posts/statistics");
        return response?.data;
    }

    const {data, error, isLoading, refetch} = useQuery("postStatistics", fetchPostStatistics);

    const currentMonth = months[new Date().getMonth()+1]

    return <div className={"w-full flex flex-col gap-4"}>

        <div className={"flex"}>
            <div className={"text-3xl font-semibold mood-title py-1"}>Welcome back {user?.username} </div>
            <div className={"text-4xl"}>
                &#128512;
            </div>
        </div>

        <div className={"flex w-full gap-2"}>
            <Card className={"w-full border-[1px] border-border flex items-center justify-center"}>
                <Calendar value={new Date()} className={"w-full"}/>
            </Card>
            <Card className={"w-full flex items-center justify-center bg-[#0ea5e9]"}>
                <div className={"font-semibold text-2xl"}>
                    {data?.monthPostsCount} posts in {currentMonth}
                </div>
            </Card>
            <Card className={"w-full flex items-center justify-center bg-[#f97316]"}>
                <div className={"font-semibold text-2xl"}>
                    {data?.todayPostsCount} posts today
                </div>

            </Card>
        </div>
    </div>


});


