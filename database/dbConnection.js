

import { connect } from 'mongoose';

 export const DB =  await connect('mongodb://127.0.0.1:27017/Sarah').then(()=>{
    console.log("Db is connected");
 }).catch(()=>{
    console.log("Db Disconnected");
 })
