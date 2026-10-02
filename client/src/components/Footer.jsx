function Footer() {
  const base = import.meta.env.BASE_URL

  return (
    <footer className="footer">
      <h2>PaddleMatch</h2>

      <p>Find players. Find paddles. Play better.</p>

      <div className="footer-socials">
        <a href="#" aria-label="Facebook">
          <img src={`${base}images/assets/fb.png`} alt="Facebook" />
        </a>

        <a href="#" aria-label="Instagram">
          <img src={`${base}images/assets/ig.png`} alt="Instagram" />
        </a>

        <a
          href="mailto:paddlematch@example.com"
          aria-label="Email PaddleMatch"
        >
          <img src={`${base}images/assets/mail.png`} alt="Email" />
        </a>
      </div>

      <p className="footer-copyright">
        © 2026 PaddleMatch. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer