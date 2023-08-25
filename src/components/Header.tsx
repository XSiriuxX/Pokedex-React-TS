import styles from "./header.module.css";

type HeaderProps = {
  query: string;
  setQuery: (query: string) => void;
};

function Header({ query, setQuery }: HeaderProps) {
  return (
    <header className={styles.header}>
      <input
        className={styles.input}
        placeholder="Search a Pokemon"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </header>
  );
}

export default Header;
