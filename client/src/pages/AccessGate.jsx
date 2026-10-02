function AccessGate() {
    function enterSite() {
        const apiBase =
            import.meta.env.VITE_API_BASE_URL ||
            'http://localhost:3000'

        const appUrl =
            window.location.origin +
            import.meta.env.BASE_URL +
            'login'

        const unlockUrl =
            `${apiBase}/unlock?return=${encodeURIComponent(appUrl)}`

        window.location.assign(unlockUrl)
    }

    return (
        <main className="access-page">
            <section className="access-card">

                <p className="access-eyebrow">
                    PADDLEMATCH
                </p>

                <h1>
                    Welcome to PaddleMatch
                </h1>

                <p className="access-description">
                    Find the right paddle, connect with players,
                    and compete on the leaderboard.
                </p>

                <p className="access-private">
                    This application is private.
                    Please authenticate to continue.
                </p>

                <button
                    className="access-button"
                    onClick={enterSite}
                >
                    Enter Site
                </button>

            </section>
        </main>
    )
}

export default AccessGate