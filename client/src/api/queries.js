import { gql } from "@apollo/client";

export const QUERY_GAMES = gql`
  query games {
    games {
      _id
      name
      steam_appid
      originalRelease
      updatedRelease
      lastUpdate
      developer
      publisher
      totalFunding
      earlyAccessFunding
      isEarlyAccess
      everEarlyAccess
    }
  }
`;

export const QUERY_SINGLE_STEAM_GAME = gql`
  query singleSteamGame($steam_appid: Int!) {
    singleSteamGame(steam_appid: $steam_appid) {
      name
      steam_appid
      developer
      publisher
      isEarlyAccess
      release_date
    }
  }
`;

export const QUERY_SINGLE_API_GAME = gql`
  query singleApiGame($steam_appid: Int!) {
    singleApiGame(steam_appid: $steam_appid) {
      name
      steam_appid
      developer
      publisher
      isEarlyAccess
      everEarlyAccess
      originalRelease
      updatedRelease
      lastUpdate
      totalFunding
      earlyAccessFunding
    }
  }
`;
