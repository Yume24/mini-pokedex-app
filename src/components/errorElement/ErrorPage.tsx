import { Link } from "react-router";

export default function ErrorPage() {
    return (
        <div className="flex flex-col justify-center item-center gap-5 m-5">
            <h1 className="text-4xl text-center">There was an error!</h1>
            <Link to="/" className="btn w-30 m-auto">Go home</Link>
        </div>
    )
}