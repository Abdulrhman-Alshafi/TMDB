// src/components/search/SearchPage.jsx
import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";               // <-- styled-components
import { API_KEY } from "../../request";
import SearchSidebar from "../../components/SearchSidebar";
import SearchResults from "../../components/SearchResults";



/* ────── CONTAINER (moved inside this file) ────── */
const Container = styled.div`
  max-width: 1400px;
  margin: 108px auto;
  padding: 30px 40px;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  min-height: 70vh;
  background: #fff;
  color: #000;
`;

const TMDB_BASE = "https://api.themoviedb.org/3";

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const query = searchParams.get("query")?.trim() || "";
    const type = searchParams.get("type") || "movie";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [counts, setCounts] = useState({});

    /* ────── FETCH ────── */
    useEffect(() => {
        if (!query) {
            setResults([]);
            setTotalPages(1);
            setCounts({});
            return;
        }

        const controller = new AbortController();
        setLoading(true);

        const endpoints = {
            movie: "/search/movie",
            tv: "/search/tv",
            person: "/search/person",
            collection: "/search/collection",
            company: "/search/company",
            keyword: "/search/keyword",
            multi: "/search/multi",
        };

        const url = `${TMDB_BASE}${endpoints[type] || endpoints.movie}?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}&page=${page}&language=en-US`;

        fetch(url, { signal: controller.signal })
            .then((r) => {
                if (!r.ok) throw new Error(String(r.status));
                return r.json();
            })
            .then((data) => {
                setResults(data.results ?? []);
                setTotalPages(Math.min(data.total_pages ?? 1, 500));

                // ───── FETCH COUNTS FOR SIDEBAR ─────
                Promise.all(
                    Object.entries(endpoints).map(([key, endpoint]) =>
                        fetch(
                            `${TMDB_BASE}${endpoint}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`
                        )
                            .then((res) => res.json())
                            .then((j) => ({ key, count: j.total_results || 0 }))
                    )
                ).then((allCounts) => {
                    const obj = {};
                    allCounts.forEach(({ key, count }) => (obj[key] = count));
                    setCounts(obj);
                });
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    console.error(err);
                    setResults([]);
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [query, type, page]);

    /* ────── HANDLERS ────── */
    const changeType = (newType) =>
        setSearchParams({ query, type: newType, page: "1" });

    const goPage = (p) => {
        if (p < 1 || p > totalPages || p === page) return;
        const params = createSearchParams({ query, type, page: String(p) });
        navigate({ search: params.toString() }, { replace: true });
    };

    return (
        <Container>
            <SearchSidebar
                query={query}
                type={type}
                counts={counts}
                onTypeChange={changeType}
            />
            <SearchResults
                query={query}
                type={type}
                results={results}
                loading={loading}
                page={page}
                totalPages={totalPages}
                onPageChange={goPage}
            />
        </Container>
    );
}