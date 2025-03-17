
import type { CsvCauseInput, CsvValidatorImportValue, CsvValidatorResponse } from "../../types/csvValidation";
import { validateOpportunityCauseForCSV } from "./opportunityCause";
import { validateOpportunityCommitmentForCSV } from "./opportunityCommitment";
import { validateOpportunityStatusForCSV } from "./opportunityStatus";
import { validateOpportunityTypeForCSV } from "./opportunityType";
import { validateBooleanForCSV } from "../primitive/boolean";


export const validateCsvRowDataAndReturnErrors =<T extends CsvCauseInput> (
    // title: CsvValidatorImportValue,
    // description: CsvValidatorImportValue,
    opportunityType: CsvValidatorImportValue,
    commitment: CsvValidatorImportValue,
    cause: CsvValidatorImportValue,
    // postCode: CsvValidatorImportValue,
    // startDate: CsvValidatorImportValue,
    // endDate: CsvValidatorImportValue,
    // requirements: CsvValidatorImportValue,
    status: CsvValidatorImportValue,
    // volunteersRequired: CsvValidatorImportValue,
    dbsCheck: CsvValidatorImportValue,
    trainingRequired: CsvValidatorImportValue,
    // ageRequirement: CsvValidatorImportValue,
    inputData: {
        causes: T[]
        commitments: Record<string, string>,
        opportunityTypes: Record<string, string>,
        statuses: Record<string, string>
    }
) => {
    const data: {
        // title?: [CsvValidatorResponse];
        // description?: [CsvValidatorResponse];
        opportunityType?: [CsvValidatorResponse];
        commitment?: [CsvValidatorResponse];
        cause?: [CsvValidatorResponse];
        // postCode?: [CsvValidatorResponse];
        // startDate?: [CsvValidatorResponse];
        // endDate?: [CsvValidatorResponse];
        // requirements?: [CsvValidatorResponse];
        status?: [CsvValidatorResponse];
        // volunteersRequired?: [CsvValidatorResponse];
        dbsCheck?: [CsvValidatorResponse];
        trainingRequired?: [CsvValidatorResponse];
        // ageRequirement?: [CsvValidatorResponse];
    } = {

    };
    const opportunityTypeValidator = validateOpportunityTypeForCSV(opportunityType, inputData.opportunityTypes)
    const opportunityStatusValidator = validateOpportunityStatusForCSV(status, inputData.statuses)
    const opportunityCauseValidator = validateOpportunityCauseForCSV(cause, inputData.causes)
    const opportunityCommitmentValidator = validateOpportunityCommitmentForCSV(commitment, inputData.commitments)
    const dbsCheckValidator = validateBooleanForCSV(dbsCheck)
    const trainingRequiredValidator = validateBooleanForCSV(trainingRequired)
    if (opportunityTypeValidator !== null) {
        data.opportunityType = [opportunityTypeValidator]
    }
    if (opportunityStatusValidator !== null) {
        data.status = [opportunityStatusValidator]
    }
    if (opportunityCauseValidator !== null) {
        data.cause = [opportunityCauseValidator]
    }
    if (opportunityCommitmentValidator !== null) {
        data.commitment = [opportunityCommitmentValidator]
    }
    if (dbsCheckValidator !== null) {
        data.dbsCheck = [dbsCheckValidator]
    }
    if (trainingRequiredValidator !== null) {
        data.trainingRequired = [trainingRequiredValidator]
    }
    if (Object.keys(data).length !== 0) {
        return data;
    }
    return null;
};