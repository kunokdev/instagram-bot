import { MongoClient, Db } from "mongodb";

export interface StorageConnectOptions {
  url: string;
  dbName: string;
}

export const storage = ({ url, dbName }: StorageConnectOptions): Promise<Db> => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) return reject(err);
      return resolve(client.db(dbName));
    });
  });
};
