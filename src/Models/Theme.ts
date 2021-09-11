import { IOptions } from "tsparticles";
import { IAnimatableColor } from "tsparticles/Options/Interfaces/IAnimatableColor";

interface ITheme {
    name: string,
    viewportBackgroundColor: string,
    sidebarTopColor: string,
    sidebarBottomColor: string,
    sidebarTextColor: string,
    bodyBackgroundColor: string,
    bodyTextColor: IAnimatableColor,
    particleConfig: IOptions,
}

export class Theme implements ITheme {
    public name!: string;
    public viewportBackgroundColor!: string;
    public sidebarTopColor!: string;
    public sidebarBottomColor!: string;
    public sidebarTextColor!: string;
    public bodyBackgroundColor!: string;
    public bodyTextColor!: IAnimatableColor;
    public particleConfig!: IOptions;

    Theme(data: ITheme) {
        Object.assign(this, data);
    }

}