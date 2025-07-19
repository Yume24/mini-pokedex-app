import {useSearchParams} from "react-router";
import React from "react";

export default function Pagination({maxPage}: { maxPage: number }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const pageOptions = Array.from({length: maxPage}, (_, i) => i + 1);
    const changePage = (offset: number) => {
        const nextPage = Math.min(Math.max(currentPage + offset, 1), maxPage);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", nextPage.toString());
        setSearchParams(newParams);
    };
    const handlePageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPage = Number(e.target.value);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", selectedPage.toString());
        setSearchParams(newParams);
    };

    return (
        <div className="flex justify-center items-center m-auto mt-4">
            <button
                onClick={() => changePage(-1)}
                className="btn btn-neutral btn-outline"
                disabled={currentPage === 1}
            >
                «
            </button>
            <div className="mx-4 flex items-center">
                <span className="mr-2">Page</span>
                <label htmlFor="select" className="sr-only">Select page</label>
                <select
                    className="select select-bordered select-sm w-20"
                    value={currentPage}
                    onChange={handlePageSelect}
                    id="select"
                >
                    {pageOptions.map(page => (
                        <option key={page} value={page}>
                            {page}
                        </option>
                    ))}
                </select>
                <span className="ml-2">of {maxPage}</span>
            </div>
            <button
                onClick={() => changePage(1)}
                className="btn btn-neutral btn-outline"
                disabled={currentPage === maxPage}
            >
                »
            </button>
        </div>
    );
}
