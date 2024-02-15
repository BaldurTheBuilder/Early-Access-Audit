import { gql } from "@apollo/client";

export const QUERY_GAMES = gql`
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

export const QUERY_SINGLE_GAME = gql`
  query singleGame($steam_appid: Int!) {
    singleGame(steam_appid: $steam_appid) {
      name
      steam_appid
      developer
      publisher
      isEarlyAccess
      release_date
    }
  }
`;
