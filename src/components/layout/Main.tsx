import React from "react";

export default function Main({children}: {children: React.ReactNode}) {
    return(
        <main className="w-full h-screen dark:bg-tertiary-light p-2">
            {children}
        </main>
    )
}