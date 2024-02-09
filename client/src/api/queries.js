import { gql } from "@apollo/client";

export const QUERY_PROJECTS = gql`
  query games {
    games {
      _id
      gameTitle
      appId
      originalRelease
      updatedRelease
      lastUpdate
      developer
      publisher
      totalFunding
      earlyAccessFunding
      earlyAccessCurrent
      earlyAccessEver
    }
  }
`;
