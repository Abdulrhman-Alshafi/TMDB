// src/components/search/SearchItem.styles.jsx
import styled from "styled-components";
import { User, Film, Search as SearchIcon } from "lucide-react";

/* ────── BASE IMG URL ────── */
export const IMG_BASE = "https://image.tmdb.org/t/p/w200";

/* ────── POSTERS ────── */
export const PosterWrapper = styled.div`
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

export const PersonPosterWrapper = styled(PosterWrapper)`
  width: 70px;
  height: 70px;
`;

export const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const IconPlaceholder = styled.div`
  width: 56px;
  height: 56px;
  color: #999;
  opacity: 0.75;
`;

/* ────── PERSON CARD ────── */
export const PersonCard = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 1rem;
  border-radius: 8px;
`;

export const PersonInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PersonName = styled.h3`
  font-size: 19px;
  font-weight: 600;
  color: #111;
`;

export const Department = styled.div`
  font-size: 16px;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: start;
  gap: 4px;
`;

export const KnownFor = styled.div`
  font-size: 0.95rem;
  color: #000;
  font-weight: 300;
  line-height: 1.4;
`;

/* ────── MEDIA ITEM ────── */
export const ResultItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
`;

export const Overview = styled.p`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Extra = styled.div`
  font-size: 0.85rem;
  color: #777;
  margin-top: 0.25rem;
`;

/* ────── PLACEHOLDERS ────── */
export const PersonPlaceholder = () => (
  <PersonPosterWrapper>
    <IconPlaceholder>
      <User size={56} strokeWidth={1.5} />
    </IconPlaceholder>
  </PersonPosterWrapper>
);

export const MediaPlaceholder = () => (
  <PosterWrapper>
    <IconPlaceholder>
      <Film size={56} strokeWidth={1.5} />
    </IconPlaceholder>
  </PosterWrapper>
);

export const FallbackPlaceholder = () => (
  <PosterWrapper>
    <IconPlaceholder>
      <SearchIcon size={56} strokeWidth={1.5} />
    </IconPlaceholder>
  </PosterWrapper>
);
