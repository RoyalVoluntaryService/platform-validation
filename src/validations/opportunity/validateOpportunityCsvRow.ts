import type { CsvValidatorImportValue, CsvValidatorResponse } from "../../types/csvValidation";
import { validateOpportunityCauseForCSV } from "./opportunityCause";
import { validateOpportunityStatusForCSV } from "./opportunityStatus";
import { validateOpportunityTypeForCSV } from "./opportunityType";

export const validateCsvRowDataAndReturnErrors = async (
    // title: string | null, 
    // description: string | null, 
    opportunityType: CsvValidatorImportValue,
    commitment: CsvValidatorImportValue,
    cause: CsvValidatorImportValue,
    // postcode: string | null, 
    // startDate: string | null, 
    // endDate: string | null, 
    // requirements: string | null, 
    status: CsvValidatorImportValue,
    // volunteersRequired: number | null, 
    // dbsCheck: boolean | null, 
    // trainingRequired: boolean | null, 
    // ageRequirement: number | null
) => {
    // const isAbove18 = age > 18;
    // const isFullName = name.split(" ").length > 1;
    const data: {
        opportunityType?: [CsvValidatorResponse];
        status?: [CsvValidatorResponse];
        cause?: [CsvValidatorResponse];
        commitment?: [CsvValidatorResponse];
    } = {

    };
    const opportunityTypeValidator = validateOpportunityTypeForCSV(opportunityType)
    const opportunityStatusValidator = validateOpportunityStatusForCSV(status)
    const opportunityCauseValidator = await validateOpportunityCauseForCSV(cause)
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