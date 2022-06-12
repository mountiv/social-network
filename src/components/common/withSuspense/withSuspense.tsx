import React, {Suspense} from "react";
import {Preloader} from "../Preloader/Preloader";

export const withSuspense = (Component: any) => (props: any) => {
    return <Suspense fallback={<Preloader/>}>
        <Component {...props}/>
    </Suspense>
}