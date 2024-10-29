export interface IHCaptcha {
    siteKey: string;
    siteUrl: string;

    proxy?: string;
    rqData?: string;
}

export interface IRecaptcha {
    anchorUrl: string;
    reloadUrl: string;
}

export type Task = { type: "reCaptcha V3"; payload: IRecaptcha } | { type: "hCaptcha"; payload: IHCaptcha };