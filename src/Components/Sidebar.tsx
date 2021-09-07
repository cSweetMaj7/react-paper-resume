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
  import { App, animationController, config, meImage } from "../App";
  import "./App.css";

export class Sidebar {

    public render = () => {
        const { gradientAnimation, sidebarTextColorAnimation } = animationController;
        <animated.div
              style={{
                ...gradientAnimation as any
              }}
              className={styles.sidebarContainer}
            >
                <animated.div
                  className={styles.sidebarRoot}
                  style={{
                  ...sidebarTextColorAnimation as any
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
                      <a className={styles.noStyleAnchor} href={styles.emailLink}>{styles.email}</a>
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
                      <animated.div style={{...qrFillColorAnimation as any}}>
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
    }
}