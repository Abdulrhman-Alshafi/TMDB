import React from "react";
import {
  SearchTrending,
  SearchTrendingWrapper,
  SearchTrendingHeader,
  TrendingList,
  TrendingItem,
  TrendingItemContent,
} from "./Header.styles";
import { TrendingUp } from "lucide-react";
import up from "../../assets/up.svg";

const TrendingDropdown = ({
  searchText,
  trending,
  trendingLoading,
  trendingError,
  searchResults,
  searchLoading,
  searchError,
  onItemClick,
}) => {
  const isInputEmpty = !searchText.trim();
  const items = isInputEmpty ? trending : searchResults.slice(0, 10);
  const loading = isInputEmpty ? trendingLoading : searchLoading;
  const error = isInputEmpty ? trendingError : searchError;

  return (
    <SearchTrending>
      <SearchTrendingWrapper>
        <SearchTrendingHeader>
          <img src={up} alt="trending" />
          <h3>{isInputEmpty ? "Trending" : "Search Results"}</h3>
        </SearchTrendingHeader>
      </SearchTrendingWrapper>
      <TrendingList>
        {loading ? (
          <TrendingItem>
            <TrendingItemContent>
              <span style={{ color: "#666", fontStyle: "italic" }}>
                Loading...
              </span>
            </TrendingItemContent>
          </TrendingItem>
        ) : error ? (
          <TrendingItem>
            <TrendingItemContent>
              <span style={{ color: "#e74c3c" }}>Failed to load</span>
            </TrendingItemContent>
          </TrendingItem>
        ) : items.length === 0 ? (
          <TrendingItem>
            <TrendingItemContent>
              <span style={{ color: "#666" }}>No results</span>
            </TrendingItemContent>
          </TrendingItem>
        ) : (
          items.map((item) => {
            const title = item.title || item.name || "Untitled";
            return (
              <TrendingItem key={item.id} onClick={() => onItemClick(item)}>
                <TrendingItemContent>
                  {isInputEmpty && <TrendingUp size={18} />}
                  <span>{title}</span>
                </TrendingItemContent>
              </TrendingItem>
            );
          })
        )}
      </TrendingList>
    </SearchTrending>
  );
};

export default TrendingDropdown;
