// src/components/search/SearchResults.jsx
import SearchItem from "../SearchItem";
import {
    Results,
    Header,
    Empty,
    Pagination,
    PageBtn
} from "./SearchResults.styles";

export default function SearchResults({ type, results, loading, page, totalPages, onPageChange }) {
    return (
        <Results>
            {loading ? (
                <Empty>Loading…</Empty>
            ) : results.length === 0 ? (
                <Empty>No results found.</Empty>
            ) : (
                <div>
                    {results.map((item) => (
                        <SearchItem key={item.id} item={item} type={type} />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <Pagination>
                    <PageBtn disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
                        Previous
                    </PageBtn>
                    <span>
                        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                    </span>
                    <PageBtn disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
                        Next
                    </PageBtn>
                </Pagination>
            )}
        </Results>
    );
}
