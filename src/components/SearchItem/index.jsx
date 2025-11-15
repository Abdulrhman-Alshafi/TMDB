// src/components/search/SearchItem.jsx
import styled from "styled-components";
import { User, Film, Search as SearchIcon } from "lucide-react";

const IMG_BASE = "https://image.tmdb.org/t/p/w200";

/* ────── POSTERS ────── */
const PosterWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 150px;
  border-radius: 6px;
  overflow: hidden;
  background: #e0e0e0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PersonPosterWrapper = styled(PosterWrapper)`
  width: 110px;
  height: 165px;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IconPlaceholder = styled.div`
  width: 56px;
  height: 56px;
  color: #999;
  opacity: 0.75;
`;

/* ────── PERSON CARD ────── */
const PersonCard = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,.07);
  transition: transform .2s, box-shadow .2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0,0,0,.12);
  }
`;

const PersonInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PersonName = styled.h3`
  margin: 0 0 .4rem;
  font-size: 1.35rem;
  color: #111;
`;

const Department = styled.div`
  font-size: .9rem;
  color: #007bff;
  margin-bottom: .3rem;
`;

const KnownFor = styled.div`
  font-size: .95rem;
  color: #444;
  line-height: 1.4;
  strong { color: #111; }
  .chip { color: #007bff; font-weight: 500; }
`;

const Popularity = styled.div`
  margin-top: .5rem;
  font-size: .85rem;
  color: #777;
  strong { color: #d32f2f; }
`;

/* ────── MEDIA ITEM ────── */
const ResultItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  &:last-child { border-bottom: none; }
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
`;

const Overview = styled.p`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Extra = styled.div`
  font-size: 0.85rem;
  color: #777;
  margin-top: 0.25rem;
`;

/* ────── PLACEHOLDERS ────── */
const PersonPlaceholder = () => (
    <PersonPosterWrapper>
        <IconPlaceholder>
            <User size={56} strokeWidth={1.5} />
        </IconPlaceholder>
    </PersonPosterWrapper>
);
const MediaPlaceholder = () => (
    <PosterWrapper>
        <IconPlaceholder>
            <Film size={56} strokeWidth={1.5} />
        </IconPlaceholder>
    </PosterWrapper>
);
const FallbackPlaceholder = () => (
    <PosterWrapper>
        <IconPlaceholder>
            <SearchIcon size={56} strokeWidth={1.5} />
        </IconPlaceholder>
    </PosterWrapper>
);

export default function SearchItem({ item, type }) {
    const media = item.media_type || type;

    /* ────── PERSON ────── */
    if (media === "person") {
        const known = Array.isArray(item.known_for)
            ? item.known_for
                .map((k) => k.title || k.name || "")
                .filter(Boolean)
                .slice(0, 5)
                .join(" • ")
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
                    {item.known_for_department && <Department>{item.known_for_department}</Department>}
                    {known ? (
                        <KnownFor>
                            <strong>Known for:</strong> <span className="chip">{known}</span>
                        </KnownFor>
                    ) : (
                        <KnownFor>No known works</KnownFor>
                    )}
                    {item.popularity != null && (
                        <Popularity>
                            Popularity: <strong>{item.popularity.toFixed(1)}</strong>
                        </Popularity>
                    )}
                </PersonInfo>
            </PersonCard>
        );
    }

    /* ────── MOVIE / TV ────── */
    if (["movie", "tv"].includes(media) || item.poster_path) {
        const title = item.title || item.name || "Untitled";
        const year = (item.release_date || item.first_air_date || "").split("-")[0] || "TBD";
        const rating = item.vote_average ? `${item.vote_average.toFixed(1)}/10` : "N/A";

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
                    {item.overview ? <Overview>{item.overview}</Overview> : <Overview>No overview.</Overview>}
                </Info>
            </ResultItem>
        );
    }

    /* ────── FALLBACK (keyword, collection, company…) ────── */
    const fallbackTitle = item.name || item.title || "—";
    return (
        <ResultItem>
            <FallbackPlaceholder />
            <Info>
                <Title>{fallbackTitle}</Title>
                {item.overview && <Overview>{item.overview}</Overview>}
            </Info>
        </ResultItem>
    );
}