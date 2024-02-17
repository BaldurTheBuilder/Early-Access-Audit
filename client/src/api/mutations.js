import { gql } from "@apollo/client";

export const ADD_GAME = gql`
  mutation addGame($steamGame: SteamGame) {
    addGame(steamGame: $steamGame)
    _id
    earlyAccessCurrent
    earlyAccessEver
    originalRelease
    updatedRelease
    lastUpdate
    name
    developer
    publisher
    steam_appid
    totalFunding
    earlyAccessFunding
  }
`;

export const UPDATE_GAME = gql`
  mutation updateGame($steamGame: SteamGame) {
    updateGame(steamGame: $steamGame)
    _id
    earlyAccessCurrent
    earlyAccessEver
    originalRelease
    updatedRelease
    lastUpdate
    name
    developer
    publisher
    appId
    totalFunding
    earlyAccessFunding
  }
`;