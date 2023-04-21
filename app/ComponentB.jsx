import useServerTag from "./rscUtils"


async function ComponentB(){

    return <div>This is Component B</div>
}

export default useServerTag(ComponentB, "ComponentB")
