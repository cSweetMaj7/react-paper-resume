interface ITheme {
    name: string,
    viewportBackgroundColor: string,
    sidebarTopColor: string,
    sidebarBottomColor: string,
    sidebarTextColor: string,
    bodyBackgroundColor: string,
    bodyTextColor: string,
}

export class Theme implements ITheme {
    public name!: string;
    public viewportBackgroundColor!: string;
    public sidebarTopColor!: string;
    public sidebarBottomColor!: string;
    public sidebarTextColor!: string;
    public bodyBackgroundColor!: string;
    public bodyTextColor!: string;

    Job(data: ITheme) {
        Object.assign(this, data);
    }

}