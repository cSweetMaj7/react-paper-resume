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
// @ts-ignore
import { ReactComponent as qrcode } from "./Icons/qr-code.svg";
// @ts-ignore
import { ReactComponent as rightQuote } from "./Icons/right-quotation.svg";
import { useReactToPrint } from 'react-to-print';
import { isMobile } from "react-device-detect";
import { Config } from "./Models/Config";
import { Job } from "./Models/Job";
import { isLoaded, setIsLoaded, validatedRender, setValidatedRender, setViewportWidth, setViewportHeight, viewportHeight, viewportWidth, scaledVerticalOffset, scaledHorizontalOffset, setScaledVerticalOffset, setScaledHorizontalOffset, currentPaperRotationStyle, AnimationController, currentAnimState, isTransitioning, currentScale, setCurrentScale } from "./AnimationController";

export const animationController = new AnimationController();
export const meImage = require("./Assets/me.jpg");
const wwfImage = require("./Assets/wwf.png");
const hirImage = require("./Assets/hir.jpg");
const fv2Image = require("./Assets/fv2.jpg");
const ftvImage = require("./Assets/ftv.jpg");
const staticLetterSpacing = 0;

let contentCardElevation = 10;

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        fontFamily: 'Roboto',
      }
    }
  }
});

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
    height: 1056,
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
    height: 1056,
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

export const styles = useStyles();

export const App = () => {
  
  
  const [cardVariant, setCardVariant] = useState("outlined");
  const [isInvalid, setIsInvalid] = useState(false);

  const pdfComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => pdfComponentRef.current as any,
  });

  // data
  const rawJsonConfig = `{"name":"A","title":"B","subtitle":"C","summary":"D","summaryIsQuote":true,"phone":"E","email":"F","linkedInUsername":"G","web":"H","githubUsername":"I","jobs":[{"title":"Software Engineer II","team":"Words With Friends","company":"Zynga","start":"2018","jobBullets":[{"bulletChar":"•","text":"AA"},{"bulletChar":"•","text":"AB"},{"bulletChar":"•","text":"AC"},{"bulletChar":"•","text":"AD"}],"jobList":{"name":"Tech Stacks","delimiter":",","listItems":["JavaScript","TypeScript","Node.js","cocods-2d-js","React","React Native"]}}]}`;
  export const config = new Config().deserialize(JSON.parse(rawJsonConfig));
  
  // data

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
        animationController.transitionTheme();
      }, 2500);
    });
  }, [viewportWidth, setViewportWidth, currentScale, setCurrentScale, setScaledHorizontalOffset, setScaledVerticalOffset, viewportHeight]);

  // create job cards
  const jobCards: any[] = [];
  let jobCardInd = 0;
  let jobBulletInd = 0;
  for (let job of config.jobs) {
    const jobBullets: any[] = [];
    for ( let jobBullet of job.jobBullets) {
      jobBullets.push(<Typography
        className={styles.bodyCardContentDense}
        key={"job_bullet_" + jobCardInd + "_" + jobBulletInd++}
      >
        {jobBullet.bulletChar}{" "}{jobBullet.text}
      </Typography>)
    }
    jobCards.push(
      <Card key={"job_card_" + jobCardInd++} elevation={contentCardElevation} className={styles.bodyCard} variant={cardVariant as any}>
                <CardMedia
                  className={styles.bodyCardMediaWWF}
                  image={wwfImage}
                />
                <animated.div
                style={{
                  ...animationController.bodyTextColorAnimation as any
                }}
                >
                  <Typography className={styles.bodyCardTitle}>
                    {job.jobSummaryHeader}
                  </Typography>

                  {jobBullets}

                  <Typography
                    className={styles.bodyCardTechStack}
                  >
                    <em>
                      Tech Stack: JavaScript, TypeScript, Node.js, cocos2d-js, React, React Native
                    </em>
                  </Typography>
                </animated.div>
              </Card>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <animated.div
      style={{
        ...animationController.viewportBackgroundColorAnimation as any
      }}
      className={styles.root}>
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
            animationController.transitionTheme(true);
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
              animationController.transitionTheme();
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
          className={styles.paperContainer}
          style={{
            ...animationController.SpinPaperAnimation()
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
            className={styles.paperRoot}
            elevation={10}
            ref={pdfComponentRef as any}
          >
            <animated.div
              style={{
                ...animationController.gradientAnimation as any
              }}
              className={styles.sidebarContainer}
            >
                <animated.div
                  className={styles.sidebarRoot}
                  style={{
                  ...animationController.sidebarTextColorAnimation as any
                  }}>
                  <Typography className={styles.nameHeader}>
                    {config.name}
                  </Typography>
                  <Avatar
                    src={meImage}
                    classes={{
                      circle: !isTransitioning ? styles.circleBorder : styles.circleBorderHidden
                    }}
                  />

                  <Typography className={styles.titleHeader}>
                    {config.title}
                  </Typography>
                  {
                    config.subtitle && <Typography className={styles.subtitleHeader}>
                    <em>
                      {config.subtitle}
                    </em>
                  </Typography>
                  }

                  <SvgIcon
                    className={styles.leftQuote}
                    component={rightQuote}
                    viewBox="0 0 100 100"
                  />
                  
                  <Typography className={styles.quote}>
                  {config.summary}
                  </Typography>

                  <div
                  className={styles.quoteReverse}
                  >
                  <SvgIcon
                    className={styles.rightQuote}
                    component={rightQuote}
                    viewBox="0 0 100 100"
                  />
                  </div>

                    <Typography className={styles.contactText}>
                      <PhoneIcon className={styles.contactIcon} />
                      {config.phone}
                    </Typography>

                    <Typography className={styles.contactText}>
                      <MailIcon className={styles.contactIcon} />
                      <a className={styles.noStyleAnchor} href={config.emailLink}>{config.email}</a>
                    </Typography>

                    <Typography className={styles.contactText}>
                      <LanguageIcon className={styles.contactIcon} />
                      <a className={styles.noStyleAnchor} href={config.web}>{config.web}</a>
                    </Typography>

                    <Typography className={styles.contactText}>
                      <LinkedInIcon className={styles.contactIcon} />
                      <a className={styles.noStyleAnchor} href={config.linkedInLink}>{config.linkedInLink}</a>
                    </Typography>

                    <Typography className={styles.contactText}>
                      <GitHubIcon className={styles.contactIcon} />
                      <a className={styles.noStyleAnchor} href="http://www.github.com/cSweetMaj7">github.com/cSweetMaj7</a>
                    </Typography>

                    <Card elevation={0} className={styles.qrCard}>
                      <animated.div style={{...animationController.qrFillColorAnimation as any}}>
                          <SvgIcon
                            className={styles.qrMedia}
                            component={qrcode}
                            viewBox="80 80 1050 1050"
                          />
                          <div ref={boundaryRef as any}/>
                      </animated.div>
                    </Card>
                </animated.div>
            </animated.div>

            <animated.div
              className={styles.bodyRoot}
              style={{ ...animationController.bodyBackgroundColorAnimation as any}}
            >
              {jobCards}

              {/*
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

              </Card>*/}
              
            </animated.div>
          </Paper>
        </animated.div>}
    </ThemeProvider>
  );
}

export default App;
