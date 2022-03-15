export default function SearchInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      placeholder="Search..."
    />
  );
}
