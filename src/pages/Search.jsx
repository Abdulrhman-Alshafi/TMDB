import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createSearchParams } from "react-router-dom";   // optional, used for pagination
import styled from "styled-components";
import { API_KEY } from "../request";

const TMDB_BASE = "https://api.themoviedb.org/3";

/* ---------- Styled components (unchanged) ---------- */
const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;
`;
const Sidebar = styled.aside`
  min-width: 180px;
  flex-shrink: 0;
`;
const SidebarTitle = styled.h3`
  margin-bottom: 1rem;
`;
const SidebarButton = styled.button`
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  background: ${({ active }) => (active ? "#007bff" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  &:hover {
    background: #007bff;
    color: #fff;
  }
`;
const Results = styled.div`
  flex: 1;
`;
const ResultItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
`;
const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;
const PageButton = styled.button`
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  border: 1px solid #007bff;
  background: ${({ disabled }) => (disabled ? "#ccc" : "#007bff")};
  color: ${({ disabled }) => (disabled ? "#666" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s;
  &:hover:not(:disabled) {
    background: #0056b3;
  }
`;

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const query = searchParams.get("query") || "";
    const type = searchParams.get("type") || "movie";
    const page = parseInt(searchParams.get("page") || "1", 10);

    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    /* ---------- FETCH WHEN query / type / page CHANGE ---------- */
    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            try {
                const url = `${TMDB_BASE}/search/${type}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
                    query
                )}&page=${page}`;
                const res = await fetch(url);
                const data = await res.json();
                setResults(data.results || []);
                setTotalPages(data.total_pages || 1);
            } catch (err) {
                console.error("Search fetch error:", err);
            }
        };

        fetchResults();
    }, [query, type, page]);               // <-- ONLY these deps

    /* ---------- TYPE CHANGE ---------- */
    const handleTypeChange = (newType) => {
        setSearchParams({ query, type: newType, page: 1 });
    };

    /* ---------- PAGE CHANGE ---------- */
    const goToPage = (newPage) => {
        const params = createSearchParams({ query, type, page: newPage });
        navigate({ search: params.toString() });
    };

    return (
        <Container>
            <Sidebar>
                <SidebarTitle>Filter by Type</SidebarTitle>
                {["movie", "tv", "person"].map((t) => (
                    <SidebarButton
                        key={t}
                        active={type === t}
                        onClick={() => handleTypeChange(t)}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </SidebarButton>
                ))}
            </Sidebar>

            <Results>
                <h2>
                    Results for "{query}" ({type})
                </h2>

                {results.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    results.map((item) => (
                        <ResultItem key={item.id}>
                            {item.title || item.name}
                        </ResultItem>
                    ))
                )}

                <Pagination>
                    <PageButton disabled={page <= 1} onClick={() => goToPage(page - 1)}>
                        Prev
                    </PageButton>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <PageButton
                        disabled={page >= totalPages}
                        onClick={() => goToPage(page + 1)}
                    >
                        Next
                    </PageButton>
                </Pagination>
            </Results>
        </Container>
    );
}