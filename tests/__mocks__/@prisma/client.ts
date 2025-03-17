export type Cause = {
    causeId: string;
    causeName: string;
    createdAt: Date;
    updatedAt: Date;
    causeSlug: string | null;
};

export type OpportunityCommitment = "REGULAR" | "FLEXIBLE"
export const OpportunityCommitment = {
    FLEXIBLE: "FLEXIBLE",
    REGULAR: "REGULAR",
}

export type OpportunityType = "IN_PERSON" | "REMOTE"
export const OpportunityType = {
    REMOTE: "REMOTE",
    IN_PERSON: "IN_PERSON",
}

export type RecordState = "INACTIVE" | "ACTIVE"
export const RecordState = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
}

