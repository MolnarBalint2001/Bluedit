import {memo, useRef} from "react";
import {OverlayPanel} from "primereact/overlaypanel";
import {Badge} from "primereact/badge";
import {FollowersType} from "../../@types/followers.type.ts";
import {Divider} from "primereact/divider";
import {AccountGlobalItem} from "../../components/AccountGlobalItem/AccountGlobalItem.tsx";


type AccountFollowersProps = {
    followers: FollowersType[],
}

export const AccountFollowers = memo(({followers}: AccountFollowersProps) => {

    console.log(followers)
    const opRef = useRef<OverlayPanel>(null);


    return <>
        <Badge value={`${followers.length} followers`} className={"hover:brightness-110 cursor-pointer"}
               onClick={(e) => opRef.current?.show(e, e.target)}/>
        <OverlayPanel ref={opRef} style={{maxHeight: 600}}>

            <div className={"font-semibold"}>Followers</div>
            <Divider/>

            {
                followers.length === 0 ? "There are no followers yet." : <div className={"flex flex-col gap-2"}>
                    {followers.map((e) => <AccountGlobalItem accountData={e.followerId}/>)}
                </div>
            }


        </OverlayPanel>
    </>

});