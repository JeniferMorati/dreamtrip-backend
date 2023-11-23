import { Document, Schema, model } from "mongoose";
import { IVacationPackage } from "./interfaces/vacation-package.entity.interface";

type VacationPackageDocument = Document & IVacationPackage;

const VacationPackageScheme = new Schema<IVacationPackage>(
  {
    travels: {
      type: [Schema.Types.ObjectId],
      ref: "Travel",
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const VacationPackage = model<IVacationPackage>(
  "Package",
  VacationPackageScheme,
);

export { VacationPackage, IVacationPackage, VacationPackageDocument };
