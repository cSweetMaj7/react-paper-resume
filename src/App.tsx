import {
  Avatar,
  Button,
  Card,
  CardMedia,
  makeStyles,
  Paper,
  SvgIcon,
  Typography,
  ThemeProvider,
  createMuiTheme,
  CircularProgress,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LanguageIcon from "@material-ui/icons/Language";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import BackIcon from "@material-ui/icons/FastRewindTwoTone";
import NextIcon from "@material-ui/icons/FastForwardTwoTone";
import PrinterIcon from "@material-ui/icons/PrintTwoTone";
import WarningIcon from "@material-ui/icons/WarningTwoTone";
import React, { useState, useEffect, useRef } from "react";
import { animated, useSpring, SpringConfig } from "react-spring";
import "./App.css";
import { ReactComponent as qrcode } from "./Icons/qr-code.svg";
import { ReactComponent as rightQuote } from "./Icons/right-quotation.svg";
import { useReactToPrint } from 'react-to-print';
import { isMobile } from "react-device-detect";
const meImage = require("./Assets/me.jpg");
const wwfImage = require("./Assets/wwf.png");
const hirImage = require("./Assets/hir.jpg");
const fv2Image = require("./Assets/fv2.jpg");
const ftvImage = require("./Assets/ftv.jpg");
const staticLetterSpacing = 0;

let contentCardElevation = 10;

interface IAnimConfig {
  name: string;
  viewportBackgroundColor: string;
  sidebarTopColor: string;
  sidebarBottomColor: string;
  sidebarTextColor: string;
  bodyBackgroundColor: string;
  bodyTextColor: string;
}

const colorTransitionConfig: SpringConfig = {
  duration: 3000
};
const paperTransitionConfig: SpringConfig = {
  friction: 100,
};
const gradientTransitionConfig: SpringConfig = {
  duration: 3000
};

const animConfigs: IAnimConfig[] = [
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
const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        fontFamily: 'Roboto',
      }
    }
  }
});

function getColorConfigByName(name: string): IAnimConfig {
  return animConfigs.find((config) => config.name === name) || animConfigs[0];
}

function App() {
  const startConfig = getColorConfigByName("Default");
  const [currentAnimState, setCurrentAnimState] = useState(startConfig);
  const [transitionAnimState, setTransitionAnimState] = useState(startConfig);
  const [currentConfigIndex, setCurrentConfigIndex] = useState(0);
  const [paperRotationDegrees, setPaperRotationDegrees] = useState(0);
  const [gradientStateA, setGradientStateA] = useState(`linear-gradient(0deg, ${startConfig.sidebarTopColor} 0%, ${startConfig.sidebarBottomColor} 100%)`);
  const [gradientStateB, setGradientStateB] = useState(`linear-gradient(0deg, ${startConfig.sidebarBottomColor} 0%, ${startConfig.sidebarTopColor} 100%)`);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [currentScale, setCurrentScale] = useState(1);
  const [scaledHorizontalOffset, setScaledHorizontalOffset] = useState(0);
  const [scaledVerticalOffset, setScaledVerticalOffset] = useState(0);
  const [currentPaperRotationStyle, setCurrentPaperRotationStyle] = useState(`perspective(2000px) rotateY(0deg) scale(${currentScale})`);
  const [cardVariant, setCardVariant] = useState("outlined");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHidingThemeName, setIsHidingThemeName] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [validatedRender, setValidatedRender] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const pdfComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => pdfComponentRef.current as any,
  });

  const boundaryRef = useRef<HTMLElement>(null);
  const domRect = boundaryRef?.current?.getBoundingClientRect();
  const yOffset = Math.floor(domRect?.top || 0);
  if (isLoaded && !validatedRender && yOffset !== 0 && yOffset <= 1162) {
    //console.warn("RENDER VALID");
    const ratio = +(viewportWidth/816).toFixed(2);
    const vDiff = 1056 - (1056 * ratio);
    const hDiff = 816 - (816 * ratio);
    const isDownscaled = viewportWidth < 816;
    const lessScaleForMargins = 0.1;
    const calculatedScale = isDownscaled ? ratio - lessScaleForMargins : 1;
    setCurrentScale(calculatedScale);
    setScaledVerticalOffset(isDownscaled ? (vDiff/2 * -1) - 40 : 0);
    setScaledHorizontalOffset(hDiff/2 * -1);
    setValidatedRender(true);
  } else if (isLoaded && !isInvalid && !validatedRender && yOffset !== 0 && yOffset > 1162) {
    setIsInvalid(true);
  }
  //console.warn("Y Bounding Rect: " + JSON.stringify(domRect));

  const iOS = () => {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

  useEffect(() => {
    const scale = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      const ratio = +(viewportWidth/816).toFixed(2);
      const vDiff = 1056 - (1056 * ratio);
      const hDiff = 816 - (816 * ratio);
      const isDownscaled = validatedRender && viewportWidth < 816;
      const lessScaleForMargins = 0.1;
      const calculatedScale = isDownscaled ? ratio - lessScaleForMargins : 1;
      if (validatedRender) {
        setCurrentScale(calculatedScale);
      }
      setScaledVerticalOffset(isDownscaled ? (vDiff/2 * -1) - 40 : 0);
      setScaledHorizontalOffset(hDiff/2 * -1);
    }
    const tryScale = () => {
      if (viewportWidth !== window.innerWidth || viewportHeight !== window.innerHeight) {
        scale();
      }
    }
    window.addEventListener('resize', () => {
      tryScale();
    });
    window.addEventListener('load', () => {
      scale();
      setTimeout(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
        transitionTheme();
      }, 2500);
    });
  }, [viewportWidth, setViewportWidth, currentScale, setCurrentScale, setScaledHorizontalOffset, setScaledVerticalOffset, viewportHeight]);

  const useStyles = makeStyles({
    root: {
      backgroundColor: currentAnimState.viewportBackgroundColor,
      width: viewportWidth,
      height: 1500,
      position: 'absolute',
    },
    paperContainer: {
      filter: currentAnimState.name.indexOf("Boring") >= 0 ? "grayscale(100%)" : "grayscale(0%)",
      marginTop: scaledVerticalOffset,
      marginLeft: scaledHorizontalOffset,
      display: isLoaded ? 'block' : 'none',
      minWidth: 816,
      minHeight: 1056,
      maxWidth: 816,
      maxHeight: 1056,
      transform: currentPaperRotationStyle,
      //zIndex: 100,
      //elevation: 100,
    },
    paperRoot: {
      display: "flex",
      justifyContent: 'center',
      borderRadius: 0,
      backgroundColor: "transparent",
      opacity: validatedRender ? 1 : 0,
    },
    sidebarContainer: {
      width: "33%",
      maxHeight: 1056,
    },
    sidebarRoot: {
      marginLeft: 5,
      marginRight: 5,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      maxHeight: 1056,
    },
    nameHeader: {
      textAlign: "center",
      fontSize: 36,
      marginTop: 5,
      letterSpacing: staticLetterSpacing,
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      MozTextSizeAdjust: '100%',
    },
    avatar: {
      width: 225,
      height: 225,
      marginBottom: 8,
      alignContent: "center",
      alignSelf: "center",
      WebkitAlignContent: "center",
      alignItems: "center",
      border: 5,
    },
    titleHeader: {
      textAlign: "center",
      fontSize: 24,
      letterSpacing: staticLetterSpacing,
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      MozTextSizeAdjust: '100%',
    },
    subtitleHeader: {
      textAlign: "center",
      fontSize: 14,
      letterSpacing: staticLetterSpacing,
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      MozTextSizeAdjust: '100%',
    },
    leftQuote: {
      textAlign: "left",
      marginLeft: 5,
      marginBottom: 5,
      width: 15,
      height: 15,
      transform: `rotate(180deg)`,
    },
    quote: {
      textAlign: "left",
      fontSize: 14,
      marginLeft: 14,
      marginRight: 6,
      marginTop: -5,
      letterSpacing: staticLetterSpacing,
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      MozTextSizeAdjust: '100%',
    },
    rightQuote: {
      textAlign: "right",
      marginRight: 3,
      marginTop: 3,
      marginBottom: 5,
      width: 15,
      height: 15,
    },
    quoteReverse: {
      display: 'flex',
      flexDirection: 'row-reverse'
    },
    contactText: {
      marginTop: -10,
      marginBottom: 13,
      letterSpacing: staticLetterSpacing,
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      MozTextSizeAdjust: '100%'
    },
    contactIcon: {
      marginBottom: -7,
      marginLeft: 10,
      marginRight: 8,
    },
    noStyleAnchor: {
      textDecoration: 'inherit',
      color: 'inherit',
    },
    qrCard: {
      backgroundColor: "transparent",
      transform: 'scale(0.90) translate(5px, -5%)',
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    qrMedia: {
      width: 230,
      height: 230,
    },
    bodyRoot: {
      width: "67%",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxHeight: 1056,
      paddingTop: 5,
      paddingBottom: 5,
    },
    bodyCard: {
      width: "96%",
      marginLeft: "2%",
      marginBottom: 5,
      marginTop: 5,
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    bodyCardMediaWWF: {
      height: 55,
      backgroundSize: "100%",
      backgroundPositionY: -39
    },
    bodyCardMediaHIR: {
      height: 55,
      backgroundPositionY: -102,
      backgroundSize: "100% 200px",
    },
    bodyCardMediaFV2: {
      height: 55,
      backgroundPositionY: -17,
      backgroundSize: "100% 295px",
    },
    bodyCardMediaFTV: {
      height: 55,
      backgroundPositionY: -13,
      backgroundSize: "110%",
    },
    bodyCardTitle: {
      textAlign: "center",
      fontSize: 14,
      margin: 10,
      textDecoration: "underline",
      letterSpacing: staticLetterSpacing,
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      MozTextSizeAdjust: '100%',
    },
    bodyCardContentDense: {
      textAlign: "left",
      fontSize: 12,
      marginLeft: 10,
      marginBottom: 10,
      marginRight: 5,
      letterSpacing: staticLetterSpacing,
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      MozTextSizeAdjust: '100%',
    },
    bodyCardContentLight: {
      textAlign: "left",
      fontSize: 12,
      marginLeft: 10,
      marginBottom: 5,
      marginRight: 5,
      letterSpacing: staticLetterSpacing,
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      MozTextSizeAdjust: '100%',
    },
    bodyCardTechStack: {
      textAlign: "left",
      fontSize: 12,
      marginLeft: 10,
      paddingBottom: 3,
      letterSpacing: staticLetterSpacing,
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      MozTextSizeAdjust: '100%',
    },
    circleBorder: {
      border: `3px solid rgba(0, 0, 0, 0.25)`,
      width: 225,
      height: 225,
      alignSelf: 'center'
    },
    circleBorderHidden: {
      border: `3px solid rgba(0, 0, 0, 0.1)`,
      width: 225,
      height: 225,
      alignSelf: 'center'
    },
    killMobileSpacing: {
      letterSpacing: staticLetterSpacing,
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
      MozTextSizeAdjust: '100%',
    }
  });

  const classes = useStyles();

  function SpinPaperAnimation() {
    const toPaperRotationStyle = `perspective(2000px) rotateY(${paperRotationDegrees}deg) scale(${currentScale})`;
    return useSpring({
      from: {
        transform: currentPaperRotationStyle
      },
      to: {
        transform: toPaperRotationStyle
      },
      config: paperTransitionConfig,
      onRest: () => {
        setCurrentPaperRotationStyle(toPaperRotationStyle);
        setIsTransitioning(false);
      }
    });
  };

  const advanceRotation = (left?: boolean) => {
    setPaperRotationDegrees(left ? paperRotationDegrees - 360 : paperRotationDegrees + 360);
  }

  // no params for next, (true) for previous
  function transitionTheme(previous?: boolean) {
    setIsTransitioning(true);
    const lastIndex = animConfigs.length - 1;
    let targetIndex = 0;
    if (previous) {
      targetIndex = currentConfigIndex === 0 ? lastIndex : currentConfigIndex - 1;
    } else {
      targetIndex = currentConfigIndex === lastIndex ? 0 : currentConfigIndex + 1;
    }
    const newState = animConfigs[targetIndex];
    setTransitionAnimState(newState);
    setCurrentConfigIndex(targetIndex);
    setCurrentAnimState(newState);
    setGradientStateA(`linear-gradient(0deg, ${newState.sidebarTopColor} 0%, ${newState.sidebarBottomColor} 100%)`);
    setGradientStateB(`linear-gradient(0deg, ${newState.sidebarBottomColor} 0%, ${newState.sidebarTopColor} 100%)`);
    advanceRotation(previous);
  }

  const gradientAnimation = useSpring({
    from: {
      background: gradientStateA
    },
    to: {
      background: gradientStateB
    },
    loop: { reverse: true },
    config: gradientTransitionConfig
  });

  const viewportBackgroundColorAnimation = useSpring({
    to: {
      backgroundColor: transitionAnimState.viewportBackgroundColor
    },
    config: colorTransitionConfig
  });

  const sidebarTextColorAnimation = useSpring({
    to: {
      color: transitionAnimState.sidebarTextColor
    },
    config: colorTransitionConfig
  });

  const qrFillColorAnimation = useSpring({
    to: {
      color: transitionAnimState.sidebarTextColor,
      fill: transitionAnimState.sidebarTextColor
    },
    config: colorTransitionConfig
  });

  const bodyBackgroundColorAnimation = useSpring({
    to: {
      backgroundColor: transitionAnimState.bodyBackgroundColor
    },
    config: colorTransitionConfig
  });

  const bodyTextColorAnimation = useSpring({
    to: {
      color: transitionAnimState.bodyTextColor
    },
    config:  colorTransitionConfig
  });

  return (
    <ThemeProvider theme={theme}>
      <animated.div
      style={{
        ...viewportBackgroundColorAnimation as any
      }}
      className={classes.root}>
      </animated.div>
        <div style={{ paddingTop: 30 }} />
        <animated.div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        >
          <Button
          variant="contained"
          disabled={!isLoaded || isInvalid}
          onClick={() => {
            transitionTheme(true);
          }}
          >
            <BackIcon/>
          </Button>

          {(isMobile && iOS()) || isInvalid ? <Button
          variant="contained"
          onClick={(e) => window.open('./pdfs/csweet_resume_2020.pdf') /* window.alert("Download generic PDF...")*/}
          >
            <PrinterIcon/>
          </Button> : 
          <Button
          disabled={!isLoaded || isTransitioning}
          variant="contained"
          onClick={handlePrint}
          >
            <PrinterIcon/>
          </Button>}

          <Button
          disabled={!isLoaded || isInvalid}
            variant="contained"
            onClick={() => {
              transitionTheme();
            }}
          >
            <NextIcon/>
          </Button>
        </animated.div>

        {!isLoaded && <animated.div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        >
          <CircularProgress
          style={{
            marginTop: 20,
          }}
          />
        </animated.div>}
        {
          
            isLoaded && !validatedRender && isInvalid &&
            <div
              style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              marginTop: 20,
            }}>
              <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              >
                <WarningIcon/>
                <Typography
                style={{
                  marginLeft: 5,
                }}
                >
                  <b> Problem Detected</b>
                </Typography>
              </div>
              <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              >
              <Typography
              style={{margin: 20,
              }}
              >
                <p>
                  Application is disabled; your browser is not displaying it correctly.
                </p>
                <p>
                  You can still download the PDF of this page by clicking the printer icon above.
                </p>
                <p>
                  Please <a href='mailto:contact@charlessweet.me'><b>report</b></a> this issue so it can be fixed!
                </p>
              </Typography>
              </div>
            </div>
        }

        {<animated.div
          className={classes.paperContainer}
          style={{
            ...SpinPaperAnimation()
          }}
        >
          <div
            style={{
              flexDirection: 'row-reverse',
              top: isMobile ? -20 : -10,
            }}
            >
              <Typography
              style={{
                fontSize: 18,
                letterSpacing: staticLetterSpacing,
                opacity: validatedRender ? 1 : 0,
              }}
              >
                {currentAnimState.name}
              </Typography>
            </div>
          <Paper
            className={classes.paperRoot}
            elevation={10}
            ref={pdfComponentRef as any}
          >
            <animated.div
              style={{
                ...gradientAnimation as any
              }}
              className={classes.sidebarContainer}
            >
                <animated.div
                  className={classes.sidebarRoot}
                  style={{
                  ...sidebarTextColorAnimation as any
                  }}>
                  <Typography className={classes.nameHeader}>
                    Charles Sweet
                  </Typography>
                  <Avatar
                    src={meImage}
                    classes={{
                      circle: !isTransitioning ? classes.circleBorder : classes.circleBorderHidden
                    }}
                  />

                  <Typography className={classes.titleHeader}>
                    Software Engineer
                  </Typography>
                  <Typography className={classes.subtitleHeader}>
                  <em>
                    Specializing in Game, Mobile, Web,{" "}
                    Front End, Content Pipeline, and{" "}
                    Tooling Development
                  </em>
                  </Typography>

                  <SvgIcon
                    className={classes.leftQuote}
                    component={rightQuote}
                    viewBox="0 0 100 100"
                  />
                  
                  <Typography className={classes.quote}>
                  I don't just write software; I strive to create seamless, performant and
                  memorable applications for every type of end user.
                  From implementing the next big game feature on a
                  large team, to prototyping novel ideas in cutting edge
                  tech stacks, to creating tools that make my teammate's
                  jobs easier. I cherish each new opportunity to make an
                  impact and leave any project I touch in better condition
                  than I found it. I am excited to help bring my team's efforts to
                  their full potential!
                  </Typography>

                  <div
                  className={classes.quoteReverse}
                  >
                  <SvgIcon
                    className={classes.rightQuote}
                    component={rightQuote}
                    viewBox="0 0 100 100"
                  />
                  </div>

                    <Typography className={classes.contactText}>
                      <PhoneIcon className={classes.contactIcon} />
                      925.459.4874
                    </Typography>

                    <Typography className={classes.contactText}>
                      <MailIcon className={classes.contactIcon} />
                      <a className={classes.noStyleAnchor} href="mailto:contact@charlessweet.me">contact@charlessweet.me</a>
                    </Typography>

                    <Typography className={classes.contactText}>
                      <LanguageIcon className={classes.contactIcon} />
                      <a className={classes.noStyleAnchor} href="http://charlessweet.me">charlessweet.me</a>
                    </Typography>

                    <Typography className={classes.contactText}>
                      <LinkedInIcon className={classes.contactIcon} />
                      <a className={classes.noStyleAnchor} href="http://www.linkedin.com/in/charles-sweet">linkedin.com/in/charles-sweet</a>
                    </Typography>

                    <Typography className={classes.contactText}>
                      <GitHubIcon className={classes.contactIcon} />
                      <a className={classes.noStyleAnchor} href="http://www.github.com/cSweetMaj7">github.com/cSweetMaj7</a>
                    </Typography>

                    <Card elevation={0} className={classes.qrCard}>
                      <animated.div style={{...qrFillColorAnimation as any}}>
                          <SvgIcon
                            className={classes.qrMedia}
                            component={qrcode}
                            viewBox="80 80 1050 1050"
                          />
                          <div ref={boundaryRef as any}/>
                      </animated.div>
                    </Card>
                </animated.div>
            </animated.div>

            <animated.div
              className={classes.bodyRoot}
              style={{ ...bodyBackgroundColorAnimation as any}}
            >
              <Card elevation={contentCardElevation} className={classes.bodyCard} variant={cardVariant as any}>
                <CardMedia
                  className={classes.bodyCardMediaWWF}
                  image={wwfImage}
                />
                <animated.div
                style={{
                  ...bodyTextColorAnimation as any
                }}
                >
                  <Typography className={classes.bodyCardTitle}>
                      Software Engineer II on {" "}
                      Words With Friends at Zynga since{" "}
                      2018
                    </Typography>

                    <Typography
                      className={classes.bodyCardContentDense}
                    >
                      • Arcitected, developed, deployed, documented, evangelized, and personally owned {" "}
                      <em>the</em> new live content pipeline for all WWF mobile SKUs. A host of technical
                      improvements allow rich and targeted content to be created and deployed at breakneck
                      speed without the aid of an engineer.
                    </Typography>

                    <Typography
                      className={classes.bodyCardContentDense}
                    >
                      • Implemented numerous error-free game features and technical improvements for both the web and mobile application stacks.
                      Successful in collaboration with a large team consisting of major disciplines including engineering,
                      QA, production, design, marketing, project management, analytics and live content operations.
                    </Typography>

                    <Typography
                      className={classes.bodyCardContentDense}
                    >
                      • Excelled as half of a two-man client team responsible for developing, deploying and supporting Words Live, a cash-prize
                      live trivia game show hosted in the WWF mobile app. Responsible for creating and maintaining the modal dialog system. Designed
                      a proven tool capable of running synchronized pre-recorded shows without any live control room support.
                    </Typography>

                    <Typography
                      className={classes.bodyCardContentDense}
                    >
                      • Served as mentor to engineering interns and new-hires by taking a personal interest in their careers. Provided individual support with daily check-ins, ramp-up support and code reviews.
                    </Typography>

                    <Typography
                      className={classes.bodyCardTechStack}
                    >
                      <em>
                        Tech Stack: JavaScript, TypeScript, Node.js, cocos2d-js, React, React Native
                      </em>
                    </Typography>
                </animated.div>
              </Card>

              <Card elevation={contentCardElevation} className={classes.bodyCard} variant={cardVariant as any}>
                <CardMedia
                  className={classes.bodyCardMediaHIR}
                  image={hirImage}
                />

                <animated.div
                style={{
                  ...bodyTextColorAnimation as any
                }}
                >
                  <Typography className={classes.bodyCardTitle}>
                    Software Engineer I on{" "}
                    Hit It Rich! Slots at Zynga from{" "}
                    2015 to 2018
                  </Typography>

                  <Typography
                    className={classes.bodyCardContentDense}
                  >
                    • Personally responsible for implementing complex game cabinet animations, audio, and
                    custom game logic for iconic franchises like Aerosmith, Ainsworth, Downton Abbey, Elvis,
                      Elvira, Halloween, Happy Days, Lost in Space, Pee-wee Herman, Real Housewives, Slingo, 
                      Sex and the City, Steve Harvey, Superman, Willy Wonka, The Wizard of Oz, and many more.
                  </Typography>

                  <Typography
                    className={classes.bodyCardContentDense}
                  >
                    • Initially developed in the existing Flash tech stack, quickly ramping up on mobile
                    development via the new Unity tech stack. Repeatedly and successfully delivered licensor
                    feedback under tight deadlines on both platforms.
                  </Typography>

                  <Typography
                    className={classes.bodyCardTechStack}
                  >
                    <em>
                      Tech Stack: Flash Actionscript, C#, Unity 3D
                    </em>
                  </Typography>
                </animated.div>
              </Card>

              <Card elevation={contentCardElevation} className={classes.bodyCard} variant={cardVariant as any}>
                <CardMedia
                  className={classes.bodyCardMediaFV2}
                  image={fv2Image}
                />

                <animated.div
                style={{
                  ...bodyTextColorAnimation as any
                }}
                >
                  <Typography className={classes.bodyCardTitle}>
                    Jr. Software Engineer on FarmVille2 {" "}
                    at Zynga from 2013 to 2015
                  </Typography>

                  <Typography
                    className={classes.bodyCardContentLight}
                  >
                    • Created critical studio client tools used to integrate and publish new game content.
                  </Typography>

                  <Typography
                    className={classes.bodyCardContentLight}
                  >
                    • Developed and implemented game features under the direction of engineering and design.
                  </Typography>

                  <Typography
                    className={classes.bodyCardTechStack}
                  >
                    <em>
                      Tech Stack: C#, .NET, PHP, Flash ActionScript
                    </em>
                  </Typography>
                </animated.div>
              </Card>

              <Card elevation={contentCardElevation} className={classes.bodyCard} variant={cardVariant as any}>
                <CardMedia
                  className={classes.bodyCardMediaFTV}
                  image={ftvImage}
                />

                <animated.div
                style={{
                  ...bodyTextColorAnimation as any
                }}
                >
                  <Typography className={classes.bodyCardTitle}>
                    Quality Engineer on FrontierVille {" "}
                    at Zynga from 2011 to 2012
                  </Typography>

                  <Typography
                    className={classes.bodyCardContentLight}
                  >
                    • Created game feature test plans and led testing progression.
                  </Typography>

                  <Typography
                    className={classes.bodyCardContentLight}
                  >
                    • Created award-winning inventory tooling used across other Zynga games.
                  </Typography>

                  <Typography
                    className={classes.bodyCardTechStack}
                  >
                    <em>
                      Tech Stack: C#, .NET, PHP, Flash ActionScript
                    </em>
                  </Typography>
                </animated.div>

              </Card>
              
            </animated.div>
          </Paper>
        </animated.div>}
    </ThemeProvider>
  );
}

export default App;
