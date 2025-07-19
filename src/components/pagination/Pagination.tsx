import {useSearchParams} from "react-router";

export default function Pagination({maxPage}: { maxPage: number }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const changePage = (offset: number) => {
        return () => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", (currentPage + offset).toString());
            setSearchParams(newParams);
        }
    }

    return (<div className="flex justify-center items-center m-auto">
        <button onClick={changePage(-1)} className={`btn ${currentPage === 1 ? "btn-disabled" : ""}`}>«</button>
        <p className="m-5">Page {currentPage}</p>
        <button onClick={changePage(1)} className={`btn ${currentPage === maxPage ? "btn-disabled" : ""}`}>»</button>
    </div>)

}