import { Injectable } from '@angular/core';

const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const APP_ID = 'appid=fee0e2984791eaa2566619a32f4e75df';
const UNITS = 'units=metric';
const dbName = 'ForecastDB';

@Injectable()
export class IndexedDBService {

  constructor() { }

  connectToDB() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(dbName, 2);

      request.onerror = (err) => {
        console.log('DB: connection error');
        reject(err);
      };

      request.onsuccess = (event) => {
        console.log('DB: connection established');
        resolve(event.target.result);
      };

      request.onupgradeneeded = (e) => {
        console.log('DB: connecting...');
        const upgrade = e.currentTarget.result;
        upgrade.createObjectStore('DayForecast', {keyPath: 'cityName'});
        upgrade.createObjectStore('WeekForecast', {keyPath: 'cityName'});
      };
    });
  }

  getDataFromDB(dataKey, dbStoreName) {
    const dbConnection = this.connectToDB();
    return dbConnection.then((db: IDBDatabase) => new Promise((resolve, reject) => {
      const transaction = db.transaction([dbStoreName], 'readwrite');
      const store = transaction.objectStore(dbStoreName);
      const data = store.get(dataKey);

      data.onerror = (err) => {
        console.log('DB: cannot get data');
        reject(err);
      };

      data.onsuccess = () => {
        if (data.result) {
          console.log('DB: data received');
          resolve(data.result);
        } else {
          reject('DB: no such data in DB');
        }
      };
    }));
  }

  addDataToDB(dataKey, data, requestTime, dbStoreName) {
    const dbConnection = this.connectToDB();
    return dbConnection.then((db: IDBDatabase) => new Promise((resolve, reject) => {
      const transaction = db.transaction([dbStoreName], 'readwrite');
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
}
