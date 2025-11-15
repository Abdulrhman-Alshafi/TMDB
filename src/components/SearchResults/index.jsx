// src/components/search/SearchResults.jsx
import styled from "styled-components";
import SearchItem from "../SearchItem";


const Results = styled.div`
  flex: 1;
  min-width: 320px;
`;

const Header = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.5rem;
`;

const Empty = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
  margin: 2rem 0;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const PageBtn = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  border-radius: 6px;
  background: ${({ disabled }) => (disabled ? "#f0f0f0" : "#007bff")};
  color: ${({ disabled }) => (disabled ? "#999" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-weight: 500;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #0056b3;
    transform: translateY(-1px);
  }
`;

export default function SearchResults({
    query,
    type,
    results,
    loading,
    page,
    totalPages,
    onPageChange,
}) {
    const typeLabel = {
        movie: "Movies",
        tv: "TV Shows",
        person: "People",
        collection: "Collections",
        company: "Companies",
        keyword: "Keywords",
        multi: "All",
    }[type];

    return (
        <Results>
            <Header>
                Results for <strong>“{query}”</strong> — {typeLabel}
            </Header>

            {loading ? (
                <Empty>Loading…</Empty>
            ) : results.length === 0 ? (
                <Empty>No results found.</Empty>
            ) : (
                <div>{results.map((item) => <SearchItem key={item.id} item={item} type={type} />)}</div>
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