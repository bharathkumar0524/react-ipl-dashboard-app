// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {isLoading: true, matchesData: []}

  componentDidMount() {
    this.getMatchDetails()
  }

  getFormattedObject = matchData => ({
    umpires: matchData.umpires,
    result: matchData.result,
    manOfTheMatch: matchData.man_of_the_match,
    id: matchData.id,
    date: matchData.date,
    venue: matchData.venue,
    competingTeam: matchData.competing_team,
    competingTeamLogo: matchData.competing_team_logo,
    firstInnings: matchData.first_innings,
    secondInnings: matchData.second_innings,
    matchStatus: matchData.match_status,
  })

  getMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: this.getFormattedObject(data.latest_match_details),
      recentMatches: data.recent_matches.map(recentMatch =>
        this.getFormattedObject(recentMatch),
      ),
    }
    console.log(formattedData)
    this.setState({isLoading: false, matchesData: formattedData})
  }

  renderRecentMatches = () => {
    const {matchesData} = this.state
    const {recentMatches} = matchesData
    return (
      <ul className="recent-matches-details-list">
        {recentMatches.map(eachMatch => (
          <MatchCard matchData={eachMatch} key={eachMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {matchesData} = this.state
    const {teamBannerUrl, latestMatch} = matchesData

    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatches()}
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height="50" />
    </div>
  )

  getTeamClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-route-container ${this.getTeamClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}
export default TeamMatches
