// create a react layout component
// import React from "react"

export default function SidebarLayout({ children }) {
  return (
    // Generate layout with left side bar and right side bar
    <>
      <div className={"sidebar w-2/6 h-64 "}>{children}</div>
    </>
  )
}
