import React from "react";
import RelationshipsParcel from "./relationships/relationships";

export default function Root(props: RootProps) {
  return (
    <div>
      <RelationshipsParcel patientUuid={props.patientUuid} />
    </div>
  );
}

type RootProps = {
  patientUuid: string;
};
