import { Injectable } from '@angular/core';

const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const APP_ID = 'appid=fee0e2984791eaa2566619a32f4e75df';
const UNITS = 'units=metric';
const dbName = 'ForecastDB';
const dbStoreName = 'ForecastStore';

@Injectable()
export class IndexedDBService {

  constructor() { }

/*
  connectToDB() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(dbName, 2);

      request.onerror = (err) => {
        console.log('DB: connection error');
        reject(err);
      };

      request.onsuccess = (e) => {
        console.log('DB: connection established');
        resolve(e);
      };

      request.onupgradeneeded = (e) => {
        console.log('DB: connecting...');
        const upgrade = e.currentTarget.result;
        upgrade.createObjectStore(dbStoreName, {keyPath: 'cityName'});
      };
    });
  }

  getDataFromDB(dataKey) {
    const dbConnection = this.connectToDB();
    return dbConnection.then((db: IDBDatabase) => new Promise((resolve, reject) => {
      let transaction = db.transaction([dbStoreName], 'readonly');
      let store = transaction.objectStore(dbStoreName);

      data.onerror = (err) => {
        console.log('DB: cannot get data');
        reject(err);
      };

      data.onsuccess = () => {
        console.log('DB: data received');
        resolve(data.result);
      };
    }));
  }

  addDataToDB(dataKey, data, requestTime) {
    const dbConnection = this.connectToDB();
    return dbConnection.then((db: IDBDatabase) => new Promise((resolve, reject) => {
      const transaction = db.transaction([dbStoreName], 'readonly');
      const store = transaction.objectStore(dbStoreName);

      const putRequest = store.put({
        cityName: dataKey,
        requestTime: requestTime,
        weatherData: data
      });

      putRequest.onerror = (err) => {
        console.log('DB: cannot add data');
        reject(err);
      };

      data.onsuccess = () => {
        console.log('DB: data added');
        resolve();
      };
    }));
  }

  existenceInDB(dataKey) {
    const dbConnection = this.connectToDB();
    return dbConnection.then((db: IDBDatabase) => new Promise((resolve, reject) => {
      let transaction = db.transaction([dbStoreName], 'readonly');
      let store = transaction.objectStore(dbStoreName);

      const data = store.get(dataKey);

      data.onerror = (err) => {
        console.log('DB: no such data in DB');
        reject(false);
      };

      data.onsuccess = () => {
        console.log('DB: data is in DB');
        resolve(true);
      };
    }));
  }
*/



  addInDB(cityName: string, requestDate: Date, weatherData) {
    const request = indexedDB.open('ForecastDB', 2);

    request.onupgradeneeded = (e) => {
      const dbHandler = request.result;

      dbHandler.createObjectStore('ForecastStore', {keyPath: 'cityName'});
      console.log('In addInDB method: DB updated.');
    };
    request.onerror = (e) => {
      console.log('In addInDB method: failed.', e);
    };
    request.onsuccess = () => {
      const db = request.result;
      console.log('In addInDB method: success.');

      const transaction = db.transaction(['ForecastStore'], 'readwrite');
      const store = transaction.objectStore('ForecastStore');

      store.add({
        cityName: cityName,
        requestDate: requestDate,
        weatherData: weatherData
      })
        .onsuccess = () => {
        db.close();
        console.log('In addInDB method: successfully added.');
      };
    };

  }

  getRequestData(cityName: string) {
    const request = indexedDB.open('ForecastDB', 2);

    request.onupgradeneeded = (e) => {
      const dbHandler = request.result;

      dbHandler.createObjectStore('CityName', {keyPath: 'cityName'});
      console.log('In getRequestData method: DB updated.');
    };
    request.onerror = (e) => {
      console.log('In getRequestData method: failed.', e);
    };
    request.onsuccess = (e) => {
      const db = request.result;
      console.log('In getRequestData method: success.');

      const transaction = db.transaction(['ForecastStore'], 'readwrite');
      const store = transaction.objectStore('ForecastStore');
      const data = store.get(cityName);

      data.onerror = (e) => {
        console.log('Cannot get request data.', e);
      };

      data.onsuccess = () => {
         return data.result;
      };
    };
  }

  existsInDB(cityName: string) {
    const request = indexedDB.open('ForecastDB', 2);

    request.onupgradeneeded = (e) => {
      const dbHandler = request.result;

      dbHandler.createObjectStore('ForecastStore', {keyPath: 'cityName'});
      console.log('In isExistsInDB method: DB updated.');
    };
    request.onerror = (e) => {
      console.log('In isExistsInDB method: failed.', e);
    };
    request.onsuccess = (e) => {
      const db = request.result;
      console.log('In isExistsInDB method: success.');

      const transaction = db.transaction(['ForecastStore'], 'readwrite');
      const store = transaction.objectStore('ForecastStore');
      const city = store.get(cityName);

      city.onerror = (e) => {
        db.close();
        return false;
      };

      city.onsuccess = () => {
        db.close();
        return true;
      };
    };
  }
}
