import React, { CSSProperties } from "react";

interface IImage {
    src: string;
    imageStyle?: CSSProperties;
}

export class Image implements IImage {
    public src!: string;
    public imageStyle!: CSSProperties;

    public Image(data: IImage) {
        Object.assign(this, data);
    }
}