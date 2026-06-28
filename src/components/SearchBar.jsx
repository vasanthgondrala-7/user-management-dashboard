export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-field">
      <span className="sr-only">Search users</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name, email, or department"
        aria-label="Search by name, email, or department"
      />
    </label>
  );
}
