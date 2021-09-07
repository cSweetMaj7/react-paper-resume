
export interface ITheme {
    name: string;
    viewportBackgroundColor: string;
    sidebarTopColor: string;
    sidebarBottomColor: string;
    sidebarTextColor: string;
    bodyBackgroundColor: string;
    bodyTextColor: string;
  }

export const getThemeByName = (name: string): ITheme =>
    themes.find((theme) => theme.name === name) || themes[0];

export const themes: ITheme[] = [
    {
      name: "🖨️Boring",
      viewportBackgroundColor: "#ffffff",
      sidebarTopColor: "#ffffff",
      sidebarBottomColor: "#ffffff",
      sidebarTextColor: "#000000",
      bodyBackgroundColor: "#ffffff",
      bodyTextColor: "#000000",
    },{
      name: "⏪ For more themes! ⏩",
      viewportBackgroundColor: "#e1e3dd",
      sidebarTopColor: "rgb(100,173,255)",
      sidebarBottomColor: "rgb(70,48,255)",
      sidebarTextColor: "#ffffff",
      bodyBackgroundColor: "#f0ffff",
      bodyTextColor: "#000000",
    },{
      name: "🇺🇸Vote!",
      viewportBackgroundColor: "#e1e3dd",
      sidebarTopColor: "#fe0202",
      sidebarBottomColor: "#0057ae",
      sidebarTextColor: "#ffffff",
      bodyBackgroundColor: "#d42629",
      bodyTextColor: "#010553",
    }, {
      name: "👻Spooky",
      viewportBackgroundColor: "#2e2e2e",
      sidebarTopColor: "#d15400",
      sidebarBottomColor: "#595959",
      sidebarTextColor: "#ffffff",
      bodyBackgroundColor: "#48285c",
      bodyTextColor: "#ffffff",
    }, {
      name: "🎄Festive",
      viewportBackgroundColor: "#659377",
      sidebarTopColor: "#e80000",
      sidebarBottomColor: "#570000",
      sidebarTextColor: "#ffed9f",
      bodyBackgroundColor: "#3a6b2c",
      bodyTextColor: "#ffed9f",
    },{
      name: "☃️Icy",
      viewportBackgroundColor: "#d6fffb",
      sidebarTopColor: "#e3e3ff",
      sidebarBottomColor: "#b3e4f4",
      sidebarTextColor: "#020c36",
      bodyBackgroundColor: "#b3e4f4",
      bodyTextColor: "#240845",
    },{
      name: "🍀Luck o' the Irish",
      viewportBackgroundColor: "#cce898",
      sidebarTopColor: "#09cf09",
      sidebarBottomColor: "#025e25",
      sidebarTextColor: "#cce898",
      bodyBackgroundColor: "#38a845",
      bodyTextColor: "#025e25",
    },{
      name: "🐰Easter-Vision",
      viewportBackgroundColor: "#88f59f",
      sidebarTopColor: "#ea9ef9",
      sidebarBottomColor: "#8ff0e4",
      sidebarTextColor: "#ff6564",
      bodyBackgroundColor: "#f0e57a",
      bodyTextColor: "#ff6564",
    },{
      name: "🌈Roy G. Biv",
      viewportBackgroundColor: "#ac1012",
      sidebarTopColor: "#fd4205",
      sidebarBottomColor: "#54ab02",
      sidebarTextColor: "#03005b",
      bodyBackgroundColor: "#4d0485",
      bodyTextColor: "#ffdd02",
    }, {
      name: "🌞California Dreamin'",
      viewportBackgroundColor: "#c96826",
      sidebarTopColor: "#fffd6b",
      sidebarBottomColor: "#f20014",
      sidebarTextColor: "#000000",
      bodyBackgroundColor: "#b8aa8c",
      bodyTextColor: "#000000",
    }, {
      name: "🎀\"You lack pink!\"",
      viewportBackgroundColor: "#3d3776",
      sidebarTopColor: "#8ecfc8",
      sidebarBottomColor: "#f1bdc2",
      sidebarTextColor: "#000000",
      bodyBackgroundColor: "#f1bdc2",
      bodyTextColor: "#000000",
    }
  ];