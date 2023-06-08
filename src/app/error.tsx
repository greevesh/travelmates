'use client'

const error = ({ error, reset}: { error: Error, reset: () => void}) => {
    return (
        <div>
            <h1>{ error.message || 'Something went wrong.' }</h1>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}

export default error