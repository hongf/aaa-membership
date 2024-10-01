const INFO = {
    lighter: "#76A5D5",
    main: "#3F7FBF",
    dark: "#316395",
    text: "#FFFFFF"
  };
  
  const SUCCESS = {
    lighter: "rgba(127, 211, 187, 0.15)",
    main: "hsla(163, 100%,26%)",
    dark: "hsl(163,100%,22%)",
    text: "hsl(163, 50%, 73%)"
  };
  
  const WARNING = {
    lighter: "#D5D576",
    main: "#CCCC51",
    light: "#CFCF67",
    text: "#000000"
  };
  
  const ERROR = {
    lighter: "#CF6767",
    main: "#BE2C2C",
    dark: "#971A1A",
    text: "#971A1A"
  };
  
  export const DarkPalette = {
    // DARK MODE
    mode: "dark",
    info: { ...INFO, light: "", contrastText: "hsl(0,0%,100%)" },
    success: { ...SUCCESS, light: "", contrastText: "hsl(0,0%,100%)" },
    warning: { ...WARNING, dark: "", contrastText: "hsl(0,0%,100%)" },
    error: { ...ERROR, light: "", contrastText: "hsl(0,0%,100%)" },
    text: {
      primary: "#000"
    }
  };
  