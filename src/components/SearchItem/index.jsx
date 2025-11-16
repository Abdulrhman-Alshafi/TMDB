// src/components/search/SearchItem.jsx
import {
  IMG_BASE,
  PosterWrapper,
  PersonPosterWrapper,
  Poster,
  PersonCard,
  PersonInfo,
  PersonName,
  Department,
  KnownFor,
  ResultItem,
  Info,
  Title,
  Overview,
  Extra,
  PersonPlaceholder,
  MediaPlaceholder,
} from "./SearchItem.styles";

export default function SearchItem({ item, type }) {
  const media = item.media_type || type;

  /* ────── PERSON ────── */
  if (media === "person") {
    const known = Array.isArray(item.known_for)
      ? item.known_for
          .map((k) => k.title || k.name || "")
          .filter(Boolean)
          .slice(0, 5)
          .join(" , ")
      : null;

    return (
      <PersonCard>
        {item.profile_path ? (
          <PersonPosterWrapper>
            <Poster src={`${IMG_BASE}${item.profile_path}`} alt={item.name} />
          </PersonPosterWrapper>
        ) : (
          <PersonPlaceholder />
        )}
        <PersonInfo>
          <PersonName>{item.name}</PersonName>
          {item.known_for_department && (
            <Department>
              {item.known_for_department}
              {" • "}
              <KnownFor>
                <span className="chip">{known}</span>
              </KnownFor>
            </Department>
          )}
        </PersonInfo>
      </PersonCard>
    );
  }

  /* ────── MOVIE / TV ────── */
  if (["movie", "tv"].includes(media) || item.poster_path) {
    const title = item.title || item.name || "Untitled";
    const year =
      (item.release_date || item.first_air_date || "").split("-")[0] || "TBD";
    const rating = item.vote_average
      ? `${item.vote_average.toFixed(1)}/10`
      : "N/A";

    return (
      <ResultItem>
        {item.poster_path ? (
          <PosterWrapper>
            <Poster src={`${IMG_BASE}${item.poster_path}`} alt={title} />
          </PosterWrapper>
        ) : (
          <MediaPlaceholder />
        )}
        <Info>
          <Title>{title}</Title>
          <Extra>
            {year} • <strong>Rating: {rating}</strong>
          </Extra>
          {item.overview ? (
            <Overview>{item.overview}</Overview>
          ) : (
            <Overview>No overview.</Overview>
          )}
        </Info>
      </ResultItem>
    );
  }

  /* ────── FALLBACK ────── */
  const fallbackTitle = item.name || item.title || "—";
  return (
    <ResultItem>
      <Info>
        <Title>{fallbackTitle}</Title>
        {item.overview && <Overview>{item.overview}</Overview>}
      </Info>
    </ResultItem>
  );
}
