// src/components/search/SearchSidebar.jsx
import { Sidebar, SidebarButton, typeList } from "./SearchSidebar.styles";

export default function SearchSidebar({ type, counts, onTypeChange }) {
    return (
        <Sidebar>
            <h3>Search Results</h3>
            {typeList.map(({ key, label }) => (
                <SidebarButton
                    key={key}
                    active={type === key}
                    onClick={() => onTypeChange(key)}
                >
                    {label} <span>{counts[key] ?? 0}</span>
                </SidebarButton>
            ))}
        </Sidebar>
    );
}
