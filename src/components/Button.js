export default function Button(values) {
    if (values.type === 'quantity') {
        return (
            <button className="font-bold w-[6.5vw] h-full rounded-[6.5vw] bg-gradient-to-b from-gray-100 to-gray-400 text-[3vw] text-black p-1" onClick={() => values.func(values)}>{values.name}</button>
        )
    }
    else if (values.type === 'colspan') {
        return (
            <div style={
                {
                    gridColumn: `span ${values.value}`,
                }
            }></div>
        )
    }
    else if (values.type === 'modifier') {
        return (
            <button className="font-bold w-[5vw] h-[5vw] rounded-lg bg-gradient-to-b from-yellow-700 to-yellow-800 text-[1.65vw] p-1 rotate-45 translate-x-[0.955vw] translate-y-[0.955vw]" onClick={() => values.func(values)}>
                <div className="transform -rotate-45">{values.name}</div>
            </button>
        )
    }
    else if (values.type === 'meal' || values.type === 'fries' || values.type === 'soda') {
        return (
            <button className="font-bold w-[6.5vw] h-full rounded-lg bg-gradient-to-b from-red-500 to-red-950 text-[1.3vw] p-1 relative" onClick={
                () => {
                    values.func(values)
                }
            }>
                {
                    values.value !== undefined && values.value !== "" && <>
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[3.5vw] border-l-transparent border-r-[3.5vw] border-r-white border-t-[3.5vw] border-t-transparent rounded-br-lg"></div>
                    <div className="absolute bottom-0 right-0 text-black pr-1">{values.value}</div>
                </>
                }
                {values.name}
            </button>
        )
    } else if (values.type === 'function') {
        return (
            <button className={["font-bold w-[6.5vw] h-full rounded-lg bg-gradient-to-b from-gray-500 to-gray-950 text-[1.3vw] p-1 " + (values.value === 1 ? "text-lime-400 " : "")]} onClick={values.a_func}>{values.name}</button>
        )
    } else if (values.type === 'spec') {
        return (
            <button className={["font-bold w-[6.5vw] h-full rounded-lg bg-gradient-to-b from-green-500 to-green-950 text-[1.3vw] p-1 " + (values.value === 1 ? "text-lime-400 " : "")]} onClick={values.a_func}>{values.name}</button>
        )
    } else if (values.type === 'drink') {
        return (
            <button className="font-bold w-[6.5vw] h-full rounded-lg bg-gradient-to-b from-blue-500 to-blue-950 text-[1.3vw] p-1" onClick={() => values.func(values)}>{values.name}</button>
        )
    }
}