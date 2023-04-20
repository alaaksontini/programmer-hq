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
        <div className={"main-section w-4/6 mx-8"}>
          <h1>Main Section</h1>
          {children}
        </div>
        <SidebarLayout>
          <h1>Right Sidebar</h1>
        </SidebarLayout>
      </div>
    </>
  )
}
