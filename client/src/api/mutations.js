import { gql } from "@apollo/client";

export const ADD_GAME = gql`
  mutation addGame($steam_appid: Number) {
    addGame(steam_appid: $steam_appid)
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
    earlyAccessCurrent
    earlyAccessEver
  }
`;

export const UPDATE_GAME = gql`
  mutation updateGame($steam_appid: Number) {
    updateGame(steam_appid: $steam_appid)
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
    earlyAccessCurrent
    earlyAccessEver
  }
`;

export const PROCESS_GAME_SEARCH = gql`
  mutation processGame($steam_appid: Number) {
    processGame(steam_appid: $steam_appid)
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
    earlyAccessCurrent
    earlyAccessEver
  }
`;