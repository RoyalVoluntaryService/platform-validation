import { Cause } from "@prisma/client";
import type { CsvValidatorImportValue, CsvValidatorResponse } from "../../types/csvValidation";
import { validateOpportunityCauseForCSV } from "./opportunityCause";
import { validateOpportunityStatusForCSV } from "./opportunityStatus";
import { validateOpportunityTypeForCSV } from "./opportunityType";

export const validateCsvRowDataAndReturnErrors = (
    opportunityType: CsvValidatorImportValue,
    commitment: CsvValidatorImportValue,
    cause: CsvValidatorImportValue,
    status: CsvValidatorImportValue,
    inputData: {
        causes: Pick<Cause, 'causeName'>[]
    }
) => {
    const data: {
        opportunityType?: [CsvValidatorResponse];
        status?: [CsvValidatorResponse];
        cause?: [CsvValidatorResponse];
        commitment?: [CsvValidatorResponse];
    } = {

    };
    const opportunityTypeValidator = validateOpportunityTypeForCSV(opportunityType)
    const opportunityStatusValidator = validateOpportunityStatusForCSV(status)
    const opportunityCauseValidator = validateOpportunityCauseForCSV(cause, inputData.causes)
    // const opportunityCommitmentValidator = validateOpportunityCommitmentForCSV(commitment)
    if (opportunityTypeValidator !== null) {
        data.opportunityType = [opportunityTypeValidator]
    }
    if (opportunityStatusValidator !== null) {
        data.status = [opportunityStatusValidator]
    }
    if (opportunityCauseValidator !== null) {
        data.cause = [opportunityCauseValidator]
    }
    // if (opportunityCommitmentValidator !== null) {
    //     data.commitment = [opportunityCommitmentValidator]
    // }
    if (Object.keys(data).length !== 0) {
        return data;
    }
    return null;
};