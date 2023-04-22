import React from 'react'
import ComponentC from "./C/ComponentC";

async function ComponentA({ input }){
    return <div>This is Component A {input}<ComponentC/></div>
}

ComponentA.tag = "ComponentA"
export default ComponentA