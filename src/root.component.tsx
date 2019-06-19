import React from "react";
import MergeVisits from "./merge-visits/merge-visits";

export default function Root(props: RootProps) {
  return (
    <div>
      <MergeVisits patientUuid={props.patientUuid} />
    </div>
  );
}

type RootProps = {
  patientUuid: string;
};
