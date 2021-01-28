import { IRemoteConfig } from "src/utils/model/common";

let configs: IRemoteConfig | undefined

export const initConfig = (): Promise<IRemoteConfig> => {
  return new Promise((resolve) => {
    /**
     * Some data from remote config API place here
     */
    const remoteConfig = {
      headers: {
        'App-Version': 'tripla-API/1.0',
        'Client-Session':
          'eyJhbGciOiJIUzI1NiJ9.eyJwZXJtaXNzaW9uIjoiYWxsIiwiYWNjZXNzaWJsZV90eXBlIjpudWxsLCJhY2Nlc3NpYmxlX2lkcyI6W10sImFwcF90eXBlcyI6W10sImRhdGV0aW1lIjoxNTkwMzc3MTc2fQ.umO_E61cOwZtq0GlinD_tPSAQLqk1gffas2mWu2qLPE',
        'Tripla-Locale': 'en',
        'Content-Type': 'application/json'
      }
    }

    /**
     * Some data from remote config API place here
     */
    const firebaseConfig = {
      apiKey: "AIzaSyBy5vSW_ZxGe_kUeOCg78lWrvKagS8syb0",
      authDomain: "coffee-house-3eb7f.firebaseapp.com",
      projectId: "coffee-house-3eb7f",
      storageBucket: "coffee-house-3eb7f.appspot.com",
      messagingSenderId: "697952750982",
      appId: "1:697952750982:web:fa292d4817ad01f9f67007",
      measurementId: "G-5B2Y035WY6"
    };
   

    const config: IRemoteConfig = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNpdGVjb3JlXFxJbnRlcm5hbEFwaVVzZXIiLCJuYmYiOjE1ODk3OTA5MTIsImV4cCI6NDc0NTQ2NDUxMiwiaWF0IjoxNTg5NzkwOTEyLCJpc3MiOiJodHRwOi8vZGV2LnJlZGlzYXBpLm15c3RheXMuY29tIn0.1qb571XqYjwpJZc3KgwOquB2gRYnjohTDNBUwpV8x8I',
      endpoint: 'https://devtriplaapi.mystays.com',
      domain: 'https://devtriplaapi.mystays.com',
      googleApiKey: 'AIzaSyCMHguf4YtVuO7CzkFawENNXmIXSJ-c9uM',
      adminUsername: 'toanlv@smartosc.com',
      adminPassword: 'testtest',
      session_endpoint: 'https://idp.tripla.ai',
      membership_endpoint: 'https://endpoint.tripla.ai',
      new_membership_endpoint: 'https://endpoint.tripla.ai',
      new_session_endpoint: 'https://idp.tripla.ai',
      firebaseConfig,
      ...remoteConfig,
    }

    configs = config

    resolve(config)
  })
}

export const getBaseConfig = (): IRemoteConfig | undefined => {
  return configs;
}
