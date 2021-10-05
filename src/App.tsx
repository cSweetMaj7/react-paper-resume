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
import { useReactToPrint } from 'react-to-print';
import { isMobile } from "react-device-detect";
import { Config } from "./Models/Config";
// @ts-ignore
import { ReactComponent as qrcode } from "./Icons/qr-code.svg";
// @ts-ignore
import { ReactComponent as rightQuote } from "./Icons/right-quotation.svg";
import jsonConfig from "./config.json";
import Particles from "react-particles-js";

function App() {
  // up front
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
  // protect android mobile from perspective that does not play nice with Paper/Spring
  const perspective = isMobile && !iOS() ? '' : 'perspective(7000px) ';
  // hooks
  const config = new Config().deserialize(jsonConfig);
  const startConfig = config.themes[1];
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
  const [currentPaperRotationStyle, setCurrentPaperRotationStyle] = useState(perspective + `rotateY(0deg) scale(${currentScale})`);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [validatedRender, setValidatedRender] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  // constants
  const pdfComponentRef = useRef();
  const boundaryRef = useRef<HTMLElement>(null);
  const domRect = boundaryRef?.current?.getBoundingClientRect();
  const yOffset = Math.floor(domRect?.top || 0);
  const staticLetterSpacing = 0;
  const US_LETTER_X = 816;
  const US_LETTER_Y = 1056;

  // styles are here as they are dependent on the above hooks and need to be in their scope
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
      minWidth: US_LETTER_X,
      minHeight: US_LETTER_Y,
      maxWidth: US_LETTER_X,
      maxHeight: US_LETTER_Y,
      transform: currentPaperRotationStyle,
    },
    paperRoot: {
      display: "flex",
      justifyContent: 'center',
      borderRadius: 0,
      backgroundColor: "transparent",
      opacity: validatedRender ? 1 : 0,
      height: US_LETTER_Y,
    },
    sidebarContainer: {
      width: "33%",
      height: "100%"
    },
    sidebarRoot: {
      marginLeft: 5,
      marginRight: 5,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: '100%',
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
      justifyContent: 'top',
      height: US_LETTER_Y,
    },
    bodyCard: {
      width: "96%",
      marginLeft: "2%",
      marginBottom: 8,
      marginTop: 8,
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    bodyCardTitle: {
      textAlign: "center",
      fontSize: 14,
      margin: 5,
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

  // helper methods
  const colorTransitionConfig: SpringConfig = {
    duration: 3000
  };
  const paperTransitionConfig: SpringConfig = {
    friction: 100,
  };
  const gradientTransitionConfig: SpringConfig = {
    duration: 3000
  };

  const handlePrint = useReactToPrint({
    content: () => pdfComponentRef.current as any,
  });

  if (isLoaded && !validatedRender && yOffset !== 0 && yOffset <= 1162) {
    const ratio = +(viewportWidth/US_LETTER_X).toFixed(2);
    const vDiff = US_LETTER_Y - (US_LETTER_Y * ratio);
    const hDiff = US_LETTER_X - (US_LETTER_X * ratio);
    const isDownscaled = viewportWidth < US_LETTER_X;
    const lessScaleForMargins = 0.1;
    const calculatedScale = isDownscaled ? ratio - lessScaleForMargins : 1;
    setCurrentScale(calculatedScale);
    setScaledVerticalOffset(isDownscaled ? (vDiff/2 * -1) - 40 : 0);
    setScaledHorizontalOffset(hDiff/2 * -1);
    setValidatedRender(true);
  } else if (isLoaded && !isInvalid && !validatedRender && yOffset !== 0 && yOffset > 1162) {
    setIsInvalid(true);
  }

  // load and resize effects
  useEffect(() => {
    const scale = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      const ratio = +(viewportWidth/US_LETTER_X).toFixed(2);
      const vDiff = US_LETTER_Y - (US_LETTER_Y * ratio);
      const hDiff = US_LETTER_X - (US_LETTER_X * ratio);
      const isDownscaled = validatedRender && viewportWidth < US_LETTER_X;
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
       // calling of transitionTheme in this scope without hook reference is acceptable
    });// eslint-disable-next-line
  }, [viewportWidth, setViewportWidth, currentScale, setCurrentScale, setScaledHorizontalOffset, setScaledVerticalOffset, viewportHeight, validatedRender]);

  // animation methods
  function SpinPaperAnimation() {
    const toPaperRotationStyle = perspective + `rotateY(${paperRotationDegrees}deg) scale(${currentScale})`;
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
    const lastIndex = config.themes.length - 1;
    let targetIndex = 0;
    if (previous) {
      targetIndex = currentConfigIndex === 0 ? lastIndex : currentConfigIndex - 1;
    } else {
      targetIndex = currentConfigIndex === lastIndex ? 0 : currentConfigIndex + 1;
    }
    const newState = config.themes[targetIndex];
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

  // create job cards
  const jobCards: any[] = [];
  let jobCardInd = 0;
  let jobBulletInd = 0;
  for (let job of config.jobs) {
    const jobBullets: any[] = [];
    for (const jobBullet of job.jobBullets) {
      jobBullets.push(<Typography
        className={classes.bodyCardContentDense}
        key={"job_bullet_" + jobCardInd + "_" + jobBulletInd++}
      >
        {jobBullet.bulletChar}{" "}{jobBullet.text}
      </Typography>)
    }
    let listedItems = "";
    if (job.jobList) {
      const { listItems, name, delimiter } = job.jobList;
      listedItems = name + ": ";
      const listLen = listItems.length;
      for (let i = 0; i < listLen; i++) {
        const listItem = listItems[i];
        listedItems += listItem;
        if (i !== listLen - 1) {
          listedItems += delimiter;
        }
      }
    }
    
    const { backgroundSize, width, height, backgroundPositionX, backgroundPositionY} = job.bannerImage.image.imageStyle;
    jobCards.push(
      <Card key={"job_card_" + jobCardInd++} elevation={config.jobCardElevation} className={classes.bodyCard} variant={config.jobCardVariant as any}>
        <CardMedia
          className={makeStyles({
            bodyCardMedia: {
              width,
              height: job.bannerHeight || height,
              backgroundPositionY,
              backgroundPositionX,
              backgroundSize,
            }
          })().bodyCardMedia}
          image={require("./Assets/" + job.bannerImage.image.src)}
        />
        <animated.div
        style={{
          ...bodyTextColorAnimation as any
        }}
        >
          <Typography className={classes.bodyCardTitle}>
            {config.getJobDescription(job)}
          </Typography>

          {jobBullets}

          <Typography
            className={classes.bodyCardTechStack}
          >
            {listedItems?.length > 0 && <em>
              {listedItems}
            </em>}
          </Typography>
        </animated.div>
      </Card>
    )
  }

  // create sidebar
  const sidebar = (<animated.div
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
          {config.name}
        </Typography>
        <Avatar
          src={require("./Assets/" + config.profileImage.image.src)}
          classes={{
            circle: !isTransitioning ? classes.circleBorder : classes.circleBorderHidden,
          }}
        />

        <Typography className={classes.titleHeader}>
          {config.title}
        </Typography>
        {
          config.subtitle && <Typography className={classes.subtitleHeader}>
          <em>
            {config.subtitle}
          </em>
        </Typography>
        }

        {config.summaryIsQuote && <SvgIcon
          className={classes.leftQuote}
          component={rightQuote}
          viewBox="0 0 100 100"
        />}
        
        <Typography className={classes.quote}>
        {config.summary}
        </Typography>

        {config.summaryIsQuote && <div
        className={classes.quoteReverse}
        >
          <SvgIcon
            className={classes.rightQuote}
            component={rightQuote}
            viewBox="0 0 100 100"
          />
        </div>}

          <Typography className={classes.contactText}>
            <PhoneIcon className={classes.contactIcon} />
            <a className={classes.noStyleAnchor} href={config.phoneLink}>{config.phone}</a>
          </Typography>

          <Typography className={classes.contactText}>
            <MailIcon className={classes.contactIcon} />
            <a className={classes.noStyleAnchor} href={config.emailLink}>{config.email}</a>
          </Typography>

          <Typography className={classes.contactText}>
            <LanguageIcon className={classes.contactIcon} />
            <a className={classes.noStyleAnchor} href={"https://www." + config.web} target="_blank" rel="noopener noreferrer">{config.web}</a>
          </Typography>

          <Typography className={classes.contactText}>
            <LinkedInIcon className={classes.contactIcon} />
            <a className={classes.noStyleAnchor} href={"https://www." + config.linkedInLink} target="_blank" rel="noopener noreferrer">{config.linkedInUsername}</a>
          </Typography>

          <Typography className={classes.contactText}>
            <GitHubIcon className={classes.contactIcon} />
            <a className={classes.noStyleAnchor} href={"https://www." + config.githubLink} target="_blank" rel="noopener noreferrer">{config.githubUsername}</a>
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
  </animated.div>);

  // material UI theme, force font
  const theme = createMuiTheme({
    overrides: {
      MuiTypography: {
        root: {
          fontFamily: 'Roboto',
        }
      }
    }
  });

  // Particle images must be initialized to an image element in order to be
  // imported via node -- once imported, local assets use a hashed filename.
  // Initialized image refs in the object must be updated to point to the
  // runtime node image path

  // this traversal is how I really want to do this, but there are numerous
  // typing errors with react-particle-js and its dependenies, so it's not working :(
  /*const renderElements = [];
  for (let h = 0; h < config.themes.length; h++) {
      if (config?.themes?.[h]?.particleConfig?.particles?.shape?.image) {
        const importString = (config.themes[h].particleConfig.particles.shape.image as any)[0].src;
        console.warn("Import String: " + importString)
        const importedImage = require(importString);
        renderElements.push(<img src={importedImage} style={{
          display: "none"
        }} />);
        // set the source in the object
        config.themes[h].particleConfig.particles.shape.image = [
          {
            src: importedImage,
            replace_color: false,
            replaceColor: false,
            width: 100,
            height: 100,
          }
        ];
      }
  }*/

  // this approach is not ideal as the specific image name and theme index
  // are hardcoded, but it gets the job done for now...

  const particleImageFish = require("./Assets/fish.png");
  const particleImageBat = require("./Assets/bat.png");
  const particleImageGolfBall = require("./Assets/golf_ball.png");
  const renderElements = [
    <img alt="" src={particleImageFish} key={"particle_fish"} style={{
      display: "none"
    }} />,
  <img alt="" src={particleImageBat} key={"particle_bat"} style={{
    display: "none"
  }} />,
  <img alt="" src={particleImageGolfBall} key={"particle_golf"} style={{
    display: "none"
  }} />
  ];
  
  const fishThemeIndex = 2;
  const batThemeIndex = 4;
  const golfThemeIndex = 7;
  const commonParticle = {
    replace_color: false,
    replaceColor: false,
    width: 0,
    height: 0,
  }
  // replace with node ref in corresponding objects
  config.themes[fishThemeIndex].particleConfig.particles.shape.image = [
    {
      src: particleImageFish,
      ...commonParticle
    }
  ];
  config.themes[batThemeIndex].particleConfig.particles.shape.image = [
    {
      src: particleImageBat,
      ...commonParticle
    }
  ];
  config.themes[golfThemeIndex].particleConfig.particles.shape.image = [
    {
      src: particleImageGolfBall,
      ...commonParticle
    }
  ];

  // render
  return (
    <ThemeProvider theme={theme}>
      {renderElements}
      <animated.div
      style={{
        ...viewportBackgroundColorAnimation as any
      }}
      className={classes.root}>
      </animated.div>

      {isLoaded && !isTransitioning && currentAnimState.particleConfig &&
        <Particles
        className={classes.root}
        params={currentAnimState.particleConfig} />
      }
    
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
          onClick={(e) => window.open('./pdfs/resume.pdf')}
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
          </animated.div>
        }

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
            {!config.sidebarRight && sidebar}

            <animated.div
              className={classes.bodyRoot}
              style={{ ...bodyBackgroundColorAnimation as any}}
            >
              {jobCards}              
            </animated.div>

            {config.sidebarRight && sidebar}
          </Paper>
        </animated.div>}
    </ThemeProvider>
  );
}

export default App;
