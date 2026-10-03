import { useEffect, useState } from 'react'

import {
    acceptMatch,
    declineMatch,
    getCurrentPlayer,
    listMatches,
    listPlayers,
    logout,
    recordMatchResult,
    sendMatchRequest
} from '../api'

import PlayerCard from '../components/PlayerCard'

function PlayerMatch() {
    const [currentPlayer, setCurrentPlayer] =
        useState(null)

    const [players, setPlayers] = useState([])
    const [matches, setMatches] = useState([])

    const [skillLevel, setSkillLevel] =
        useState('')

    const [loading, setLoading] =
        useState(true)

    const [error, setError] =
        useState('')

    const [requestStatuses, setRequestStatuses] =
        useState({})

    const [processingMatch, setProcessingMatch] =
        useState(null)

    async function loadData() {
        try {
            const [
                player,
                playerData,
                matchData,
            ] = await Promise.all([
                getCurrentPlayer(),
                listPlayers(),
                listMatches(),
            ])

            setCurrentPlayer(player)
            setPlayers(playerData)
            setMatches(matchData)

            const statuses = {}
            const latestMatches = {}

            matchData.forEach((match) => {
                const otherPlayerId =
                    match.requester_id === player.id
                        ? match.opponent_id
                        : match.requester_id

                if (!latestMatches[otherPlayerId]) {
                    latestMatches[otherPlayerId] = match
                }
            })

            Object.values(latestMatches).forEach(
                (match) => {
                    if (
                        match.requester_id ===
                        player.id
                    ) {
                        if (
                            match.status === 'pending' ||
                            match.status === 'accepted'
                        ) {
                            statuses[match.opponent_id] =
                                'sent'
                        }

                        if (
                            match.status === 'declined'
                        ) {
                            statuses[match.opponent_id] =
                                'declined'
                        }
                    }
                }
            )

            setRequestStatuses(statuses)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    async function handleMatchUp(opponentId) {
        setError('')

        if (
            requestStatuses[opponentId] ===
            'sent'
        ) {
            return
        }

        setRequestStatuses(
            (previous) => ({
                ...previous,
                [opponentId]: 'sending',
            })
        )

        try {
            await sendMatchRequest(
                opponentId
            )

            setRequestStatuses(
                (previous) => ({
                    ...previous,
                    [opponentId]: 'sent',
                })
            )

            await loadData()
        } catch (error) {
            if (
                error.message ===
                'A match request already exists'
            ) {
                setRequestStatuses(
                    (previous) => ({
                        ...previous,
                        [opponentId]: 'sent',
                    })
                )

                return
            }

            setRequestStatuses(
                (previous) => ({
                    ...previous,
                    [opponentId]: 'error',
                })
            )

            setError(error.message)
        }
    }

    async function handleAccept(matchId) {
        setError('')
        setProcessingMatch(matchId)

        try {
            await acceptMatch(matchId)
            await loadData()
        } catch (error) {
            setError(error.message)
        } finally {
            setProcessingMatch(null)
        }
    }

    async function handleDecline(matchId) {
        setError('')
        setProcessingMatch(matchId)

        try {
            await declineMatch(matchId)
            await loadData()
        } catch (error) {
            setError(error.message)
        } finally {
            setProcessingMatch(null)
        }
    }

    async function handleWinner(
        matchId,
        winnerId
    ) {
        setError('')
        setProcessingMatch(matchId)

        try {
            await recordMatchResult(
                matchId,
                winnerId
            )

            await loadData()
        } catch (error) {
            setError(error.message)
        } finally {
            setProcessingMatch(null)
        }
    }

    async function handleLogout() {
        try {
            await logout()
        } finally {
            window.location.href =
                `${import.meta.env.BASE_URL}login`
        }
    }

    const filteredPlayers =
        players.filter((player) => {
            if (
                player.id ===
                currentPlayer?.id
            ) {
                return false
            }

            if (!skillLevel) {
                return true
            }

            return (
                player.skillLevel ===
                skillLevel
            )
        })

    const incomingRequests =
        matches.filter(
            (match) =>
                match.opponent_id ===
                currentPlayer?.id &&
                match.status === 'pending'
        )

    const acceptedMatches =
        matches.filter(
            (match) =>
                (
                    match.requester_id ===
                    currentPlayer?.id ||
                    match.opponent_id ===
                    currentPlayer?.id
                ) &&
                match.status === 'accepted'
        )

    const latestMatches = {}

    matches.forEach((match) => {
        const otherPlayerId =
            match.requester_id === currentPlayer?.id
                ? match.opponent_id
                : match.requester_id

        const existingMatch =
            latestMatches[otherPlayerId]

        if (
            !existingMatch ||
            new Date(match.created_at) >
            new Date(existingMatch.created_at)
        ) {
            latestMatches[otherPlayerId] = match
        }
    })

    const declinedRequests =
        Object.values(latestMatches).filter(
            (match) =>
                match.requester_id ===
                currentPlayer?.id &&
                match.status === 'declined'
        )

    if (loading) {
        return (
            <main className="player-page">
                <section className="page-heading">
                    <p className="eyebrow">
                        PLAYER MATCH
                    </p>

                    <h1>
                        Find Players to Play With
                    </h1>

                    <p>
                        Loading players...
                    </p>
                </section>
            </main>
        )
    }

    return (
        <main className="player-page">

            <section className="page-heading">
                <p className="eyebrow">
                    PLAYER MATCH
                </p>

                <h1>
                    Find Players to Play With
                </h1>

                <p>
                    Find players based on their
                    skill level and availability.
                </p>

                {currentPlayer && (
                    <div className="current-player-bar">
                        <span>
                            Logged in as{' '}
                            <strong>
                                {currentPlayer.name}
                            </strong>
                        </span>

                        <button
                            type="button"
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}
            </section>

            {declinedRequests.length > 0 && (
                <section className="match-section">
                    <h2>
                        Match Notifications
                    </h2>

                    {declinedRequests.map(
                        (match) => (
                            <article
                                className="match-notification"
                                key={match.id}
                            >
                                <div>
                                    <h3>
                                        Match request declined
                                    </h3>

                                    <p>
                                        {
                                            match.opponent_name
                                        }{' '}
                                        declined your request
                                        to play.
                                    </p>
                                </div>
                            </article>
                        )
                    )}
                </section>
            )}

            {incomingRequests.length > 0 && (
                <section className="match-section">
                    <h2>
                        Match Requests
                    </h2>

                    {incomingRequests.map(
                        (match) => (
                            <article
                                className="match-request-card"
                                key={match.id}
                            >
                                <div>
                                    <h3>
                                        {
                                            match.requester_name
                                        }
                                    </h3>

                                    <p>
                                        wants to play
                                        with you.
                                    </p>
                                </div>

                                <div className="match-actions">
                                    <button
                                        type="button"
                                        className="primary-button"
                                        onClick={() =>
                                            handleAccept(
                                                match.id
                                            )
                                        }
                                        disabled={
                                            processingMatch ===
                                            match.id
                                        }
                                    >
                                        {processingMatch ===
                                            match.id
                                            ? 'Processing...'
                                            : 'Accept'}
                                    </button>

                                    <button
                                        type="button"
                                        className="secondary-button"
                                        onClick={() =>
                                            handleDecline(
                                                match.id
                                            )
                                        }
                                        disabled={
                                            processingMatch ===
                                            match.id
                                        }
                                    >
                                        Decline
                                    </button>
                                </div>
                            </article>
                        )
                    )}
                </section>
            )}

            {acceptedMatches.length > 0 && (
                <section className="match-section">
                    <h2>
                        Record Match Result
                    </h2>

                    {acceptedMatches.map(
                        (match) => (
                            <article
                                className="match-request-card"
                                key={match.id}
                            >
                                <div>
                                    <h3>
                                        {
                                            match.requester_name
                                        }{' '}
                                        vs{' '}
                                        {
                                            match.opponent_name
                                        }
                                    </h3>

                                    <p>
                                        Who won the
                                        match?
                                    </p>
                                </div>

                                <div className="winner-buttons">
                                    <button
                                        type="button"
                                        className="primary-button"
                                        onClick={() =>
                                            handleWinner(
                                                match.id,
                                                match.requester_id
                                            )
                                        }
                                        disabled={
                                            processingMatch ===
                                            match.id
                                        }
                                    >
                                        {
                                            match.requester_name
                                        }{' '}
                                    </button>

                                    <button
                                        type="button"
                                        className="primary-button"
                                        onClick={() =>
                                            handleWinner(
                                                match.id,
                                                match.opponent_id
                                            )
                                        }
                                        disabled={
                                            processingMatch ===
                                            match.id
                                        }
                                    >
                                        {
                                            match.opponent_name
                                        }{' '}
                                    </button>
                                </div>
                            </article>
                        )
                    )}
                </section>
            )}

            <section className="player-filter">
                <label>
                    Skill Level

                    <select
                        value={skillLevel}
                        onChange={(event) =>
                            setSkillLevel(
                                event.target.value
                            )
                        }
                    >
                        <option value="">
                            All Skill Levels
                        </option>

                        <option value="Beginner">
                            Beginner
                        </option>

                        <option value="Recreational">
                            Recreational
                        </option>

                        <option value="Intermediate">
                            Intermediate
                        </option>
                    </select>
                </label>
            </section>

            <section className="player-list">
                {filteredPlayers.map(
                    (player) => (
                        <PlayerCard
                            key={player.id}
                            player={player}
                            onMatchUp={
                                handleMatchUp
                            }
                            requestStatus={
                                requestStatuses[
                                player.id
                                ]
                            }
                        />
                    )
                )}
            </section>

        </main>
    )
}

export default PlayerMatch