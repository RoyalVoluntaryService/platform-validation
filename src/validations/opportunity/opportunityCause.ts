import { prisma } from "../../services/prisma";
import type { CsvValidatorResponse } from "../../types/csvValidation";
import { getCsvValidationResponse } from "../../utils/csvValidation";
import { toSentenceCase, toHumanString } from "../../utils/string";



let lastCheckedAt: Date | null = null;
let lastCauses: string[] = [];
const defaultCause = () => lastCauses[0] ?? "None set";

const syncLatestCauses = async () => {
    // if longer than 5 minutes
    if (lastCauses.length > 0) {
        if (lastCheckedAt && (new Date().getTime() - lastCheckedAt.getTime()) < 300000) {
            return;
        }
    }


    const causes = await prisma.cause.findMany({
        select: {
            causeName: true
        }
    });

    lastCheckedAt = new Date();
    lastCauses = causes.map(cause => cause.causeName);
}



export const validateOpportunityCause = async (cause: string): Promise<boolean> => {
    await syncLatestCauses();
    console.log("lastCauses", lastCauses)
    return lastCauses.includes(cause);
};

export const validateOpportunityCauseForCSV = async (type?: string | number | null): Promise<null | CsvValidatorResponse> => {
    await syncLatestCauses();

    function toReturn(): CsvValidatorResponse {
        return getCsvValidationResponse(
            "healing",
            "Opportunity Cause should be one of: " + lastCauses.join(', '),
            toSentenceCase(toHumanString(defaultCause()))
        )
    }
    if (!type || typeof type === "number") {
        return toReturn()
    }
    const isValidCase = await validateOpportunityCause(type)
    console.log(type, isValidCase)
    if (!isValidCase) {
        return toReturn()
    }
    return null
};