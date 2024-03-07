function generateMatchSummary(matchData) {
    // Function to format date
    function formatDate(dateInMillis) {
      const date = new Date(dateInMillis);
      return date.toLocaleDateString('en-US', { timeZone: 'UTC' });
    }
  
    // Function to format odds
    function formatOdds(odds) {
      return odds.map(oddsObj => `${oddsObj.provider}: ${oddsObj.team1} vs ${oddsObj.team2}`).join('\n- ');
    }
  
    // Main function to generate match summary
    function generateTextSummary() {
      return `
  **Match Summary:**\n
  \n
  - **Significance:** ${matchData.significance}\n
  - **Date:** ${formatDate(matchData.date)}\n
  - **Status:** ${matchData.status}\n
  \n
  **Teams:**\n
  1. **Team ${matchData.team1.name}**\n
     - Name: ${matchData.team1.name}\n
     - Rank: ${matchData.team1.rank}\n
     \n
  2. **Team ${matchData.team2.name}**\n
     - Name: ${matchData.team2.name}\n
     - Rank: ${matchData.team2.rank}\n
     \n
  **Match Details:**\n
  - **Format:** ${matchData.format.type} (${matchData.format.location})\n
  - **Event:** ${matchData.event.name}\n
  \n
  **Highlighted Players:**\n
  - **Team ${matchData.team1.name}:** ${matchData.highlightedPlayers.team1.name} (ID: ${matchData.highlightedPlayers.team1.id})\n
  - **Team ${matchData.team2.name}:** ${matchData.highlightedPlayers.team2.name} (ID: ${matchData.highlightedPlayers.team2.id})\n
  \n
  **Head to Head Results:**\n
  ${matchData.headToHead.map(result => `- Map: ${result.map}, Result: ${result.result}`).join('\n')}\n
  \n
  **Vetoes:**\n
  ${matchData.vetoes.map(veto => `- ${veto?.team?.name || 'Leftover'} ${veto.type} ${veto.map}`).join('\n')}\n
  \n
  **Odds:**\n
  - ${formatOdds(matchData.odds)}\n
  `;
    }
  
    // Call the main function and return the result
    return generateTextSummary();
  }
  
  module.exports = { generateMatchSummary }
  