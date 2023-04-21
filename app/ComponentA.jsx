import ComponentC from "./ComponentC";
import useServerTag from "./rscUtils";


async function ComponentA({ input }){
    return <div>This is ComponentA {input}<ComponentC/></div>
}

export default useServerTag(ComponentA, "ComponentA")