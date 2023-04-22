import React from 'react'
import ComponentC from "./ComponentC";


async function ComponentA({ input }){
    return <div>This is ComponentA {input}<ComponentC/></div>
}

ComponentA.tag = "ComponentA"
export default ComponentA