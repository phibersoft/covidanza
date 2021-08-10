import React from "react";

interface LayoutProps {
    children?: any;
}

export default function Layout({children}: LayoutProps){
    return (
        <div>
            Layout

            <hr />

            {children}
        </div>
    )
}