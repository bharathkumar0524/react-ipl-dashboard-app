// Write your code here
import {Component} from 'react'
import './index.css'

class MatchCard extends Component {
  getMatchStatusClassName = matchStatus => {
    if (matchStatus === 'Won') {
      return 'match-won'
    }
    return 'match-lost'
  }

  render() {
    const {matchData} = this.props
    const {competingTeamLogo, competingTeam, matchStatus, result} = matchData
    const matchStatusClassName = `match-status ${this.getMatchStatusClassName(
      matchStatus,
    )}`

    return (
      <li className="match-card">
        <img
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
          className="competing-team-logo"
        />
        <p className="competing-team-heading">{competingTeam}</p>
        <p className="competing-team-result">{result}</p>
        <p className={matchStatusClassName}>{matchStatus}</p>
      </li>
    )
  }
}
export default MatchCard
