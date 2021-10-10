const Navbar = () => {
    return(
        <nav className="navbar">
            <h1>EmojiSuggest</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/about" style={{
                    color: "white",
                    backgroundColor: "red",
                    borderRadius: "8px",
                    padding: "5px"
                }}>About</a>
            </div>
        </nav>
    );
}

export default Navbar;