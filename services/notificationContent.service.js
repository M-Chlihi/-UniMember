const buildPollResultEmail = ({ poll, results }) => {
  const resultsRows = results.results
    .map(
      (option) => `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #ddd;">
            ${option.title}
          </td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #ddd;">
            ${option.votes}
          </td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #ddd;">
            ${option.percentage}%
          </td>
        </tr>
      `,
    )
    .join("");

  let resultSection = "";

  if (results.tie) {
    const tiedOptions = results.winners
      .map((winner) => `<li>${winner.title} — ${winner.votes} votes</li>`)
      .join("");

    resultSection = `
      <h3>The poll ended in a tie.</h3>
      <ul>
        ${tiedOptions}
      </ul>
    `;
  } else if (results.winner) {
    resultSection = `
      <h3>🏆 Winner</h3>
      <p>
        <strong>${results.winner.title}</strong>
        — ${results.winner.votes} votes
      </p>
    `;
  } else {
    resultSection = `
      <p>No votes were submitted for this poll.</p>
    `;
  }

  return {
    subject: `CS Club — Poll Result: ${poll.title}`,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>${poll.title}</h2>

        <p>The voting period has ended.</p>

        ${resultSection}

        <h3>Results</h3>

        <table
          style="
            border-collapse: collapse;
            width: 100%;
            max-width: 600px;
          "
        >
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px 12px;">
                Course
              </th>
              <th style="text-align: left; padding: 8px 12px;">
                Votes
              </th>
              <th style="text-align: left; padding: 8px 12px;">
                Percentage
              </th>
            </tr>
          </thead>

          <tbody>
            ${resultsRows}
          </tbody>
        </table>

        <p>
          <strong>Total votes:</strong>
          ${results.totalVotes}
        </p>
      </div>
    `,
  };
};

module.exports = {
  buildPollResultEmail,
};
