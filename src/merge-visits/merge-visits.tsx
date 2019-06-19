import React from "react";
import dayjs from "dayjs";
import "./merge-visits.css";

export default function MergeVisits(props: MergeVisitsProps) {
  const [visits, setVisits] = React.useState([]);

  React.useEffect(() => {
    const queryParams = `&v=full&custom:(uuid)&patient=`;

    fetch(`/openmrs/ws/rest/v1/visit?${queryParams}${props.patientUuid}`)
     .then(resp => {
       if (resp.ok) {
         return resp.json();
       } else {
         throw Error(
           `Cannot fetch patient ${props.patientUuid} - server responded with '${resp.status}'`
         );
       }
     })
     .then(visits => {
       setVisits(visits.results);
     });
  }, []);
  
  return (
    <div>
      <p className="merge-visits-header">Merge Visits</p>
      <p className="header-text">Select the visits you want to merge together. (They must be consecutive)</p>
      {renderMergeVisitsTable()}
    </div>
  );

  function renderMergeVisitsTable() {
    return (
      <form>
        <table>
          <thead>
            <tr>
              <th>Merge</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Encounters</th>
            </tr>
          </thead>
          {renderVisits()}
        </table>
        {renderButtons()}
      </form>
    );
  }

  function renderVisits() {
    return (
      <tbody>
        {visits.map(visit => {
          return (
            <tr>
              <td>
                <input type="checkbox"/>
              </td>
              <td>
                {visit.startDatetime 
                  ? dayjs(visit.startDatetime).format('DD.MMM.YYYY')
                  : ''
                }
              </td>
              <td>
                {visit.stopDatetime
                  ? dayjs(visit.stopDatetime).format('DD.MMM.YYYY')
                  : ''
                }
              </td>
              <td>
                <div>
                  {visit.encounters.map(encounter => {
                    return encounter.encounterType.display
                  })
                  .join(', ')}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  function renderButtons() {
    return (
      <div>
        <input type="button" className="cancel" value="Return" />
        <input type="submit" className="confirm" value="Merge Selected Visits" />
      </div>
    );
  }
}

type MergeVisitsProps = {
  patientUuid: string;
};