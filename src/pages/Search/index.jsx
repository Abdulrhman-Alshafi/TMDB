import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";

import SearchSidebar from "../../components/SearchSidebar";
import SearchResults from "../../components/SearchResults";
import endpoints from "../../services/endpoints";
import { tmdbFetch } from "../../services/tmdbClient";
import { Container } from "./Search.styles";

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

  //end points
  const searchEndpoints = {
    movie: endpoints.searchMovie,
    tv: endpoints.searchTv,
    person: endpoints.searchPerson,
    collection: endpoints.searchCollection,
    company: endpoints.searchCompany,
    keyword: endpoints.searchKeyword,
    multi: endpoints.searchMulti,
  };

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

    const fetchData = async () => {
      try {
        const data = await tmdbFetch(
          searchEndpoints[type] || searchEndpoints.movie,
          {
            query,
            page,
            language: "en-US",
          }
        );
        setResults(data.results ?? []);
        setTotalPages(Math.min(data.total_pages ?? 1, 500));

        // Fetch counts for sidebar
        const allCounts = await Promise.all(
          Object.entries(searchEndpoints).map(async ([key, endpoint]) => {
            const res = await tmdbFetch(endpoint, {
              query,
              page: 1,
              language: "en-US",
            });
            return { key, count: res.total_results || 0 };
          })
        );
        const countsObj = {};
        allCounts.forEach(({ key, count }) => (countsObj[key] = count));
        setCounts(countsObj);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

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
