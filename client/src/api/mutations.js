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

export const UPDATE_DEVELOPER = gql`
  mutation updateDeveloper($developerName: String!, $developerGame: Int!) {
    updateDeveloper(developerName: $developerName, developerGame: $developergame) {
      developerName
      developerGames
      earlyAccessTrackRecord
    }
  }
`;

export const CREATE_PUBLISHER = gql`
  mutation createPublisher($publisherName: String!, $publisherGame: Int) {
    createPublisher(publisherName: $publisherName, publisherGame: $publisherGame) {
      publisherName
      publisherGames
      earlyAccessTrackRecord
    }
  }
`;

export const UPDATE_PUBLISHER = gql`
  mutation updatePublisher($publisherName: String!, $publisherGame: Int!) {
    updatePublisher(publisherName: $publisherName, publisherGame: $publisherGame) {
      publisherName
      publisherGames
      earlyAccessTrackRecord
    }
  }
`;