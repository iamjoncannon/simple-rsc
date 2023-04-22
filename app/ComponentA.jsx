import ComponentC from "./ComponentC";
import useServerTag from "./useServerTag";


async function ComponentA({ input }){
    return <div>This is ComponentA {input}<ComponentC/></div>
}

export default useServerTag(ComponentA, "ComponentA")