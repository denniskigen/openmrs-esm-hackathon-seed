import React from "react";

export default function RelationshipsParcel(props: RelationshipsProps) {
  const [relationships, setRelationships] = React.useState([]);

  React.useEffect(() => {
    const queryParams = `
      custom:(uuid,personA:
      (uuid,display,personName,
      birthdate,isPatient,personId),
      personB:(uuid,display,personName,
      birthdate,isPatient,personId),
      relationshipType
    `.replace(/\s/g, "");
  
    const url = `/openmrs/ws/rest/v1/relationship?limit=5&person=${props.patientUuid}&v=${queryParams})`;

    fetch(`${url}`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(
            `Cannot fetch relationships - server responded with '${resp.status}'`
          );
        }
      })
      .then(relationships => {
        setRelationships(relationships.results);
      });
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        Relationships
      </div>
      {relationships.length > 0 
        ? (renderRelationships()) 
        : (
         <span>No relationships</span>
        )
      }
    </div>
  )
  
  function renderRelationships() {
    return (
      <ul className="list-group">
      {relationships.map(relationship => {
        if (relationship) {
          if (props.patientUuid === relationship.personA.uuid) {
            return (
              <li className="list-group-item">
                <a href={`/openmrs/spa/patient-dashboard/${relationship.personB.uuid}`}>
                  {relationship.personB.display}
                </a>
                <span className="badge badge-primary float-right">
                  {relationship.relationshipType.bIsToA}
                </span>
              </li>
            );
          } else {
            return (
              <li className="list-group-item">
                <a href={`/openmrs/spa/patient-dashboard/${relationship.personA.uuid}`}>
                  {relationship.personA.display}
                </a>
                <span className="badge badge-primary float-right">
                  {relationship.relationshipType.aIsToB}
                </span>
              </li>
            );
          }
        }
        })}
      </ul>
    );
  }
}

type RelationshipsProps = {
  patientUuid: string;
};
