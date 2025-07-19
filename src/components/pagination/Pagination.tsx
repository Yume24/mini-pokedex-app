import {useSearchParams} from "react-router";

export default function Pagination({maxPage}: { maxPage: number }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const changePage = (offset: number) => {
        const nextPage = Math.min(Math.max(currentPage + offset, 1), maxPage);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", nextPage.toString());
        setSearchParams(newParams);
    };

    return (
        <div className="flex justify-center items-center m-auto mt-4">
            <button
                onClick={() => changePage(-1)}
                className="btn"
                disabled={currentPage === 1}
            >
                «
            </button>
            <span className="mx-4">Page {currentPage}</span>
            <button
                onClick={() => changePage(1)}
                className="btn"
                disabled={currentPage === maxPage}
            >
                »
            </button>
        </div>
    );
}
