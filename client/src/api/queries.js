import { gql } from "@apollo/client";

export const QUERY_PROJECTS = gql`
  query projects {
    projects {
      _id
      projectTitle
      briefDescription
      detailedDescription
      techUsed
      repoLink
      liveLink
      image
    }
  }
`;