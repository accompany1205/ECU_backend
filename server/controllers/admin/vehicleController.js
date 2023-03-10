import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const XLSX = require('xlsx')

import Vehicle from "../../models/vehicle.js";

const saveVehicle = async (data) => {
  const vehicle = new Vehicle({
    _id: new mongoose.Types.ObjectId(),
    vehicleType: data.VehicleType,
    brand: data.Brand,
    model: data.model,
    modelCode: data.ModelCode,
    modelType: data.ModelType,
    modelYear: data.ModelYear,
    version: data.Version,
    engineManufacturer: data.EngineManufacturer,
    engineModel: data.EngineModel,
    engineCode: data.EngineCode,
    fuel: data.Fuel,
    emissionStandardEuro: data.EmissionStandardEuro,
    emissionStandardTier: data.EmissionStandardTier,
    cm3: data.cm3,
    kW: data.KW,
    ps: data.PS,
    hp: data.HP,
    nm: data.NM,
    eCUType: data.ECUType,
    ecuBrand: data.EcuBrand,
    ecuMicroprocessor: data.EcuMicroprocessor,
    ecuVersion: data.EcuVersion,
    kESSv2YesNo: data.KESSv2YesNo,
    kESSv2Protocol: data.KESSv2Protocol,
    ktagYesNo: data.KtagYesNo,
    kTAGGroup: data.KTAGGroup,
    kTAGProtocol: data.KTAGProtocol,
    pWG3Protoco: data.PWG3Protocol,
  })
  await vehicle.save()
}
const autoSave = async (req, res) => {
  const workbook = XLSX.readFile("./source.xlsx")
  const sheet_name_list = workbook.SheetNames
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
  await Promise.all(
    xlData.map(async (data) => {
      // if(!(brands.filter((brand) => brand === data.Brand)).length && !(o_brands.filter((brand) => brand === data.Brand)).length) {
      //   brands.push(data.Brand)
      // }
      // await sleep(10000)
      await saveVehicle(data)
    })
  )
};


const vehicleController = {
  autoSave,
  
};

export default vehicleController;
