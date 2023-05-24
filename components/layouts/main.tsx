// create a React layout component
import React from "react"

import SidebarLayout from "~components/layouts/sidebar"

export default function MainLayout({ children }) {
  return (
    // Generate layout with left side bar and right side bar
    <>
      <div className="flex flex-row justify-stretch">
        <SidebarLayout>
          <h1>Left Sidebar</h1>
        </SidebarLayout>
        <div className={"main-section w-full"}>
          <div className="__top-bar flex justify-end">
              <div>
                1230pt
              </div>
              <div className={"__profile-pic w-1/6"}>
                <div className={"rounded-full w-full bg-slate-500"}></div>
              </div>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
