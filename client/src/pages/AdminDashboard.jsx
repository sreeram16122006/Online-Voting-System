{/* LIVE VOTING NEWS TICKER */}
<div className="live-ticker">
  <div className="ticker-label">
    <span className="ticker-live-dot"></span>
    LIVE UPDATE
  </div>

  <div className="ticker-window">
    <div className="ticker-track">
      <span>
        <strong>{stats.votedStudents}</strong> students have voted
      </span>

      <span className="ticker-divider">◆</span>

      <span>
        <strong>{stats.notVotedStudents}</strong> students remaining
      </span>

      <span className="ticker-divider">◆</span>

      <span>
        Voting percentage:{" "}
        <strong>{stats.turnoutPercentage}%</strong>
      </span>

      <span className="ticker-divider">◆</span>

      <span>
        <strong>{stats.votedStudents}</strong> students have voted
      </span>

      <span className="ticker-divider">◆</span>

      <span>
        <strong>{stats.notVotedStudents}</strong> students remaining
      </span>

      <span className="ticker-divider">◆</span>

      <span>
        Voting percentage:{" "}
        <strong>{stats.turnoutPercentage}%</strong>
      </span>

      <span className="ticker-divider">◆</span>
    </div>
  </div>
</div>