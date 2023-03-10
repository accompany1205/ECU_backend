import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const XLSX = require('xlsx')

import Vehicle from "../models/vehicle.js";

const getData = async (req, res) => {
  
  const { page, limit, search } = req.body;
  try {
    // execute query with page and limit values
    const vehicles = await Vehicle.find({
      $or: [
        {
          "vehicleType": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "brand": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "model": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "modelType": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "modelYear": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "version": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "ps": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "hp": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "eCUType": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "ecuBrand": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "ecuVersion": {
              "$regex": search,
              '$options': 'i'
          }
        },
        
      ]
      })
      .limit(limit * 1)
      .skip((page) * limit)
      .exec();

    // get total documents in the Posts collection 
    const count = await Vehicle.count({
      $or: [
        {
          "vehicleType": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "brand": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "model": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "modelType": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "modelYear": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "version": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "ps": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "hp": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "ecuType": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "ecuBrand": {
              "$regex": search,
              '$options': 'i'
          }
        },
        {
          "ecuVersion": {
              "$regex": search,
              '$options': 'i'
          }
        },
        
      ]
    });

    console.log(vehicles);

    // return response with posts, total pages, and current page
    res.json({
      vehicles,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      count: count
    });
  } catch (err) {
    console.error(err.message);
  }
}

const getBrand = async (req, res) => {
  try {
    let brands = await Vehicle.find({'vehicleType':'Car'}).select('brand');
    brands = brands.map((brand)=> brand.brand);
    console.log(brands);
    const data=[];
    brands.forEach((brand)=> {
      if(data.indexOf(brand) < 0)
        data.push(brand);
    })
    console.log(data);
    if(data.length > 0)
      res.json(data);
    else
      res.status(400).send('No brand exists!');
  }catch( err ) {
    console.log(err.message);
  }

}

const getModel = async (req, res) => {
  const {brandName} = req.body;
  try {
    let models = await Vehicle.find({
      'vehicleType':'Car',
      'brand' : brandName
    }).select('model');
    models = models.map((model)=> model.model);
    console.log("models ", models);
    const data=[];
    models.forEach((model)=> {
      if(data.indexOf(model) < 0)
        data.push(model);
    })
    console.log(data);
    if(data.length > 0)
      res.json(data);
    else
      res.status(400).send('No model exists!');
  }catch( err ) {
    console.log(err.message);
  }

}

const getVersion = async (req, res) => {
  const {brandName, modelName} = req.body;
  try {
    let versions = await Vehicle.find({
      'vehicleType':'Car',
      'brand' : brandName,
      'model' : modelName
    }).select('version');
    versions = versions.map((version)=> version.version);
    console.log("versions ", versions);
    const data=[];
    versions.forEach((version)=> {
      if(data.indexOf(version) < 0)
        data.push(version);
    })
    console.log(data);
    if(data.length > 0)
      res.json(data);
    else
      res.status(400).send('No version exists!');
  }catch( err ) {
    console.log(err.message);
  }
}

const getModelYear = async (req, res) => {
  const {brandName, modelName, versionName} = req.body;
  console.log(req.body);
  try {
    let years = await Vehicle.find({
      'vehicleType':'Car',
      'brand' : brandName,
      'model' : modelName,
      'version' : versionName
    }).select('modelYear');
    console.log(years);
    years = years.map((modelYear)=> modelYear.modelYear);
    console.log("years ", years);
    const data=[];
    years.forEach((modelYear)=> {
      if(data.indexOf(modelYear) < 0)
        data.push(modelYear);
    })
    console.log(data);
    if(data.length > 0)
      res.json(data);
    else
      res.status(400).send('No modelyear exists!');
  }catch( err ) {
    console.log(err.message);
  }
}

const getEngineModel = async (req, res) => {
  const {brandName, modelName, versionName, modelYear} = req.body;
  console.log(req.body);
  try {
    let engineModels = await Vehicle.find({
      'vehicleType':'Car',
      'brand' : brandName,
      'model' : modelName,
      'version' : versionName,
      'modelYear' : modelYear
    }).select('engineModel');
    engineModels = engineModels.map((engineModel)=> engineModel.engineModel? engineModel.engineModel : '' );
    console.log("engineModels ", engineModels);
    const data=[];
    engineModels.forEach((engineModel)=> {
      if(data.indexOf(engineModel) < 0)
        data.push(engineModel);
    })
    console.log(data);
    if(data.length > 0)
      res.json(data);
    else
      res.status(400).send('No modelyear exists!');
  }catch( err ) {
    console.log(err.message);
  }
}

const getFuel = async (req, res) => {
  const {brandName, modelName, versionName, modelYear} = req.body;
  console.log(req.body);

  let query = {
    'vehicleType':'Car',
    'brand' : brandName,
    'model' : modelName,
    'version' : versionName,
    'modelYear' : modelYear
  };
  if ( req.body.enginModel && req.body.enginModel !== '')
    query['enginModel'] = req.body.enginModel;
  try {
    let fuels = await Vehicle.find(query).select('fuel');
    fuels = fuels.map((fuel)=> fuel.fuel? fuel.fuel : '' );
    console.log("fuel ", fuels);
    const data=[];
    fuels.forEach((fuel)=> {
      if(data.indexOf(fuel) < 0)
        data.push(fuel);
    })
    console.log(data);
    if(data.length > 0)
      res.json(data);
    else
      res.status(400).send('No modelyear exists!');
  }catch( err ) {
    console.log(err.message);
  }
}
const getEcu = async (req, res) => {
  const {brandName, modelName, versionName, modelYear, fuel} = req.body;
  console.log(req.body);
  let query = {
    'vehicleType':'Car',
    'brand' : brandName,
    'model' : modelName,
    'version' : versionName,
    'modelYear' : modelYear,
    'fuel' : fuel
  };
  if ( req.body.enginModel && req.body.enginModel !== '' )
    query['enginModel'] = req.body.enginModel;
  try {
    let ecus = await Vehicle.find(query).select(['ecuBrand', 'ecuVersion']);
    ecus = ecus.map((ecu)=> ecu.ecuBrand + ' ' + ecu.ecuVersion);
    console.log("ecus ", ecus);
    const data=[];
    ecus.forEach((ecu)=> {
      if(data.indexOf(ecu) < 0)
        data.push(ecu);
    })
    console.log(data);
    if(data.length > 0)
      res.json(data);
    else
      res.status(400).send('No modelyear exists!');
  }catch( err ) {
    console.log(err.message);
  }
}

const uploadRequest = async (req, res) => {
  
}

const vehicleController = {
  getData,
  getBrand,
  getModel,
  getVersion,
  getModelYear,
  getEngineModel,
  getFuel,
  getEcu
};

export default vehicleController;
