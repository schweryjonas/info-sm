// TODO: Check if needed
export interface Report {
    diagnose_datum?: string | Date;
    diagnosis_date: string;
    kanton: string;
    gemeinde: string;
    getoetet: number;
    infiziert: string;
    seuche: string;
    seuchen_gruppe: string;
    tierart: string;
    canton_id: number;
    munic_id: number;
    anzahl: number;
}
