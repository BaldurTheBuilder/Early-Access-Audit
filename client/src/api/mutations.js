import { gql } from "@apollo/client";

export const ADD_GAME = gql`
  mutation addGame($steam_appid: Int!) {
    addGame(steam_appid: $steam_appid) {
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

export const UPDATE_GAME = gql`
  mutation updateGame($steam_appid: Int!) {
    updateGame(steam_appid: $steam_appid) {
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

export const PROCESS_GAME_SEARCH = gql`
  mutation processGame($steam_appid: Int!) {
    processGame(steam_appid: $steam_appid) {
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

export const CREATE_DEVELOPER = gql`
  mutation createDeveloper($developerName: String!, $developerGame: Int) {
    createDeveloper(developerName: $developerName, developerGame: $developergame) {
      developerName
      developerGames
      earlyAccessTrackRecord
    }
  }
`;